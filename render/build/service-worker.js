"use strict";var precacheConfig=[["./index.html","8f76a172d5f228c194f993aa1296c418"],["./static/css/main.fdaf9fd2.css","fbaaa4e663479b36d116987476dc4bb2"],["./static/js/main.486b759d.js","581c434a67db7300f40492069d87baa8"],["./static/media/bi40.b0a905e3.svg","b0a905e34dd899af72a97597ba7852b8"],["./static/media/bi41.0329ddd6.svg","0329ddd6a688aecc76ce5473a47d046b"],["./static/media/boxfill.7f56cc23.png","7f56cc2328c4b24072e43e4a4d38a9c7"],["./static/media/con-cflnumber.b69d8780.png","b69d87808bc732ee1cb03d5975554682"],["./static/media/con-coefh1.310aa5f8.png","310aa5f8650db0302b58ba39767c4600"],["./static/media/con-coefh2.ba3b77ee.png","ba3b77eef802037568a6699b232eff36"],["./static/media/con-coefsound.54408227.png","54408227351acc9a0ad9a89f49d9d623"],["./static/media/con-gamma.03839ffc.png","03839ffc1249e3fd12aeeeff3108d2b1"],["./static/media/con-hswl.be7c99ff.png","be7c99ff414ac9a6e30ad4b369993362"],["./static/media/con-lattice.bf24b67f.png","bf24b67ff4602e2c0f06f064671b2688"],["./static/media/con-rhop0.1b91ab8f.png","1b91ab8f488918b070882bfface3b132"],["./static/media/con-speedsound.8d6b8d2a.png","8d6b8d2af7a579dbecd8b2bccbff212c"],["./static/media/con-speedsystem.56027d64.png","56027d64766d86666d95b3790e14bcbb"],["./static/media/container0.dbdfb616.png","dbdfb616687074926a184edfb6483d5f"],["./static/media/container1.ea270cd7.png","ea270cd7fc98c869c4a2b4e5e6100863"],["./static/media/csv0.c09b0007.svg","c09b0007f67ed6542302c9b936db0503"],["./static/media/csv1.82bb3f92.svg","82bb3f92b8523ded63467bc1752b0b34"],["./static/media/draw-mode.d1118832.png","d11188328948c0dc64cf74e98f9f92a0"],["./static/media/out0.5bdc03c4.svg","5bdc03c437824dc1782e5fe9c4dc2c26"],["./static/media/out1.2d56b2ae.svg","2d56b2ae433fef8591d18ee6a47cc135"],["./static/media/quadri.8db8e1d0.png","8db8e1d041ff1f00eae5bb03a5296795"],["./static/media/rsm0.4c9582f2.svg","4c9582f28c74cdb1b9ae48d66302e4d7"],["./static/media/rsm1.31ed9d97.svg","31ed9d977e9afe2568e455db44a3ba5d"],["./static/media/strip.3a85e6e7.png","3a85e6e7844afe0083e8cc1fa9b93046"],["./static/media/vtk0.333642e3.svg","333642e383f492b657ca020286c6087f"],["./static/media/vtk1.72365385.svg","72365385794040e1ba6349f25b402ec6"],["./static/media/xml0.aa1074f3.svg","aa1074f3d9af474522cd2b5622337249"],["./static/media/xml1.4c1b78f8.svg","4c1b78f8a7a2d886eba0ea6394ffe693"],["./static/media/关于0.d0e6a289.svg","d0e6a2894460192edce28fa561ef6d75"],["./static/media/关于1.11b320a3.svg","11b320a3cb041cfe64373b4a34beaa54"],["./static/media/参数0.9d8959ec.svg","9d8959ecf3e1b598b23097f5bbff1141"],["./static/media/参数1.b51d6335.svg","b51d633551b4b95b043efe232ee9eacd"],["./static/media/格式0.5173b794.svg","5173b7945934d9552713a857d588ef7f"],["./static/media/格式1.9135a365.svg","9135a365c35597d89ff287b9f3194db5"],["./static/media/模型0.b668aa68.svg","b668aa6884b4b61b656832b1873a6df8"],["./static/media/模型1.b9301ad1.svg","b9301ad117d96ac8f11a8aebee187d01"],["./static/media/首选项0.a3293a7a.svg","a3293a7ac12eac2fb84f2d5e4bd746d4"],["./static/media/首选项1.656c6458.svg","656c64582e61a6fbba898cddb989dc82"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="./index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});