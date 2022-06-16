// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var nav = document.querySelector('.nav');
var navToggle = document.querySelector('.btn--menu');
var bookmarkBtnExpanded = document.querySelector('.btn--bookmark--expanded');
var bookmarkBtn = document.querySelector('.btn--bookmark');
var modal = document.querySelector('.modal');
var btnBack = document.querySelector('.btn--back');
var modalClose = document.querySelector('.modal-close');
var submitBtns = document.querySelectorAll('.btn--submit');
var selectBtns = document.querySelectorAll('.btn--select');
var radios = document.querySelectorAll('input[type=radio]');
var submitSections = document.querySelectorAll('.modal__section--submit');
var forms = document.querySelectorAll('form');
var modalSections = document.querySelectorAll('.modal__section');
var totalBacked = document.querySelector('.totalBacked');
var totalBackers = document.querySelector('.totalBackers');
var inputs = document.querySelectorAll('#input');
var modalThanks = document.querySelector('.modal--thanks');
var gotItBtn = document.querySelector('.btn--gotit');
var progressBar = document.querySelector('.progressbar');
var stands = document.querySelectorAll('.stand');
var standsBamboo = document.querySelectorAll('.stand-bamboo');
var standsBlackEd = document.querySelectorAll('.stand-blackEd');
setLsItems();
moveProgressBar();
addStylesToModalSections();
incrementTotalBacked();
addStylesOnSelectBtns(); //navbar functionality//

navToggle.addEventListener('click', function () {
  var attribute = nav.getAttribute('data-visible');

  if (attribute === 'false') {
    navToggle.setAttribute('aria-expanded', true);
    nav.setAttribute('data-visible', true);
    navToggle.firstChild.src = "/icon-close-menu.36610790.svg";
    overlay = document.createElement('span');
    document.body.appendChild(overlay);
    overlay.classList.add('dim');
  } else if (attribute === 'true') {
    navToggle.setAttribute('aria-expanded', false);
    nav.setAttribute('data-visible', false);
    navToggle.firstChild.src = "/icon-hamburger.4d46a600.svg";
    document.body.prepend(overlay);
    document.body.removeChild(document.querySelector('.dim'));
  }
}); //navbar functionality//
//bookmark functionality//

bookmarkBtnExpanded.addEventListener('click', function () {
  var attribute = bookmarkBtnExpanded.getAttribute('aria-checked');

  if (attribute === 'false') {
    bookmarkBtnExpanded.setAttribute('aria-checked', true);
    bookmarkBtnExpanded.innerText = 'Bookmarked';
    bookmarkBtn.setAttribute('aria-checked', true);
    bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png';
    document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
    localStorage.setItem('bookmarked', 'true');
  } else if (attribute === 'true') {
    bookmarkBtnExpanded.setAttribute('aria-checked', false);
    bookmarkBtnExpanded.innerText = 'Bookmark';
    bookmarkBtn.setAttribute('aria-checked', false);
    bookmarkBtn.firstChild.src = '/icon-bookmark.65361ce2.svg';
    document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmark.65361ce2.svg' + ')');
    localStorage.setItem('bookmarked', 'false');
  }
});
bookmarkBtn.addEventListener('click', function () {
  var attribute = bookmarkBtn.getAttribute('aria-checked');

  if (attribute === 'false') {
    bookmarkBtn.setAttribute('aria-checked', true);
    bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png';
    document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
    localStorage.setItem('bookmarked', 'true');
    bookmarkBtnExpanded.setAttribute('aria-checked', true);
    bookmarkBtnExpanded.innerText = 'Bookmarked';
  } else if (attribute === 'true') {
    bookmarkBtn.setAttribute('aria-checked', false);
    bookmarkBtnExpanded.setAttribute('aria-checked', false);
    bookmarkBtnExpanded.innerText = 'Bookmark';
    bookmarkBtn.firstChild.src = '/icon-bookmark.65361ce2.svg';
    document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmark.65361ce2.svg' + ')');
    localStorage.setItem('bookmarked', 'false');
  }
}); //bookmark functionality//
//show/hide modals//

btnBack.addEventListener('click', function () {
  return modal.showModal();
});
modalClose.addEventListener('click', function () {
  return modal.close();
});
gotItBtn.addEventListener('click', function () {
  return modalThanks.close();
}); //show/hide modals//
//append total backers in form submit//

