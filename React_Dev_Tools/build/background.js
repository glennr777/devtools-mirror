<<<<<<< HEAD
(()=>{var e={5603:()=>{const e=[{id:"@react-devtools/proxy",js:["build/proxy.js"],matches:["<all_urls>"],persistAcrossSessions:!0,runAt:"document_end",world:chrome.scripting.ExecutionWorld.ISOLATED},{id:"@react-devtools/file-fetcher",js:["build/fileFetcher.js"],matches:["<all_urls>"],persistAcrossSessions:!0,runAt:"document_end",world:chrome.scripting.ExecutionWorld.ISOLATED},{id:"@react-devtools/hook",js:["build/installHook.js"],matches:["<all_urls>"],persistAcrossSessions:!0,runAt:"document_start",world:chrome.scripting.ExecutionWorld.MAIN},{id:"@react-devtools/hook-settings-injector",js:["build/hookSettingsInjector.js"],matches:["<all_urls>"],persistAcrossSessions:!0,runAt:"document_start"}];!async function(){try{await chrome.scripting.unregisterContentScripts(),await chrome.scripting.registerContentScripts(e)}catch(e){console.error(e)}}()}},t={};function __webpack_require__(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,__webpack_require__),r.exports}(()=>{"use strict";__webpack_require__(5603);const background_setExtensionIconAndPopup=function(e,t){chrome.action.setIcon({tabId:t,path:{16:chrome.runtime.getURL(`icons/16-${e}.png`),32:chrome.runtime.getURL(`icons/32-${e}.png`),48:chrome.runtime.getURL(`icons/48-${e}.png`),128:chrome.runtime.getURL(`icons/128-${e}.png`)}}),chrome.action.setPopup({tabId:t,popup:chrome.runtime.getURL(`popups/${e}.html`)})};function isRestrictedBrowserPage(e){if(!e)return!0;const t=new URL(e).protocol;return"chrome:"===t||"about:"===t}function checkAndHandleRestrictedPageIfSo(e){e&&isRestrictedBrowserPage(e.url)&&background_setExtensionIconAndPopup("restricted",e.id)}function executeScriptInMainWorld({target:e,files:t}){return chrome.scripting.executeScript({target:e,files:t,world:chrome.scripting.ExecutionWorld.MAIN})}chrome.tabs.query({},(e=>e.forEach(checkAndHandleRestrictedPageIfSo))),chrome.tabs.onCreated.addListener((e=>checkAndHandleRestrictedPageIfSo(e))),chrome.tabs.onUpdated.addListener(((e,t,n)=>{t.url&&isRestrictedBrowserPage(t.url)&&background_setExtensionIconAndPopup("restricted",e)}));const e=["compact"];const t={};function registerTab(e){t[e]||(t[e]={extension:null,proxy:null,disconnectPipe:null})}function connectExtensionAndProxyPorts(e,n,o){if(!e)throw new Error("Attempted to connect ports, when extension port is not present");if(!n)throw new Error("Attempted to connect ports, when proxy port is not present");if(t[o].disconnectPipe)throw new Error(`Attempted to connect already connected ports for tab with id ${o}`);function extensionPortMessageListener(e){try{n.postMessage(e)}catch(e){0,disconnectListener()}}function proxyPortMessageListener(t){try{e.postMessage(t)}catch(e){0,disconnectListener()}}function disconnectListener(){e.onMessage.removeListener(extensionPortMessageListener),n.onMessage.removeListener(proxyPortMessageListener),delete t[o].disconnectPipe}t[o].disconnectPipe=disconnectListener,e.onMessage.addListener(extensionPortMessageListener),n.onMessage.addListener(proxyPortMessageListener),e.onDisconnect.addListener(disconnectListener),n.onDisconnect.addListener(disconnectListener)}chrome.runtime.onConnect.addListener((e=>{if("proxy"===e.name){if(null==e.sender?.tab?.id)return;const n=e.sender.tab.id;return t[n]?.proxy&&(t[n].disconnectPipe?.(),t[n].proxy.disconnect()),registerTab(n),function(e,n){t[n].proxy=e,e.onDisconnect.addListener((()=>{t[n].disconnectPipe?.(),delete t[n].proxy}))}(e,n),void(t[n].extension&&connectExtensionAndProxyPorts(t[n].extension,t[n].proxy,n))}if(+(n=e.name)+""===n){const n=+e.name;return registerTab(n),function(e,n){t[n].extension=e,e.onDisconnect.addListener((()=>{t[n].disconnectPipe?.(),delete t[n].extension}))}(e,n),void(t[n].proxy&&connectExtensionAndProxyPorts(t[n].extension,t[n].proxy,n))}var n;console.warn(`Unknown port ${e.name} connected`)})),chrome.runtime.onMessage.addListener(((t,n)=>{switch(t?.source){case"devtools-page":!function(e){const{payload:t}=e;switch(t?.type){case"fetch-file-with-cache":{const{payload:{tabId:t,url:n}}=e;if(!t)throw new Error("Couldn't fetch file sources: tabId not specified");if(!n)throw new Error("Couldn't fetch file sources: url not specified");chrome.tabs.sendMessage(t,{source:"devtools-page",payload:{type:"fetch-file-with-cache",url:n}});break}case"inject-backend-manager":{const{payload:{tabId:t}}=e;if(!t)throw new Error("Couldn't inject backend manager: tabId not specified");executeScriptInMainWorld({target:{tabId:t},files:["/build/backendManager.js"]});break}}}(t);break;case"react-devtools-fetch-resource-content-script":!function(e){const{payload:t}=e;switch(t?.type){case"fetch-file-with-cache-complete":case"fetch-file-with-cache-error":chrome.runtime.sendMessage({source:"react-devtools-background",payload:t})}}(t);break;case"react-devtools-backend-manager":!function(t,n){const{payload:o}=t;"require-backends"===o?.type&&o.versions.forEach((t=>{e.includes(t)&&executeScriptInMainWorld({target:{tabId:n.tab.id},files:[`/build/react_devtools_backend_${t}.js`]})}))}(t,n);break;case"react-devtools-hook":!function(e,t){const{payload:n}=e;"react-renderer-attached"===n?.type&&background_setExtensionIconAndPopup(n.reactBuildType,t.tab.id)}(t,n)}})),chrome.tabs.onActivated.addListener((({tabId:e})=>{for(const n in t)if(null!=t[n].proxy&&null!=t[n].extension){const o=e===+n?"resumeElementPolling":"pauseElementPolling";t[n].extension.postMessage({event:o})}}))})()})();
=======
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 119);
/******/ })
/************************************************************************/
/******/ ({

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* global chrome */



const ports = {};

async function dynamicallyInjectContentScripts() {
  const contentScriptsToInject = [{
    id: 'hook',
    matches: ['<all_urls>'],
    js: ['build/installHook.js'],
    runAt: 'document_start',
    world: chrome.scripting.ExecutionWorld.MAIN
  }, {
    id: 'renderer',
    matches: ['<all_urls>'],
    js: ['build/renderer.js'],
    runAt: 'document_start',
    world: chrome.scripting.ExecutionWorld.MAIN
  }];

  try {
    // For some reason dynamically injected scripts might be already registered
    // Registering them again will fail, which will result into
    // __REACT_DEVTOOLS_GLOBAL_HOOK__ hook not being injected
    // Not specifying ids, because Chrome throws an error
    // if id of non-injected script is provided
    await chrome.scripting.unregisterContentScripts(); // equivalent logic for Firefox is in prepareInjection.js
    // Manifest V3 method of injecting content script
    // TODO(hoxyq): migrate Firefox to V3 manifests
    // Note: the "world" option in registerContentScripts is only available in Chrome v102+
    // It's critical since it allows us to directly run scripts on the "main" world on the page
    // "document_start" allows it to run before the page's scripts
    // so the hook can be detected by react reconciler

    await chrome.scripting.registerContentScripts(contentScriptsToInject);
  } catch (error) {
    console.error(error);
  }
}

if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
  dynamicallyInjectContentScripts();
}

chrome.runtime.onConnect.addListener(function (port) {
  let tab = null;
  let name = null;

  if (isNumeric(port.name)) {
    tab = port.name;
    name = 'devtools';
    installProxy(+port.name);
  } else {
    tab = port.sender.tab.id;
    name = 'content-script';
  }

  if (!ports[tab]) {
    ports[tab] = {
      devtools: null,
      'content-script': null
    };
  }

  ports[tab][name] = port;

  if (ports[tab].devtools && ports[tab]['content-script']) {
    doublePipe(ports[tab].devtools, ports[tab]['content-script'], tab);
  }
});

function isNumeric(str) {
  return +str + '' === str;
}

function installProxy(tabId) {
  if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
    chrome.tabs.executeScript(tabId, {
      file: '/build/proxy.js'
    }, function () {});
  } else {
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      files: ['/build/proxy.js']
    });
  }
}

