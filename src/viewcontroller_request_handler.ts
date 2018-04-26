import {AuthorizationRequest, AuthorizationRequestJson} from "@openid/appauth/built/authorization_request";
import {AuthorizationRequestHandler, AuthorizationRequestResponse,
  BUILT_IN_PARAMETERS} from "@openid/appauth/built/authorization_request_handler";
import {AuthorizationServiceConfiguration,
  AuthorizationServiceConfigurationJson} from "@openid/appauth/built/authorization_service_configuration";
import {cryptoGenerateRandom} from "@openid/appauth/built/crypto_utils";
import {BasicQueryStringUtils, QueryStringUtils} from "@openid/appauth/built/query_string_utils";
import {Agent} from "./agent.ts";

export class ViewControllerRequestHandler extends AuthorizationRequestHandler {
  private authorizationPromise: Promise<AuthorizationRequestResponse|null>|null = null;

  constructor(
      utils: QueryStringUtils = new BasicQueryStringUtils(),
      generateRandom = cryptoGenerateRandom) {
    super(utils, generateRandom);
  }

  public performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest) {
    this.authorizationPromise = new Promise<AuthorizationRequestResponse>((resolve, reject) => {
      Agent.open(this.buildRequestUrl(configuration, request));
    });
  }

  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    if (!this.authorizationPromise) {
      return Promise.reject("No pending authorization request. Call performAuthorizationRequest() ?");
    }

    return this.authorizationPromise;
  }
}
