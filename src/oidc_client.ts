import {AuthorizationRequest} from "@openid/appauth/built/authorization_request";
import {AuthorizationRequestHandler} from "@openid/appauth/built/authorization_request_handler";
import {AuthorizationNotifier, AuthorizationRequestResponse,
  BUILT_IN_PARAMETERS} from "@openid/appauth/built/authorization_request_handler";
import {AuthorizationServiceConfiguration} from "@openid/appauth/built/authorization_service_configuration";
import {GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN,
  TokenRequest} from "@openid/appauth/built/token_request";
import {BaseTokenRequestHandler, TokenRequestHandler} from "@openid/appauth/built/token_request_handler";
import {ViewControllerRequestHandler} from "./viewcontroller_request_handler.ts";
import {WebviewRequestor} from "./webview_requestor.ts";
const requestor = new WebviewRequestor();
import {log} from "@openid/appauth/built/logger";

export default class OIDCClient {
  private name: string;
  private issuerUrl: string;
  private redirectUri: string;
  private clientId: string;
  private scopes: string;
  private configuration?: AuthorizationServiceConfiguration;
  private notifier: AuthorizationNotifier;
  private tokenHandler: BaseTokenRequestHandler;
  private authorizationHandler: AuthorizationRequestHandler;

  constructor({issuerUrl, redirectUri, clientId, scopes}:
    {issuerUrl: string, redirectUri: string, clientId: string, scopes: string}) {
    // Client configuration
    this.name = "OIDClient";
    this.issuerUrl = issuerUrl;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.scopes = scopes;

    // Configure handlers
    this.notifier = new AuthorizationNotifier();
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    this.authorizationHandler = new ViewControllerRequestHandler();

    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    this.notifier.setAuthorizationListener((request, response, error) => {
      log("Authorization request complete ", request, response, error);
      if (response) {
        this.makeRefreshTokenRequest(this.configuration!, response.code)
            .then((result) => this.makeAccessTokenRequest(this.configuration!, result.refreshToken!))
            .then(() => log("All done."));
      }
    });
  }

  public fetchServiceConfiguration() {
    return AuthorizationServiceConfiguration.fetchFromIssuer(this.issuerUrl, requestor)
      .then((response) => {
        this.configuration = response;
        return this.configuration;
      });
  }

  public makeAuthorizationRequest() {
    const request = new AuthorizationRequest(
      this.clientId,
      this.redirectUri,
      this.scopes,
      AuthorizationRequest.RESPONSE_TYPE_CODE,
      "state",
      {prompt: "consent", access_type: "offline"},
    );

    if (!this.configuration) {
      throw new Error("Client not yet configured");
    }

    this.authorizationHandler.performAuthorizationRequest(
      this.configuration as AuthorizationServiceConfiguration,
      request,
    );
  }

  public completeAuthorizationRequest() {
    this.authorizationHandler.completeAuthorizationRequestIfPossible();
  }

  private makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string) {
    const request =
        new TokenRequest(this.clientId, this.redirectUri, GRANT_TYPE_REFRESH_TOKEN, undefined, refreshToken);

    return this.tokenHandler.performTokenRequest(configuration, request).then((response) => {
      log(`Access Token is ${response.accessToken}, Id Token is ${response.idToken}`);
      return response;
    });
  }

  private makeRefreshTokenRequest(configuration: AuthorizationServiceConfiguration, code: string) {
    // use the code to make the token request.
    const request =
        new TokenRequest(this.clientId, this.redirectUri, GRANT_TYPE_AUTHORIZATION_CODE, code, undefined);

    return this.tokenHandler.performTokenRequest(configuration, request).then((response) => {
      log(`Refresh Token is ${response.refreshToken}`);
      return response;
    });
  }
}
