// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iJYvl":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var _mainScss = require("./styles/main.scss");
const canvas = document.getElementById("canvas1");
// Game constants
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const ADD_ENEMY_INTERVAL = 1000; // in ms
const ENEMY_LIVES = 3;
const PROJECTILE_HEIGHT = 3;
const PROJECTILE_WIDTH = 10;
const PROJECTILE_AMMO_COUNT = 20;
const MAX_PROJECTILE_AMMO_COUNT = 50;
const PROJECTILE_AMMO_REFRESH_INTERVAL = 5000; // in ms
const PROJECTILE_AMMO_REFRESH_COUNT = 2; // increase projectile ammo by 2 every 500ms
const WINNING_SCORE = 6;
const GAME_TIMER_LIMIT = 100000; // in ms
const GAME_CANVAS_WIDTH = 1000;
const GAME_CANVAS_HEIGHT = 500;
// Keyboard inputs
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const SHOOT_PROJECTILE = " ";
const TOGGLE_GAME_DEBUG_MODE = "d";
// load event
window.addEventListener("load", ()=>{
    // canvas setup
    const ctx = canvas.getContext("2d");
    canvas.width = GAME_CANVAS_WIDTH;
    canvas.height = GAME_CANVAS_HEIGHT;
    // handling keyboard inputs
    class KeyboardInputHandler {
        constructor(game){
            this.game = game;
            // Logic for keeping track of presses and releases of keyboard inputs
            // When a key is pressed, and the key has not been already registered in the keys queue in the main game object
            // Register/store the key in the keys queue of the main game object
            window.addEventListener("keydown", (e)=>{
                if ((e.key === ARROW_UP || e.key === ARROW_DOWN) && this.game.keys.indexOf(e.key) === -1) this.game.keys.push(e.key);
                else if (e.key === SHOOT_PROJECTILE) this.game.player.shootTop();
                else if (e.key === TOGGLE_GAME_DEBUG_MODE) this.game.gameDebugMode = !this.game.gameDebugMode;
            //console.log(this.game.keys);
            });
            // When the key is released, remove the key from the keys queue of the main game object
            window.addEventListener("keyup", (e)=>{
                if (this.game.keys.indexOf(e.key) > -1) this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            });
        }
    }
    // for creating particles that fall off and bounce when the enemy is hit
    class Particle {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.spriteImage = document.getElementById("gears");
            this.frameX = Math.floor(Math.random() * 3); // row number in the sprite image
            this.frameY = Math.floor(Math.random() * 3); // column number in the sprite image
            this.spriteSize = 50;
            this.sizeModifier = Number((Math.random() * 0.5 + 0.5).toFixed(1));
            this.size = this.sizeModifier * this.spriteSize;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * -15;
            this.gravity = 0.5;
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1;
            this.bounced = 0; // keeping track of how many times the particle has bounced
            this.bottomBounceBoundary = Math.random() * 100 + 60;
        }
        /**
     * Update the position of the particle
     */ update() {
            this.angle += this.va;
            this.speedY += this.gravity;
            this.x -= this.speedX;
            this.y += this.speedY;
            // flag the particle for deletion if it falls off screen (vertically or horizontally)
            if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
            // for creating the bouncing effect
            if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
                this.bounced++;
                this.speedY *= -0.5;
            }
        }
        /**
     * Draw the particle sprite on the canvas
     * @param context
     */ draw(context) {
            context.save();
            // to rotate the particle
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.spriteImage, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, 0, 0, this.size, this.size);
            //   context.drawImage(
            //     this.spriteImage,
            //     this.frameX * this.spriteSize,
            //     this.frameY * this.spriteSize,
            //     this.spriteSize,
            //     this.spriteSize,
            //     this.x,
            //     this.y,
            //     this.size,
            //     this.size
            //   );
            context.restore();
        }
    }
    // Creating projectiles (projectiles will be spawned from players for shooting enemies)
    class Projectile {
        /**
     *
     * @param game
     * @param x // starting x position of the projectile
     * @param y // starting y position of the projectile
     * @param width // projectile width
     * @param height // projectile height
     * @param markedForDeletion // flag the projectile object for removal from the game when it crosses out the game canvas
     */ constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = PROJECTILE_WIDTH;
            this.height = PROJECTILE_HEIGHT;
            this.speed = 3;
            this.markedForDeletion = false;
            this.spriteImage = document.getElementById("projectile");
        }
        /**
     * Update the projectile's x-position
     */ update() {
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) // flag the projectile for deletion
            this.markedForDeletion = true;
        }
        /**
     * Draw the projectile object on the game canvas
     * @param context
     */ draw(context) {
            //   context.fillStyle = "yellow";
            //   context.fillRect(this.x, this.y, this.width, this.height);
            // draw the projectile sprite image
            context.drawImage(this.spriteImage, this.x, this.y);
        }
    }
    class Player {
        /**
     *
     * @param game
     */ constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = []; // queue for keeping track of the projectiles
            this.frameX = 0;
            this.frameY = 0;
            this.frameCount = 37;
            this.spriteImage = document.getElementById("player");
            this.powerUp = false;
            this.powerUpTimer = 3000;
            this.powerUpTimerLimit = 6000;
        }
        /**
     * Update the position of the player object
     */ update(deltaTime) {
            if (this.game.keys.includes(ARROW_UP)) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes(ARROW_DOWN)) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // vertical boundaries for the projectile
            if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            // handle the projectiles
            this.projectiles.forEach((projectile)=>projectile.update());
            // clear projectiles that have been marked for deletion from the projectiles store
            this.projectiles = this.projectiles.filter((projectile)=>!projectile.markedForDeletion);
            // sprite animation: cycling between frames in the sprite image horizontally
            if (this.frameX < this.frameCount) this.frameX++;
            else this.frameX = 0;
            // handling power up
            if (this.powerUp) {
                if (this.powerUpTimer > this.powerUpTimerLimit) {
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                } else {
                    this.powerUpTimer += Number(deltaTime);
                    this.frameY = 1;
                    this.game.ammo += 0.1;
                }
            }
        }
        /**
     * Player attack mode for shooting projectiles from the top
     */ shootTop() {
            if (this.game.ammo > 0) {
                // register the projectile in the projectiles queue
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                this.game.ammo--; // reduce the player's ammo
            }
            // also shoot from bottom if the player is in power-up mode
            if (this.powerUp) this.shootBottom();
        }
        /**
     * Player attack mode for shooting projectiles from tail
     */ shootBottom() {
            if (this.game.ammo > 0) {
                // register the projectile
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
                this.game.ammo--; //reduce the player's ammo
            }
        }
        /**
     * Enter power up mode
     */ enterPowerupMode() {
            this.powerUpTimer = 0;
            this.powerUp = true;
            this.game.ammo = this.game.maxAmmo;
        }
        /**
     * Draw the player on the canvas 2D context
     * @param context
     */ draw(context) {
            context.fillStyle = "black";
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // rendering the projectiles
            this.projectiles.forEach((projectile)=>projectile.draw(context));
        }
    }
    class Enemy {
        constructor(game){
            this.game = game;
            this.width = ENEMY_WIDTH;
            this.height = ENEMY_HEIGHT;
            this.x = this.game.width;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.speedX = Math.random() * -1.5 - 0.5;
            this.markedForDeletion = false;
            this.lives = ENEMY_LIVES;
            this.score = this.lives;
            this.frameX = 0;
            this.frameY = 0;
            this.frameCount = 37;
            this.type = "";
        }
        /**
     * Update the enemy's x-position
     */ update() {
            this.x += this.speedX - this.game.speed;
            // check if the enemy has moved completely off the game screen
            if (this.x + this.width < 0) this.markedForDeletion = true;
            // sprite animation
            if (this.frameX < this.frameCount) this.frameX++;
            else this.frameX = 0;
        }
        draw(context) {}
    }
    class Angler1 extends Enemy {
        constructor(game){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.score = 2;
            this.spriteImage = document.getElementById("angler1");
            this.type = "angler1";
        }
        /**
     * Draw the enemy object on the game canvas
     * @param context
     */ draw(context) {
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            // draw the sprite image
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // display the enemy live
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            if (this.game.gameDebugMode) context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    class Angler2 extends Enemy {
        constructor(game){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.score = 2;
            this.spriteImage = document.getElementById("angler2");
            this.type = "angler2";
        }
        /**
     * Draw the enemy object on the game canvas
     * @param context
     */ draw(context) {
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            // draw the sprite image
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // display the enemy live
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            if (this.game.gameDebugMode) context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    class LuckyFish extends Enemy {
        constructor(game){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 99;
            this.height = 95;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.score = 3;
            this.spriteImage = document.getElementById("lucky");
            this.type = "lucky";
        }
        /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */ draw(context) {
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            // draw the sprite image
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // display the enemy live
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            if (this.game.gameDebugMode) context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    class HiveWhale extends Enemy {
        constructor(game){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 400;
            this.height = 227;
            this.y = Math.random() * (this.game.height * 0.95 - this.height);
            this.score = 15;
            this.lives = 15;
            this.spriteImage = document.getElementById("hivewhale");
            this.type = "hivewhale";
            this.speedX = Math.random() * -0.1 - 0.05;
        }
        /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */ draw(context) {
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            // draw the sprite image
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // display the enemy live
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            if (this.game.gameDebugMode) context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    class Drone extends Enemy {
        constructor(game, parentX, parentY){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 115;
            this.height = 95;
            this.x = parentX;
            this.y = parentY;
            this.score = 3;
            this.lives = 3;
            this.spriteImage = document.getElementById("drone");
            this.type = "drone";
            this.speedX = Math.random() * -4.2 - 0.5;
        }
        /**
     * Draw the enemy (lucky fish) object on the game canvas
     * @param context
     */ draw(context) {
            if (this.game.gameDebugMode) context.strokeRect(this.x, this.y, this.width, this.height);
            // draw the sprite image
            context.drawImage(this.spriteImage, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // display the enemy live
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            if (this.game.gameDebugMode) context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    // a parallax layer
    class Layer {
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }
        /**
     * Update the layer's x-position to create a parallax effect
     */ update() {
            if (this.x <= -this.width) this.x = 0;
            else this.x -= this.game.speed * this.speedModifier;
        }
        /**
     * Draw the layer on the canvas
     * @param context
     */ draw(context) {
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }
    // Handle the logic for combining each layer to create the game world
    class Background {
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById("layer1");
            this.image2 = document.getElementById("layer2");
            this.image3 = document.getElementById("layer3");
            this.image4 = document.getElementById("layer4");
            this.layer1 = new Layer(this.game, this.image1, 0.2);
            this.layer2 = new Layer(this.game, this.image2, 0.3);
            this.layer3 = new Layer(this.game, this.image3, 1);
            this.layer4 = new Layer(this.game, this.image4, 1.3);
            this.layers = [
                this.layer1,
                this.layer2,
                this.layer3
            ];
        // NOTE: layer4 will be a foreground layer
        }
        update() {
            this.layers.forEach((layer)=>layer.update());
        }
        draw(context) {
            this.layers.forEach((layer)=>layer.draw(context));
        }
    }
    class Explosion {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.frameX = 0;
            this.spriteHeight = 200;
            this.fps = 30;
            this.timer = 0; // to control the fps for the explosion animation
            this.interval = 1000 / this.fps;
            this.markedForDeletion = false;
            this.maxFrame = 8;
        }
        /**
     * Update the explosion - sprite animation
     * @param deltaTime
     */ update(deltaTime) {
            this.x -= this.game.speed;
            if (this.timer > this.interval) {
                this.frameX++;
                this.timer = 0;
            } else this.timer += deltaTime;
            if (this.frameX > this.maxFrame) this.markedForDeletion = true;
        }
        draw(context) {}
    }
    class SmokeExplosion extends Explosion {
        constructor(game, x, y){
            super(game, x, y);
            this.spriteImage = document.getElementById("smokeExplosion");
            this.spriteWidth = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
        }
        draw(context) {
            context.drawImage(this.spriteImage, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
    class FireExplosion extends Explosion {
        constructor(game, x, y){
            super(game, x, y);
            this.spriteImage = document.getElementById("fireExplosion");
            this.spriteWidth = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
        }
        draw(context) {
            context.drawImage(this.spriteImage, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
    // for drawing/showing messages and statuses on the game
    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = "Raleway";
            this.color = "white";
        }
        draw(context) {
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = "black";
            context.font = `${this.fontSize}px ${this.fontFamily}`;
            // display current game score
            context.fillText(`Score: ${this.game.score}`, 20, 40);
            // display game timer
            const formattedGameTimer = (this.game.gameTimer / 1000).toFixed(1);
            context.fillText(`Timer: ${formattedGameTimer}`, 20, 100);
            // displaying game over messages
            if (this.game.gameOver) {
                context.textAlign = "center";
                let message1;
                let message2;
                if (this.game.score >= WINNING_SCORE) {
                    message1 = "You Win!";
                    message2 = "Well done explorer.";
                } else {
                    message1 = "You Lose!";
                    message2 = "Try again next time.";
                }
                // display the first message
                context.font = `75px ${this.fontFamily}`;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 0);
                // display the second message
                context.font = `25px ${this.fontFamily}`;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
            // display player ammo level
            if (this.game.player.powerUp) // draw the ammo level with a different color in power up mode
            context.fillStyle = "yellow";
            for(let i = 0; i < this.game.ammo; i++)context.fillRect(20 + 5 * i, 50, 3, 20);
            context.restore();
        }
    }
    // The brain of the entire project
    class Game {
        /**
     * @param width // width of the game canvas
     * @param height // height of the game canvas
     */ constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.UI = new UI(this);
            this.keyboardInput = new KeyboardInputHandler(this);
            this.keys = [];
            this.ammo = PROJECTILE_AMMO_COUNT;
            this.maxAmmo = MAX_PROJECTILE_AMMO_COUNT;
            this.ammoInterval = PROJECTILE_AMMO_REFRESH_INTERVAL;
            this.ammoTimer = 0;
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = ADD_ENEMY_INTERVAL;
            this.gameOver = false;
            this.score = 0;
            this.gameTimer = 0;
            this.gameTimerLimit = GAME_TIMER_LIMIT;
            this.speed = 1;
            this.background = new Background(this);
            this.gameDebugMode = false;
            this.particles = [];
            this.explosions = [];
        }
        /**
     * Update the general game state
     * @param deltaTime // time counter from the animation loop
     */ update(deltaTime) {
            // update the game timer
            if (!this.gameOver) this.gameTimer += deltaTime;
            if (this.gameTimer >= this.gameTimerLimit) this.gameOver = true;
            this.player.update(deltaTime);
            // handling ammo refresh periodically
            if (this.ammoTimer < this.ammoInterval) this.ammoTimer += deltaTime;
            else {
                if (this.ammo < this.maxAmmo) this.ammo += PROJECTILE_AMMO_REFRESH_COUNT;
                this.ammoTimer = 0; //reset the ammo timer
            }
            // handling enemies
            this.enemies.forEach((enemy)=>{
                enemy.update();
                console.log(enemy.type, enemy.lives);
                // check for collision between the enemy and player
                if (this.checkCollision(enemy, this.player) && !this.gameOver) {
                    enemy.markedForDeletion = true;
                    // create a new explosion
                    this.addExplosion(enemy);
                    // spawn the particle gears when the projectile collides with the enemy
                    for(let i = 0; i < enemy.score; i++)this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    if (enemy.type === "lucky") {
                        if (!this.player.powerUp) this.player.enterPowerupMode();
                    } else this.score--;
                }
                // handling particles
                this.particles.forEach((particle)=>particle.update());
                // filter out particles that have been flagged for deletion
                this.particles = this.particles.filter((particle)=>!particle.markedForDeletion);
                // handling explosions
                this.explosions.forEach((explosion)=>explosion.update(deltaTime));
                // filter out explosions that have been flagged for deletion
                this.explosions = this.explosions.filter((explosion)=>!explosion.markedForDeletion);
                // check collision between projectile and enemy
                this.player.projectiles.forEach((projectile)=>{
                    if (this.checkCollision(projectile, enemy)) {
                        // flag the projectile for deletion
                        projectile.markedForDeletion = true;
                        if (!this.gameOver) enemy.lives--;
                        if (enemy.lives <= 0) {
                            // flag the enemy for deletion
                            enemy.markedForDeletion = true;
                            // create new explosion
                            this.addExplosion(enemy);
                            // spawn the particle gears when the projectile collides with the enemy
                            for(let i = 0; i < enemy.score; i++)this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                            // spawn the drone enemies if the destroyed enemy is the hivewhale
                            if (enemy.type === "hivewhale") // console.log("hivewhale destroyed");
                            // spawn five new hive whales
                            for(let i1 = 0; i1 < 5; i1++)this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.5));
                            // increment the game score by the enemy's score weight
                            if (!this.gameOver) this.score += enemy.score;
                            if (this.score >= WINNING_SCORE) this.gameOver = true;
                        }
                    }
                });
            });
            // filter out enemies that have been flagged for deletion
            this.enemies = this.enemies.filter((enemy)=>!enemy.markedForDeletion);
            // handling periodic creation of enemies
            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else this.enemyTimer += deltaTime;
            // update the background
            this.background.update();
            // update layer4 background
            this.background.layer4.update();
        }
        /**
     * Render the player on the canvas
     */ draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.particles.forEach((particle)=>particle.draw(context));
            this.enemies.forEach((enemy)=>{
                enemy.draw(context);
            });
            this.explosions.forEach((explosion)=>explosion.draw(context));
            this.background.layer4.draw(context);
            // update the UI
            this.UI.draw(context);
        }
        /**
     * Add a new enemy to the enemy store
     */ addEnemy() {
            // add either an angler1 or angler2 enemy object
            const rand = Math.random();
            if (rand < 0.4) this.enemies.push(new Angler1(this));
            else if (rand < 0.8) this.enemies.push(new Angler2(this));
            else if (rand < 0.9) this.enemies.push(new HiveWhale(this));
            else this.enemies.push(new LuckyFish(this));
        }
        addExplosion(enemy) {
            const rand = Math.random();
            if (rand < 0.5) this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            else this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        }
        /**
     * To check for collision between two objects i.e. enemy and projectile or enemy and player
     */ checkCollision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
        }
    }
    // initialize the game object
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0; // for handling periodic events logic
    // animation loop: usually 60fps
    const animate = (timeStamp)=>{
        const deltaTime = timeStamp - lastTime; // difference between the timestamp of the current loop and the previous loop (i.e. time between frames)
        lastTime = timeStamp; // update the "lastTime"
        // delete all canvas drawings between each animation frame loop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    };
    animate(0);
}); // Note:
 // Objects in JavaScript are reference data-types and unlike primitive data-types, they are dynamic in nature
 // Inheritance - where all child classes inherit the properties and methods of a parent class can be used to reduce code duplication
 // particle effects and physics

},{"./styles/main.scss":"bo7w8"}],"bo7w8":[function() {},{}]},["iJYvl","h7u1C"], "h7u1C", "parcelRequire479d")

//# sourceMappingURL=index.b71e74eb.js.map
