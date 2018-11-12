module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=23)}([function(e,t,n){"use strict";var r=n(18),o=n(34),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function u(e){return null!==e&&"object"==typeof e}function a(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:u,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:a,isStream:function(e){return u(e)&&a(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";function o(e){for(var t=[],n=0;n<e.byteLength;n+=1){var o=e[n]%r.length|0;t.push(r[o])}return t.join("")}t.bufferToString=o;var i="undefined"!=typeof window&&!!window.crypto;t.cryptoGenerateRandom=function(e){void 0===e&&(e=1);var t=new Uint8Array(e);if(i)window.crypto.getRandomValues(t);else for(var n=0;n<e;n+=1)t[n]=Math.random();return o(t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),o=function(){function e(){this.listener=null}return e.prototype.setAuthorizationListener=function(e){this.listener=e},e.prototype.onAuthorizationComplete=function(e,t,n){this.listener&&this.listener(e,t,n)},e}();t.AuthorizationNotifier=o,t.BUILT_IN_PARAMETERS=["redirect_uri","client_id","response_type","state","scope"];var i=function(){function e(e,t){this.utils=e,this.generateRandom=t,this.notifier=null}return e.prototype.buildRequestUrl=function(e,n){var r={redirect_uri:n.redirectUri,client_id:n.clientId,response_type:n.responseType,state:n.state,scope:n.scope};if(n.extras)for(var o in n.extras)n.extras.hasOwnProperty(o)&&t.BUILT_IN_PARAMETERS.indexOf(o)<0&&(r[o]=n.extras[o]);var i=this.utils.stringify(r);return e.authorizationEndpoint+"?"+i},e.prototype.completeAuthorizationRequestIfPossible=function(){var e=this;return r.log("Checking to see if there is an authorization response to be delivered."),this.notifier||r.log("Notifier is not present on AuthorizationRequest handler.\n          No delivery of result will be possible"),this.completeAuthorizationRequest().then(function(t){t||r.log("No result is available yet."),t&&e.notifier&&e.notifier.onAuthorizationComplete(t.request,t.response,t.error)})},e.prototype.setAuthorizationNotifier=function(e){return this.notifier=e,this},e}();t.AuthorizationRequestHandler=i},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(8),i=function(){return function(){}}();t.Requestor=i;var s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.xhr=function(e){var t=$.ajax(e);return new Promise(function(e,n){t.then(function(t,n,r){e(t)},function(e,t,r){n(new o.AppAuthError(r))})})},t}(i);t.JQueryRequestor=s;var u=function(e){function t(t){var n=e.call(this)||this;return n.promise=t,n}return r(t,e),t.prototype.xhr=function(e){return this.promise},t}(i);t.TestRequestor=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.prototype.parse=function(e,t){return t?this.parseQueryString(e.hash):this.parseQueryString(e.search)},e.prototype.parseQueryString=function(e){for(var t={},n=(e=e.trim().replace(/^(\?|#|&)/,"")).split("&"),r=0;r<n.length;r+=1){var o=n[r].split("=");if(o.length>=2){var i=decodeURIComponent(o.shift()),s=o.length>0?o.join("="):null;s&&(t[i]=decodeURIComponent(s))}}return t},e.prototype.stringify=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&e[n]&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")},e}();t.BasicQueryStringUtils=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=function(e){return e(10)},i=function(){function e(t,n,i,s,u,a,c){void 0===s&&(s=e.RESPONSE_TYPE_CODE),void 0===c&&(c=r.cryptoGenerateRandom),this.clientId=t,this.redirectUri=n,this.scope=i,this.responseType=s,this.extras=a,this.state=u||o(c)}return e.prototype.toJson=function(){return{response_type:this.responseType,client_id:this.clientId,redirect_uri:this.redirectUri,scope:this.scope,state:this.state,extras:this.extras}},e.fromJson=function(t){return new e(t.client_id,t.redirect_uri,t.scope,t.response_type,t.state,t.extras)},e.RESPONSE_TYPE_CODE="code",e}();t.AuthorizationRequest=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10);function o(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];r.IS_LOG&&((t?t.length:0)>0?console.log.apply(console,[e].concat(t)):console.log(e))}t.log=o;var i="undefined"!=typeof window&&!!window.performance&&!!console.profile;t.profile=function(e,t,n){return r.IS_PROFILE?function(e,t,n){var r=n.value,s=r.name;return s||(s="anonymous function"),n.value=i?function(e){console.profile(s);var t=window.performance.now(),n=r.call.apply(r,[this||window].concat(e)),o=window.performance.now()-t;return console.log(s+" took "+o+" ms"),console.profileEnd(),n}:function(e){o("Profile start "+s);var t=Date.now(),n=r.call.apply(r,[this||window].concat(e)),i=Date.now()-t;return o("Profile end "+s+" took "+i+" ms."),n},n}(0,0,n):n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){this.code=e,this.state=t}return e.prototype.toJson=function(){return{code:this.code,state:this.state}},e.fromJson=function(t){return new e(t.code,t.state)},e}();t.AuthorizationResponse=r;var o=function(){function e(e,t,n,r){this.error=e,this.errorDescription=t,this.errorUri=n,this.state=r}return e.prototype.toJson=function(){return{error:this.error,error_description:this.errorDescription,error_uri:this.errorUri,state:this.state}},e.fromJson=function(t){return new e(t.error,t.error_description,t.error_uri,t.state)},e}();t.AuthorizationError=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(e,t){this.message=e,this.extras=t}}();t.AppAuthError=r},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(37),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(19):void 0!==t&&(e=n(19)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],function(e){u.headers[e]={}}),r.forEach(["post","put","patch"],function(e){u.headers[e]=r.merge(i)}),e.exports=u}).call(this,n(36))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IS_LOG=!0,t.IS_PROFILE=!1},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=function(){function e(e,t,n,r,o){this.authorizationEndpoint=e,this.tokenEndpoint=t,this.revocationEndpoint=n,this.endSessionEndpoint=r,this.userInfoEndpoint=o}return e.prototype.toJson=function(){return{authorization_endpoint:this.authorizationEndpoint,token_endpoint:this.tokenEndpoint,revocation_endpoint:this.revocationEndpoint,end_session_endpoint:this.endSessionEndpoint,userinfo_endpoint:this.userInfoEndpoint}},e.fromJson=function(t){return new e(t.authorization_endpoint,t.token_endpoint,t.revocation_endpoint,t.end_session_endpoint,t.userinfo_endpoint)},e.fetchFromIssuer=function(t,n){var o=t+"/.well-known/openid-configuration";return(n||new r.JQueryRequestor).xhr({url:o,dataType:"json"}).then(function(t){return e.fromJson(t)})},e}();t.AuthorizationServiceConfiguration=o},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=function(){return function(){}}();t.StorageBackend=o;var i=function(e){function t(t){var n=e.call(this)||this;return n.storage=t||window.localStorage,n}return r(t,e),t.prototype.getItem=function(e){var t=this;return new Promise(function(n,r){var o=t.storage.getItem(e);n(o||null)})},t.prototype.removeItem=function(e){var t=this;return new Promise(function(n,r){t.storage.removeItem(e),n()})},t.prototype.clear=function(){var e=this;return new Promise(function(t,n){e.storage.clear(),t()})},t.prototype.setItem=function(e,t){var n=this;return new Promise(function(r,o){n.storage.setItem(e,t),r()})},t}(o);t.LocalStorageBackend=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GRANT_TYPE_AUTHORIZATION_CODE="authorization_code",t.GRANT_TYPE_REFRESH_TOKEN="refresh_token";var r=function(){function e(e,t,n,r,o,i){this.clientId=e,this.redirectUri=t,this.grantType=n,this.code=r,this.refreshToken=o,this.extras=i}return e.prototype.toJson=function(){return{grant_type:this.grantType,code:this.code,refresh_token:this.refreshToken,redirect_uri:this.redirectUri,client_id:this.clientId,extras:this.extras}},e.prototype.toStringMap=function(){var e={grant_type:this.grantType,client_id:this.clientId,redirect_uri:this.redirectUri};if(this.code&&(e.code=this.code),this.refreshToken&&(e.refresh_token=this.refreshToken),this.extras)for(var t in this.extras)this.extras.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=this.extras[t]);return e},e.fromJson=function(t){return new e(t.client_id,t.redirect_uri,t.grant_type,t.code,t.refresh_token,t.extras)},e}();t.TokenRequest=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(8),o=n(4),i=n(15),s=n(3),u=function(){function e(e,t){void 0===e&&(e=new s.JQueryRequestor),void 0===t&&(t=new o.BasicQueryStringUtils),this.requestor=e,this.utils=t}return e.prototype.isTokenResponse=function(e){return void 0===e.error},e.prototype.performRevokeTokenRequest=function(e,t){return this.requestor.xhr({url:e.revocationEndpoint,method:"POST",dataType:"json",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:t.toJson()}).then(function(e){return!0})},e.prototype.performTokenRequest=function(e,t){var n=this;return this.requestor.xhr({url:e.tokenEndpoint,method:"POST",dataType:"json",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:this.utils.stringify(t.toStringMap())}).then(function(e){return n.isTokenResponse(e)?i.TokenResponse.fromJson(e):Promise.reject(new r.AppAuthError(e.error,i.TokenError.fromJson(e)))})},e}();t.BaseTokenRequestHandler=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return Math.round((new Date).getTime()/1e3)},o=function(){function e(e,t,n,o,i,s,u){void 0===i&&(i="bearer"),void 0===s&&(s=r()),this.accessToken=e,this.idToken=t,this.refreshToken=n,this.scope=o,this.tokenType=i,this.issuedAt=s,this.expiresIn=u}return e.prototype.toJson=function(){return{access_token:this.accessToken,id_token:this.idToken,refresh_token:this.refreshToken,scope:this.scope,token_type:this.tokenType,issued_at:this.issuedAt,expires_in:this.expiresIn}},e.prototype.isValid=function(){return!this.expiresIn||r()<this.issuedAt+this.expiresIn},e.fromJson=function(t){var n=t.issued_at?t.issued_at:r();return new e(t.access_token,t.id_token,t.refresh_token,t.scope,t.token_type,n,t.expires_in)},e}();t.TokenResponse=o;var i=function(){function e(e,t,n){this.error=e,this.errorDescription=t,this.errorUri=n}return e.prototype.toJson=function(){return{error:this.error,error_description:this.errorDescription,error_uri:this.errorUri}},e.fromJson=function(t){return new e(t.error,t.error_description,t.error_uri)},e}();t.TokenError=i},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),i=n(7),s=n(1),u=n(4),a=n(28),c=n(31),f=function(e){function t(t,n){void 0===t&&(t=new u.BasicQueryStringUtils),void 0===n&&(n=s.cryptoGenerateRandom);var r=e.call(this,t,n)||this;return r.authorizationPromise=null,r}return r(t,e),t.prototype.performAuthorizationRequest=function(e,t){var n=this;this.authorizationPromise=new Promise(function(r,o){c.Agent.open(n.buildRequestUrl(e,t)).then(function(e){var n=a.parse(e.split("?")[1]),o={error:null,request:t,response:new i.AuthorizationResponse(n.code,n.state)};r(o)})})},t.prototype.completeAuthorizationRequest=function(){return this.authorizationPromise?this.authorizationPromise:Promise.reject("No pending authorization request. Call performAuthorizationRequest() ?")},t}(o.AuthorizationRequestHandler);t.ViewControllerRequestHandler=f},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(32),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.xhr=function(e){var t={data:e.data,headers:e.headers,method:e.method||"GET",url:e.url};return i.default(t).then(function(e){return e.data})},t}(o.Requestor);t.WebviewRequestor=s},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0),o=n(38),i=n(40),s=n(41),u=n(42),a=n(20),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(43);e.exports=function(e){return new Promise(function(t,f){var p=e.data,h=e.headers;r.isFormData(p)&&delete h["Content-Type"];var l=new XMLHttpRequest,d="onreadystatechange",y=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,d="onload",y=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var v=e.auth.username||"",m=e.auth.password||"";h.Authorization="Basic "+c(v+":"+m)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[d]=function(){if(l&&(4===l.readyState||y)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?l.response:l.responseText,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,r),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var _=n(44),w=(e.withCredentials||u(e.url))&&e.xsrfCookieName?_.read(e.xsrfCookieName):void 0;w&&(h[e.xsrfHeaderName]=w)}if("setRequestHeader"in l&&r.forEach(h,function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete h[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(39);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(24));var r=n(27);t.OIDCClient=r.OIDCClient;var o=n(16);t.ViewControllerRequestHandler=o.ViewControllerRequestHandler;var i=n(17);t.WebviewRequestor=i.WebviewRequestor},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(5)),r(n(2)),r(n(7)),r(n(11)),r(n(1)),r(n(8)),r(n(10)),r(n(6)),r(n(4)),r(n(25)),r(n(26)),r(n(12)),r(n(13)),r(n(14)),r(n(15)),r(n(3))},function(e,t,n){"use strict";var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),i=n(2),s=n(7),u=n(1),a=n(6),c=n(4),f=n(12),p=function(e){return e+"_appauth_authorization_request"},h=function(e){return e+"_appauth_authorization_service_configuration"},l=function(e){function t(t,n,r,o){void 0===t&&(t=new f.LocalStorageBackend),void 0===n&&(n=new c.BasicQueryStringUtils),void 0===r&&(r=window.location),void 0===o&&(o=u.cryptoGenerateRandom);var i=e.call(this,n,o)||this;return i.storageBackend=t,i.locationLike=r,i}return r(t,e),t.prototype.performAuthorizationRequest=function(e,t){var n=this,r=this.generateRandom();Promise.all([this.storageBackend.setItem("appauth_current_authorization_request",r),this.storageBackend.setItem(p(r),JSON.stringify(t.toJson())),this.storageBackend.setItem(h(r),JSON.stringify(e.toJson()))]).then(function(){var r=n.buildRequestUrl(e,t);a.log("Making a request to ",t,r),n.locationLike.assign(r)})},t.prototype.completeAuthorizationRequest=function(){var e=this;return this.storageBackend.getItem("appauth_current_authorization_request").then(function(t){return t?e.storageBackend.getItem(p(t)).then(function(e){return JSON.parse(e)}).then(function(e){return o.AuthorizationRequest.fromJson(e)}).then(function(n){var r=""+e.locationLike.origin+e.locationLike.pathname,o=e.utils.parse(e.locationLike,!0),i=o.state,u=o.code,c=o.error;a.log("Potential authorization request ",r,o,i,u,c);var f=null,l=null;if(i===n.state){if(c){var d=o.error_uri,y=o.error_description;l=new s.AuthorizationError(c,y,d,i)}else f=new s.AuthorizationResponse(u,i);return Promise.all([e.storageBackend.removeItem("appauth_current_authorization_request"),e.storageBackend.removeItem(p(t)),e.storageBackend.removeItem(h(t))]).then(function(){return a.log("Delivering authorization response"),{request:n,response:f,error:l}})}return a.log("Mismatched request (state and request_uri) dont match."),Promise.resolve(null)}):null})},t}(i.AuthorizationRequestHandler);t.RedirectRequestHandler=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t,n,r){this.token=e,this.tokenTypeHint=t,this.clientId=n,this.clientSecret=r}return e.prototype.toJson=function(){var e={token:this.token};return this.tokenTypeHint&&(e.token_type_hint=this.tokenTypeHint),this.clientId&&(e.client_id=this.clientId),this.clientSecret&&(e.client_secret=this.clientSecret),e},e.fromJson=function(t){return new e(t.token,t.token_type_hint,t.client_id,t.client_secret)},e}();t.RevokeTokenRequest=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),o=n(2),i=n(11),s=n(13),u=n(14),a=n(16),c=new(n(17).WebviewRequestor),f=function(){function e(e){var t=e.issuerUrl,n=e.redirectUri,r=e.clientId,i=e.scopes,s=this;this.name="OIDClient",this.issuerUrl=t,this.redirectUri=n,this.clientId=r,this.scopes=i,this.refreshToken="",this.accessToken="",this.idToken="",this.authorizationCode="",this.notifier=new o.AuthorizationNotifier,this.tokenHandler=new u.BaseTokenRequestHandler(c),this.authorizationHandler=new a.ViewControllerRequestHandler,this.authorizationHandler.setAuthorizationNotifier(this.notifier),this.notifier.setAuthorizationListener(function(e,t,n){t&&(s.authorizationCode=t.code)})}return e.prototype.fetchServiceConfiguration=function(e){var t=this;void 0===e&&(e=function(){}),i.AuthorizationServiceConfiguration.fetchFromIssuer(this.issuerUrl,c).then(function(n){t.configuration=n,e(t.configuration)})},e.prototype.authorizationRequest=function(e){var t=this;void 0===e&&(e=function(){});var n=new r.AuthorizationRequest(this.clientId,this.redirectUri,this.scopes,r.AuthorizationRequest.RESPONSE_TYPE_CODE,"state",{prompt:"consent",access_type:"offline"});if(!this.configuration)throw new Error("Client not yet configured");this.authorizationHandler.performAuthorizationRequest(this.configuration,n),this.authorizationHandler.completeAuthorizationRequestIfPossible().then(function(){return t.makeRefreshTokenRequest()}).then(function(e){return t.makeAccessTokenRequest(e)}).then(function(){e()})},e.prototype.refreshTokenRequest=function(e){void 0===e&&(e=function(){}),this.makeAccessTokenRequest(this.refreshToken).then(function(){e()})},e.prototype.makeAccessTokenRequest=function(e){var t=this,n=new s.TokenRequest(this.clientId,this.redirectUri,s.GRANT_TYPE_REFRESH_TOKEN,void 0,e);return this.tokenHandler.performTokenRequest(this.configuration,n).then(function(e){return t.accessToken=e.accessToken||"",t.idToken=e.idToken||"",t.refreshToken=e.refreshToken||"",t.accessToken})},e.prototype.makeRefreshTokenRequest=function(){var e=this;if(""===this.authorizationCode)throw new Error("Authorization request not completed");var t=new s.TokenRequest(this.clientId,this.redirectUri,s.GRANT_TYPE_AUTHORIZATION_CODE,this.authorizationCode,void 0);return this.tokenHandler.performTokenRequest(this.configuration,t).then(function(t){return e.refreshToken=t.refreshToken||""})},e}();t.OIDCClient=f},function(e,t,n){"use strict";const r=n(29),o=n(30);function i(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}function s(e,t){return t.decode?o(e):e}function u(e){const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function a(e,t){const n=function(e){let t;switch(e.arrayFormat){case"index":return(e,n,r)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return(e,n,r)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=Object.assign({decode:!0,arrayFormat:"none"},t)),r=Object.create(null);if("string"!=typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const o of e.split("&")){let[e,i]=o.replace(/\+/g," ").split("=");i=void 0===i?null:s(i,t),n(s(e,t),i,r)}return Object.keys(r).sort().reduce((e,t)=>{const n=r[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(n):e[t]=n,e},Object.create(null))}t.extract=u,t.parse=a,t.stringify=((e,t)=>{if(!e)return"";const n=function(e){switch(e.arrayFormat){case"index":return(t,n,r)=>null===n?[i(t,e),"[",r,"]"].join(""):[i(t,e),"[",i(r,e),"]=",i(n,e)].join("");case"bracket":return(t,n)=>null===n?[i(t,e),"[]"].join(""):[i(t,e),"[]=",i(n,e)].join("");default:return(t,n)=>null===n?i(t,e):[i(t,e),"=",i(n,e)].join("")}}(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)),r=Object.keys(e);return!1!==t.sort&&r.sort(t.sort),r.map(r=>{const o=e[r];if(void 0===o)return"";if(null===o)return i(r,t);if(Array.isArray(o)){const e=[];for(const t of o.slice())void 0!==t&&e.push(n(r,t,e.length));return e.join("&")}return i(r,t)+"="+i(o,t)}).filter(e=>e.length>0).join("&")}),t.parseUrl=((e,t)=>{const n=e.indexOf("#");return-1!==n&&(e=e.slice(0,n)),{url:e.split("?")[0]||"",query:a(u(e),t)}})},function(e,t,n){"use strict";e.exports=(e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))},function(e,t,n){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),o=new RegExp("(%[a-f0-9]{2})+","gi");function i(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],i(n),i(r))}function s(e){try{return decodeURIComponent(e)}catch(o){for(var t=e.match(r),n=1;n<t.length;n++)t=(e=i(t,n).join("")).match(r);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},n=o.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var r=s(n[0]);r!==n[0]&&(t[n[0]]=r)}n=o.exec(e)}t["%C2"]="�";for(var i=Object.keys(t),u=0;u<i.length;u++){var a=i[u];e=e.replace(new RegExp(a,"g"),t[a])}return e}(e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.open=function(e){return new Promise(function(t){window.SafariViewController.isAvailable(function(n){window.handleOpenURL=function(e){t(e),window.handleOpenURL=null},n?window.SafariViewController.show({url:e,enterReaderModeIfAvailable:!0}):window.open(e)})})},e}();t.Agent=r},function(e,t,n){e.exports=n(33)},function(e,t,n){"use strict";var r=n(0),o=n(18),i=n(35),s=n(9);function u(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var a=u(s);a.Axios=i,a.create=function(e){return u(r.merge(s,e))},a.Cancel=n(22),a.CancelToken=n(50),a.isCancel=n(21),a.all=function(e){return Promise.all(e)},a.spread=n(51),e.exports=a,e.exports.default=a},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(9),o=n(0),i=n(45),s=n(46);function u(e){this.defaults=e,this.interceptors={request:new i,response:new i}}u.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){u.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){u.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=u},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var a,c=[],f=!1,p=-1;function h(){f&&a&&(f=!1,a.length?c=a.concat(c):p=-1,c.length&&l())}function l(){if(!f){var e=u(h);f=!0;for(var t=c.length;t;){for(a=c,c=[];++p<t;)a&&a[p].run();p=-1,t=c.length}a=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function y(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new d(e,t)),1!==c.length||f||u(l)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(20);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))}))}),i=s.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}}),s):s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),s="",u=0,a=r;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if((n=i.charCodeAt(u+=.75))>255)throw new o;t=t<<8|n}return s}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),!0===s&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(47),i=n(21),s=n(9),u=n(48),a=n(49);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!u(e.url)&&(e.url=a(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||s.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(22);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}]);