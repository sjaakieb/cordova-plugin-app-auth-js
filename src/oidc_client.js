import {AuthorizationRequest} from '@openid/appauth/built/authorization_request'
import {AuthorizationNotifier, AuthorizationRequestResponse,
  BUILT_IN_PARAMETERS} from '@openid/appauth/built/authorization_request_handler'
import {AuthorizationServiceConfiguration} from '@openid/appauth/built/authorization_service_configuration'
import {BaseTokenRequestHandler, TokenRequestHandler} from '@openid/appauth/built/token_request_handler'
import {GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN, TokenRequest} from '@openid/appauth/built/token_request'
import {ViewControllerRequestHandler} from './viewcontroller_request_handler.ts'
import {WebviewRequestor} from './webview_requestor.ts'
const requestor = new WebviewRequestor()

export default class OIDCClient {
  constructor ({issuerUrl, redirectUri, clientId, scopes}) {
    /* Client configuration */
    this.name = 'OIDClient'
    this.issuerUrl = issuerUrl
    this.redirectUri = redirectUri
    this.clientId = clientId
    this.scopes = scopes

    /* Configure handlers */
    this.notifier = new AuthorizationNotifier()
    this.tokenHandler = new BaseTokenRequestHandler(requestor)
    this.authorizationHandler = new ViewControllerRequestHandler()

    this.authorizationHandler.setAuthorizationNotifier(this.notifier)
    this.notifier.setAuthorizationListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error)
    })
  }

  fetchServiceConfiguration () {
    return AuthorizationServiceConfiguration.fetchFromIssuer(this.issuerUrl, requestor)
      .then(response => {
        console.log('Fetched service configuration', response)
        this.configuration = response
        return this.configuration
      })
  }

  makeAuthorizationRequest () {
    let request = new AuthorizationRequest(
      this.clientId,
      this.redirectUri,
      this.scope,
      AuthorizationRequest.RESPONSE_TYPE_CODE,
      'state',
      {'prompt': 'consent', 'access_type': 'offline'})

    console.log('Making authorization request ', this.configuration, request)
    this.authorizationHandler.performAuthorizationRequest(this.configuration, request)
  }
}
