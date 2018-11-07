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

1. Install and configure [cordova-plugin-whitelist](htt])

```
$ cordova plugin add cordova-plugin-whitelist
<access origin="https://PROVIDER_DOMAIN" />
```

2. Install and configure [cordova-plugin-customurlscheme](https://github.com/EddyVerbruggen/Custom-URL-scheme)

```
$ cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=your-app-scheme
```

3. Configure CSP for Webview requests

```
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' https://PROVIDER_DOMAIN; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
```

## Usage

```
client = new AppAuthJs.OIDCClient({issuerUrl: 'https://PROVIDER_DOMAIN/ISSUER', redirectUri: 'your-app-scheme://authCallback', clientId: 'clientID', scopes: 'openid'});
client.fetchServiceConfiguration();
client.makeAuthorizationRequest()
client.completeAuthorizationRequest();
```
