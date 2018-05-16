"use strict";var precacheConfig=[["./index.html","2227624f0e3801547627c4bbcca70303"],["./static/css/main.46f0861e.css","5e1d5b51d4b09b2c151910a756deef0a"],["./static/js/main.1b733f5e.js","0b0d3b9793ac5b11d67bff9c184b85bd"],["./static/media/bi40.b0a905e3.svg","b0a905e34dd899af72a97597ba7852b8"],["./static/media/bi41.0329ddd6.svg","0329ddd6a688aecc76ce5473a47d046b"],["./static/media/csv0.c09b0007.svg","c09b0007f67ed6542302c9b936db0503"],["./static/media/csv1.82bb3f92.svg","82bb3f92b8523ded63467bc1752b0b34"],["./static/media/out0.5bdc03c4.svg","5bdc03c437824dc1782e5fe9c4dc2c26"],["./static/media/out1.2d56b2ae.svg","2d56b2ae433fef8591d18ee6a47cc135"],["./static/media/rsm0.4c9582f2.svg","4c9582f28c74cdb1b9ae48d66302e4d7"],["./static/media/rsm1.31ed9d97.svg","31ed9d977e9afe2568e455db44a3ba5d"],["./static/media/vtk0.333642e3.svg","333642e383f492b657ca020286c6087f"],["./static/media/vtk1.72365385.svg","72365385794040e1ba6349f25b402ec6"],["./static/media/xml0.aa1074f3.svg","aa1074f3d9af474522cd2b5622337249"],["./static/media/xml1.4c1b78f8.svg","4c1b78f8a7a2d886eba0ea6394ffe693"],["./static/media/关于0.d0e6a289.svg","d0e6a2894460192edce28fa561ef6d75"],["./static/media/关于1.11b320a3.svg","11b320a3cb041cfe64373b4a34beaa54"],["./static/media/参数0.9d8959ec.svg","9d8959ecf3e1b598b23097f5bbff1141"],["./static/media/参数1.b51d6335.svg","b51d633551b4b95b043efe232ee9eacd"],["./static/media/格式0.5173b794.svg","5173b7945934d9552713a857d588ef7f"],["./static/media/格式1.9135a365.svg","9135a365c35597d89ff287b9f3194db5"],["./static/media/模型0.b668aa68.svg","b668aa6884b4b61b656832b1873a6df8"],["./static/media/模型1.b9301ad1.svg","b9301ad117d96ac8f11a8aebee187d01"],["./static/media/首选项0.a3293a7a.svg","a3293a7ac12eac2fb84f2d5e4bd746d4"],["./static/media/首选项1.656c6458.svg","656c64582e61a6fbba898cddb989dc82"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="./index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});