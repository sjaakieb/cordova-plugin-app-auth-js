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
  public refreshToken: string;
  public accessToken: string;
  public idToken: string;
  public audience?: string;
  private name: string;
  private issuerUrl: string;
  private redirectUri: string;
  private clientId: string;
  private scopes: string;
  private configuration?: AuthorizationServiceConfiguration;
  private notifier: AuthorizationNotifier;
  private tokenHandler: BaseTokenRequestHandler;
  private authorizationHandler: AuthorizationRequestHandler;
  private authorizationCode: string;

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
    this.refreshToken = '';
    this.accessToken = '';
    this.idToken = '';
    this.authorizationCode = '';
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
        this.authorizationCode = response.code;
      }
    });
  }

  public fetchServiceConfiguration(
    cb: (configuration: AuthorizationServiceConfiguration) => void = () => {}
  ) {
    AuthorizationServiceConfiguration.fetchFromIssuer(
      this.issuerUrl,
      requestor
    ).then(response => {
      this.configuration = response;
      cb(this.configuration);
    });
  }

  public authorizationRequest(cb: () => void = () => {}) {
    let extras:StringMap = { prompt: 'consent', access_type: 'offline' };
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

  public refreshTokenRequest(cb: () => void = () => {}) {
    this.makeAccessTokenRequest(this.refreshToken).then(() => {
      cb();
    });
  }

  private makeAccessTokenRequest(refreshToken: string): Promise<string> {
    const request = new TokenRequest({
      client_id:this.clientId,
      redirect_uri:this.redirectUri,
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      refresh_token: refreshToken
    });

    return this.tokenHandler
      .performTokenRequest(this.configuration!, request)
      .then(response => {
        this.accessToken = response.accessToken || '';
        this.idToken = response.idToken || '';
        this.refreshToken = response.refreshToken || '';
        return this.accessToken;
      });
  }

  private makeRefreshTokenRequest(): Promise<string> {
    if (this.authorizationCode === '') {
      throw new Error('Authorization request not completed');
    }

    const request = new TokenRequest({
      client_id:this.clientId,
      redirect_uri:this.redirectUri,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code: this.authorizationCode,
    });

    return this.tokenHandler
      .performTokenRequest(this.configuration!, request)
      .then(response => {
        return (this.refreshToken = response.refreshToken || '');
      });
  }
}
