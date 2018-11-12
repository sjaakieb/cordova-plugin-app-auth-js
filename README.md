AppAuthJS Cordova Plugin
========================

## Description
* OpenID Connect client implemented with authorization code flow
* Webview requestor

## Installation

```
$ cordova plugin add https://github.com/luisvillenah/cordova-plugin-app-auth-js.git
```

## Configuration

1. Configure [cordova-plugin-whitelist](https://github.com/apache/cordova-plugin-whitelist) to allow your provider domain
```xml
<access origin="https://PROVIDER_DOMAIN" />
```

2. Configure [cordova-plugin-customurlscheme](https://github.com/EddyVerbruggen/Custom-URL-scheme) to handle the authorization request redirection.

```
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=your-app-scheme
```

3. Configure CSP for Webview requests

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' https://PROVIDER_DOMAIN; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
```

## Usage

```javascript
// Client initialization
client = new AppAuthJs.OIDCClient({issuerUrl: 'https://PROVIDER_DOMAIN/ISSUER', redirectUri: 'your-app-scheme://authCallback', clientId: 'clientID', scopes: 'openid'});

// Authorization request
client.fetchServiceConfiguration(function() {
  client.authorizationRequest(function() {
    console.log({refreshToken: client.refreshToken, accessToken: client.accessToken, idToken: client.idToken});
  });
});

// Subsequent refresh token requests
client.refreshTokenRequest(function() {
  console.log({refreshToken: client.refreshToken, accessToken: client.accessToken, idToken: client.idToken});
});
```