function doublePipe(one, two, tabId) {
  one.onMessage.addListener(lOne);

  function lOne(message) {
    try {
      two.postMessage(message);
    } catch (e) {
      if (false) {}

      shutdown();
    }
  }

  two.onMessage.addListener(lTwo);

  function lTwo(message) {
    try {
      one.postMessage(message);
    } catch (e) {
      if (false) {}

      shutdown();
    }
  }

  function shutdown() {
    one.onMessage.removeListener(lOne);
    two.onMessage.removeListener(lTwo);
    one.disconnect();
    two.disconnect(); // clean up so that we can rebuild the double pipe if the page is reloaded

    ports[tabId] = null;
  }

  one.onDisconnect.addListener(shutdown);
  two.onDisconnect.addListener(shutdown);
}

function setIconAndPopup(reactBuildType, tabId) {
  const action = _utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"] ? chrome.browserAction : chrome.action;
  action.setIcon({
    tabId: tabId,
    path: {
      '16': chrome.runtime.getURL(`icons/16-${reactBuildType}.png`),
      '32': chrome.runtime.getURL(`icons/32-${reactBuildType}.png`),
      '48': chrome.runtime.getURL(`icons/48-${reactBuildType}.png`),
      '128': chrome.runtime.getURL(`icons/128-${reactBuildType}.png`)
    }
  });
  action.setPopup({
    tabId: tabId,
    popup: chrome.runtime.getURL(`popups/${reactBuildType}.html`)
  });
}