submitBtns[0].addEventListener('click', function () {
  modal.close();
  modalThanks.showModal();
  incrementTotalBackers();
}); //append total backers in form submit//

var _loop = function _loop(i, j) {
  submitBtns[j].addEventListener('click', function () {
    if (inputs[i].value > 0 && inputs[i].value <= 100000) {
      modal.close();
      modalThanks.showModal();
      incrementTotalBackers();
      decrementStandsQty(stands[i]);
      localStorage.setItem("stands".concat([i]), stands[i].innerText);
    }
  });
};

for (var i = 0, j = 1; i < inputs.length, j < submitBtns.length; i++, j++) {
  _loop(i, j);
} //add styles when clicking "Select Reward" button//


function addStylesOnSelectBtns() {
  var _loop2 = function _loop2(_i, _j) {
    selectBtns[_i].addEventListener('click', function () {
      modal.showModal();
      removeSectionStyles();
      radios[_j].checked = true;

      submitSections[_j].setAttribute('data-visible', true);

      modalSections[_j].classList.add('active');
    });
  };

  for (var _i = 0, _j = 1; _i < selectBtns.length, _j < radios.length - 1; _i++, _j++) {
    _loop2(_i, _j);
  }
} //add styles when clicking "Select Reward" button//
//add styles when clicking radio buttons//


function addStylesToModalSections() {
  var _loop3 = function _loop3(_i2, _j2) {
    radios[_i2].checked = false;

    radios[_i2].addEventListener('change', function () {
      removeSectionStyles();

      if (radios[_i2].checked === true) {
        submitSections[_j2].setAttribute('data-visible', true);

        modalSections[_j2].classList.add('active');
      }
    });
  };

  for (var _i2 = 0, _j2 = 0; _i2 < radios.length, _j2 < submitSections.length; _i2++, _j2++) {
    _loop3(_i2, _j2);
  }
} //add styles when clicking radio buttons//


function incrementTotalBacked() {
  var _loop4 = function _loop4(_i3, _j3) {
    forms[_i3].addEventListener('submit', function (e) {
      e.preventDefault();
      var totalBackedNum = +totalBacked.innerText;
      var resultNum = totalBackedNum += +inputs[_j3].value;
      totalBacked.innerText = "".concat(resultNum);
      moveProgressBar();
      localStorage.setItem('backed', resultNum);
    });
  };

  for (var _i3 = 1, _j3 = 0; _i3 < forms.length, _j3 < inputs.length; _i3++, _j3++) {
    _loop4(_i3, _j3);
  }
}

function setLsItems() {
  var backers = localStorage.getItem('backers');
  var backed = localStorage.getItem('backed');
  var bookmarked = localStorage.getItem('bookmarked');
  var stands0 = localStorage.getItem('stands0');
  var stands1 = localStorage.getItem('stands1');

  if (backers) {
    totalBackers.innerText = "".concat(backers);
  }

  if (backed) {
    totalBacked.innerText = "".concat(backed);
  }

  if (bookmarked && bookmarked === 'true') {
    bookmarkBtn.firstChild.src = '/icon-bookmarked.f1924f78.png';
    document.documentElement.style.setProperty('--url', 'url(' + '/icon-bookmarked.f1924f78.png' + ')');
    bookmarkBtnExpanded.innerText = 'Bookmarked';
  }

  if (stands0) {
    standsBamboo.forEach(function (standBamboo) {
      standBamboo.innerText = "".concat(stands0);
    });
  }

  if (stands1) {
    standsBlackEd.forEach(function (standBlackEd) {
      standBlackEd.innerText = "".concat(stands1);
    });
  }
}

var incrementTotalBackers = function incrementTotalBackers() {
  var totalBackersNum = +totalBackers.innerText;
  totalBackersNum++;
  totalBackers.innerText = "".concat(totalBackersNum);
  localStorage.setItem('backers', totalBackersNum);
};

var decrementStandsQty = function decrementStandsQty(stands) {
  var standsNum = +stands.innerText;
  standsNum--;
  stands.innerText = "".concat(standsNum);
};

function removeSectionStyles() {
  submitSections.forEach(function (section) {
    section.setAttribute('data-visible', false);
  });
  modalSections.forEach(function (section) {
    section.classList.remove('active');
  });
}

function moveProgressBar() {
  var totalBackedNum = +totalBacked.innerText;
  setTimeout(function () {
    progressBar.style.width = "".concat(totalBackedNum / 1000, "%");
  }, 1200);
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51561" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map