declare const cordova: any;

import { AuthorizationRequest } from '@openid/appauth/built/authorization_request';
import { AuthorizationRequestHandler } from '@openid/appauth/built/authorization_request_handler';
import {
  AuthorizationNotifier,
  AuthorizationRequestResponse,
  BUILT_IN_PARAMETERS,
} from '@openid/appauth/built/authorization_request_handler';
import { AuthorizationServiceConfiguration } from '@openid/appauth/built/authorization_service_configuration';
import {
  GRANT_TYPE_AUTHORIZATION_CODE,
  GRANT_TYPE_REFRESH_TOKEN,
  TokenRequest,
} from '@openid/appauth/built/token_request';
import {
  BaseTokenRequestHandler,
  TokenRequestHandler,
} from '@openid/appauth/built/token_request_handler';
import { ViewControllerRequestHandler } from './viewcontroller_request_handler.ts';
import { WebviewRequestor } from './webview_requestor.ts';
import { StringMap } from '@openid/appauth';
const requestor = new WebviewRequestor();

export class OIDCClient {
  public audience?: string;
  private name: string;
  private issuerUrl: string;
  private redirectUri: string;
  private clientId: string;
  private scopes: string;
  private secureStorage: any;
  private configuration?: AuthorizationServiceConfiguration;
  private notifier: AuthorizationNotifier;
  private tokenHandler: BaseTokenRequestHandler;
  private authorizationHandler: AuthorizationRequestHandler;

  constructor({
    issuerUrl,
    redirectUri,
    clientId,
    scopes,
    audience,
  }: {
    issuerUrl: string;
    redirectUri: string;
    clientId: string;
    scopes: string;
    audience?: string;
  }) {
    // Client configuration
    this.name = 'OIDClient';
    this.issuerUrl = issuerUrl;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.scopes = scopes;
    this.secureStorage = new cordova.plugins.SecureStorage(
      function () {
        console.log("Success");
      },
      function (error: string) {
        console.error('Error while creating secure storage', error);
      },
      clientId
    );

    if (audience) {
      this.audience = audience;
    }

    // Configure handlers
    this.notifier = new AuthorizationNotifier();
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    this.authorizationHandler = new ViewControllerRequestHandler();
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    this.notifier.setAuthorizationListener((request, response, error) => {
      if (response) {
        this.setAuthorizationCode(response.code);
      }
    });
  }

  public getAuthorizationCode() {
    return this.getFromSecureStorage("authorizationCode");
  }
  public getRefreshToken() {
    return this.getFromSecureStorage("refresh_token");
  }

  public getAccessToken() {
    return this.getFromSecureStorage("access_token");
  }

  public getIdToken() {
    return this.getFromSecureStorage("id_token");
  }

  public setAuthorizationCode(value: string) {
    return this.putInSecureStorage("authorizationCode", value);
  }
  public setRefreshToken(value: string) {
    return this.putInSecureStorage("refresh_token", value);
  }

  public setAccessToken(value: string) {
    return this.putInSecureStorage("access_token", value);
  }

  public setIdToken(value: string) {
    return this.putInSecureStorage("id_token", value);
  }


  private putInSecureStorage(key: string, value: string) {
    return new Promise((resolve, reject) => {
      this.secureStorage.set(
        (value: string) => resolve(value),
        (error: string) => {
          console.error(`Error putting ${value} into secure storage with key ${key}`, error)
          reject(error);
        },
        key,
        value,
      )
    });
  }


  private getFromSecureStorage(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.secureStorage.get(
        (value: string) => resolve(value),
        (error: string) => {
          console.error(`Error retrieving ${key} from secure storage`, error)
          reject(error);
        },
        key,
      )
    });
  }


  public fetchServiceConfiguration(
    cb: (configuration: AuthorizationServiceConfiguration) => void = () => { }
  ) {
    AuthorizationServiceConfiguration.fetchFromIssuer(
      this.issuerUrl,
      requestor
    ).then(response => {
      this.configuration = response;
      cb(this.configuration);
    });
  }

  public authorizationRequest(cb: () => void = () => { }) {
    let extras: StringMap = { prompt: 'consent', access_type: 'offline' };
    if (this.audience) {
      extras.audience = this.audience;
    }
    const request = new AuthorizationRequest({
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scopes,
      state: 'state',
      extras,
    });

    if (!this.configuration) {
      throw new Error('Client not yet configured');
    }

    this.authorizationHandler.performAuthorizationRequest(
      this.configuration as AuthorizationServiceConfiguration,
      request
    );
    this.authorizationHandler
      .completeAuthorizationRequestIfPossible()
      .then(() => this.makeRefreshTokenRequest())
      .then(refreshToken => this.makeAccessTokenRequest(refreshToken))
      .then(() => {
        cb();
      });
  }

  public refreshTokenRequest(cb: () => void = () => { }) {
    this.getRefreshToken().then((refreshToken: string) => {
      return this.makeAccessTokenRequest(refreshToken)
    }).then(() => {
      cb();
    });
  }

  private makeAccessTokenRequest(refreshToken: string): Promise<string> {
    const request = new TokenRequest({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      refresh_token: refreshToken
    });

    return this.tokenHandler
      .performTokenRequest(this.configuration!, request)
      .then(response => {
        return Promise.all([this.setAccessToken(response.accessToken || ''),
        this.setIdToken(response.idToken || ''),
        this.setRefreshToken(response.refreshToken || ''),
        ])
      })
      .then(this.getAccessToken);
  }

  private makeRefreshTokenRequest(): Promise<string> {
    return this.getAuthorizationCode().then((authorizationCode) => {
      if (authorizationCode === '') {
        throw new Error('Authorization request not completed');
      }
      const request = new TokenRequest({
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        code: authorizationCode,
      });
      return this.tokenHandler
        .performTokenRequest(this.configuration!, request)
        .then(response => {
          return response.refreshToken || '';
        })
        .then((refreshToken) => {
          return this.setRefreshToken(refreshToken);
        }).then(this.getRefreshToken);
    })
  }
}
