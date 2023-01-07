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
})({"6Ictx":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
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
const WINNING_SCORE = 20;
const GAME_TIMER_LIMIT = 10000; // in ms
// Keyboard inputs
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const SHOOT_PROJECTILE = " ";
// load event
window.addEventListener("load", ()=>{
    // canvas setup
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
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
            //console.log(this.game.keys);
            });
            // When the key is released, remove the key from the keys queue of the main game object
            window.addEventListener("keyup", (e)=>{
                if (this.game.keys.indexOf(e.key) > -1) this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            });
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
            context.fillStyle = "yellow";
            context.fillRect(this.x, this.y, this.width, this.height);
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
        }
        /**
     * Update the position of the player object
     */ update() {
            if (this.game.keys.includes(ARROW_UP)) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes(ARROW_DOWN)) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // handle the projectiles
            this.projectiles.forEach((projectile)=>projectile.update());
            // clear projectiles that have been marked for deletion from the projectiles store
            this.projectiles = this.projectiles.filter((projectile)=>!projectile.markedForDeletion);
        }
        /**
     * Player attack mode for shooting projectiles from the top
     */ shootTop() {
            if (this.game.ammo > 0) {
                // register the projectile in the projectiles queue
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                this.game.ammo--; // reduce the player's ammo
            }
        }
        /**
     * Draw the player on the canvas 2D context
     * @param context
     */ draw(context) {
            context.fillStyle = "black";
            context.fillRect(this.x, this.y, this.width, this.height);
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
        }
        /**
     * Update the enemy's x-position
     */ update() {
            this.x += this.speedX;
            // check if the enemy has moved completely off the game screen
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context) {}
    }
    class Angler1 extends Enemy {
        constructor(game){
            super(game); // ensure that the constructor on the parent gets executed
            this.width = 228 * 0.3;
            this.height = 169 * 0.3;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.score = 2;
        }
        /**
     * Draw the enemy object on the game canvas
     * @param context
     */ draw(context) {
            context.fillStyle = "red";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = "black";
            context.font = "20px Helvetica";
            context.fillText(`${this.lives}`, this.x, this.y);
        }
    }
    class Layer {
    }
    class Background {
    }
    // for drawing/showing messages and statuses on the game
    class UI {
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = "Helvetica";
            this.color = "white";
        }
        draw(context) {
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = "black";
            context.font = `${this.fontSize}px ${this.fontFamily}`;
            // display player ammo level
            context.fillStyle = this.color;
            for(let i = 0; i < this.game.ammo; i++)context.fillRect(20 + 5 * i, 50, 3, 20);
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
                if (this.game.score > WINNING_SCORE) {
                    message1 = "You Win!";
                    message2 = "Well done.";
                } else {
                    message1 = "You Lose!";
                    message2 = "Try again next time.";
                }
                // display the first message
                context.font = `50px ${this.fontFamily}`;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
                // display the second message
                context.font = `25px ${this.fontFamily}`;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
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
        }
        /**
     * Update the general game state
     * @param deltaTime // time counter from the animation loop
     */ update(deltaTime) {
            // update the game timer
            if (!this.gameOver) this.gameTimer += deltaTime;
            if (this.gameTimer > this.gameTimerLimit) this.gameOver = true;
            this.player.update();
            // handling ammo refresh periodically
            if (this.ammoTimer < this.ammoInterval) this.ammoTimer += deltaTime;
            else {
                if (this.ammo < this.maxAmmo) this.ammo += PROJECTILE_AMMO_REFRESH_COUNT;
                this.ammoTimer = 0; //reset the ammo timer
            }
            // handling enemies
            this.enemies.forEach((enemy)=>{
                enemy.update();
                // check for collision between the enemy and player
                if (this.checkCollision(enemy, this.player)) enemy.markedForDeletion = true;
                // check collision between projectile and enemy
                this.player.projectiles.forEach((projectile)=>{
                    if (this.checkCollision(projectile, enemy)) {
                        // flag the projectile for deletion
                        projectile.markedForDeletion = true;
                        enemy.lives--;
                        if (enemy.lives <= 0) {
                            // flag the enemy for deletion
                            enemy.markedForDeletion = true;
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
        }
        /**
     * Render the player on the canvas
     */ draw(context) {
            this.player.draw(context);
            // update the UI
            this.UI.draw(context);
            this.enemies.forEach((enemy)=>{
                enemy.draw(context);
            });
        }
        /**
     * Add a new enemy to the enemy store
     */ addEnemy() {
            this.enemies.push(new Angler1(this));
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

},{"./styles/main.scss":"bo7w8"}],"bo7w8":[function() {},{}]},["6Ictx","h7u1C"], "h7u1C", "parcelRequire479d")

//# sourceMappingURL=index.b71e74eb.js.map