function isRestrictedBrowserPage(url) {
  return !url || new URL(url).protocol === 'chrome:';
}

function checkAndHandleRestrictedPageIfSo(tab) {
  if (tab && isRestrictedBrowserPage(tab.url)) {
    setIconAndPopup('restricted', tab.id);
  }
} // update popup page of any existing open tabs, if they are restricted browser pages.
// we can't update for any other types (prod,dev,outdated etc)
// as the content script needs to be injected at document_start itself for those kinds of detection
// TODO: Show a different popup page(to reload current page probably) for old tabs, opened before the extension is installed


if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
  chrome.tabs.query({}, tabs => tabs.forEach(checkAndHandleRestrictedPageIfSo));
  chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => checkAndHandleRestrictedPageIfSo(tab));
} // Listen to URL changes on the active tab and update the DevTools icon.


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
    // We don't properly detect protected URLs in Firefox at the moment.
    // However we can reset the DevTools icon to its loading state when the URL changes.
    // It will be updated to the correct icon by the onMessage callback below.
    if (tab.active && changeInfo.status === 'loading') {
      setIconAndPopup('disabled', tabId);
    }
  } else {
    // Don't reset the icon to the loading state for Chrome or Edge.
    // The onUpdated callback fires more frequently for these browsers,
    // often after onMessage has been called.
    checkAndHandleRestrictedPageIfSo(tab);
  }
});
chrome.runtime.onMessage.addListener((request, sender) => {
  var _request$payload, _request$payload2;

  const tab = sender.tab; // sender.tab.id from content script points to the tab that injected the content script

  if (tab) {
    const id = tab.id; // This is sent from the hook content script.
    // It tells us a renderer has attached.

    if (request.hasDetectedReact) {
      setIconAndPopup(request.reactBuildType, id);
    } else {
      var _ports$id;

      const devtools = (_ports$id = ports[id]) === null || _ports$id === void 0 ? void 0 : _ports$id.devtools;

      switch ((_request$payload = request.payload) === null || _request$payload === void 0 ? void 0 : _request$payload.type) {
        case 'fetch-file-with-cache-complete':
        case 'fetch-file-with-cache-error':
          // Forward the result of fetch-in-page requests back to the extension.
          devtools === null || devtools === void 0 ? void 0 : devtools.postMessage(request);
          break;
        // This is sent from the backend manager running on a page

        case 'react-devtools-required-backends':
          const backendsToDownload = [];
          request.payload.versions.forEach(version => {
            if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* EXTENSION_CONTAINED_VERSIONS */ "b"].includes(version)) {
              if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
                // equivalent logic for Firefox is in prepareInjection.js
                chrome.scripting.executeScript({
                  target: {
                    tabId: id
                  },
                  files: [`/build/react_devtools_backend_${version}.js`],
                  world: chrome.scripting.ExecutionWorld.MAIN
                });
              }
            } else {
              backendsToDownload.push(version);
            }
          }); // Request the necessary backends in the extension DevTools UI
          // TODO: handle this message in main.js to build the UI

          devtools === null || devtools === void 0 ? void 0 : devtools.postMessage({
            payload: {
              type: 'react-devtools-additional-backends',
              versions: backendsToDownload
            }
          });
          break;
      }
    }
  } // sender.tab.id from devtools page may not exist, or point to the undocked devtools window
  // so we use the payload to get the tab id


  if ((_request$payload2 = request.payload) === null || _request$payload2 === void 0 ? void 0 : _request$payload2.tabId) {
    var _request$payload3;

    const tabId = (_request$payload3 = request.payload) === null || _request$payload3 === void 0 ? void 0 : _request$payload3.tabId; // This is sent from the devtools page when it is ready for injecting the backend

    if (request.payload.type === 'react-devtools-inject-backend-manager') {
      if (!_utils__WEBPACK_IMPORTED_MODULE_0__[/* IS_FIREFOX */ "e"]) {
        // equivalent logic for Firefox is in prepareInjection.js
        chrome.scripting.executeScript({
          target: {
            tabId
          },
          files: ['/build/backendManager.js'],
          world: chrome.scripting.ExecutionWorld.MAIN
        });
      }
    }
  }
});

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IS_EDGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return IS_FIREFOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return IS_CHROME; });
/* unused harmony export getBrowserName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getBrowserTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPACT_VERSION_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EXTENSION_CONTAINED_VERSIONS; });
/* global chrome */
const IS_EDGE = navigator.userAgent.indexOf('Edg') >= 0;
const IS_FIREFOX = navigator.userAgent.indexOf('Firefox') >= 0;
const IS_CHROME = IS_EDGE === false && IS_FIREFOX === false;
function getBrowserName() {
  if (IS_EDGE) {
    return 'Edge';
  }

  if (IS_FIREFOX) {
    return 'Firefox';
  }

  if (IS_CHROME) {
    return 'Chrome';
  }

  throw new Error('Expected browser name to be one of Chrome, Edge or Firefox.');
}
function getBrowserTheme() {
  if (IS_CHROME) {
    // chrome.devtools.panels added in Chrome 18.
    // chrome.devtools.panels.themeName added in Chrome 54.
    return chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light';
  } else {
    // chrome.devtools.panels.themeName added in Firefox 55.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels/themeName
    if (chrome.devtools && chrome.devtools.panels) {
      switch (chrome.devtools.panels.themeName) {
        case 'dark':
          return 'dark';

        default:
          return 'light';
      }
    }
  }
}
const COMPACT_VERSION_NAME = 'compact';
const EXTENSION_CONTAINED_VERSIONS = [COMPACT_VERSION_NAME];

/***/ })

/******/ });
>>>>>>> 664d11905d5f6e4124d22ac3027a695b887affd0
