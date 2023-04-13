(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__D84D732",
    appName: "zw_shop",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.7.3",
    uniRuntimeVersion: "3.7.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__D84D732",
      appName: "zw_shop",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"zw_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
var eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"zw_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"zw_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"zw_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"zw_shop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!************************************!*\
  !*** F:/黑马/小程序/zw_shop/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/*!***************************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/commodity1.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/*!*********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/hot1.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCALQAtADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEooooAM0UlLQAUUUUAFFFFAC0UlLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAlFLRQAlFLRQAlFLSUAFFFFABRRRigAooxRigAooooAKKKKAEpaKKACiiigBKKKWgBKWigUAFJk5xS0UAFLSUUAFLSUUAFLSUUALRSUUALRSUUALRSUZoAWikzRmgAopKWgBaKSloAKKKSgBaKSigBaKSigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbS0lLQAUUUUAFFFFAC0lFFABRRRQAUUUtACUUUtACUUtJQAUUUlABRRRQAUUUUAANLmkxSUAOBoptFACmgHikooAcKKaDTs0AFFFFAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADRS0gooAWikJCgk9BQjBhkdKAFooooAKKKKACiiloAKKKKACiiigApKWigBKKWkoASloooASiiigAzRRigcUAGKMUtGKAG0U7FJigBKUUYo6UALRiiloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBtLSYpaAEIBGDQAFGAMClooAKWkpaACiiigAooooAKKKKACiiigAooooAKKKKACkpaKAEpaKKACkpaKACiiigApKWigBKKWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBKKKKACloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEpaKKACiiigApKWigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBKWkooAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKSgBaKKKACiikoAWikozQAtFJmigBaKSigBaKSloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKSjNAC0UlGaAFopM0maAFozSZooAXNJmkpaADNGaSigBQaXNNzSUAPzSZptAoAdmjNJRigBc0A0gooAXNFJS0AGaKKKAClpKWgAooooAKKKKAClpKWgBKWkooAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACisbVfF/h7RJPK1HV7aGTvHu3OPqq5IrK/4Wn4L/AOg0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UE92uIv6NX0LRTuB4zofwi1loryLVZLa3SWAiIq+9hICCp46Drnmn2/wR1Bj/pOtW0Q/6ZxM/wDPbXsdFIDzS1+Celpj7Xq95N/1yRY/5hq7DTvCOjadoD6GluZ7KRizpO24seOf0HT0rbooAzrLw/ounYNlpVnAR/EkChvzxmtClooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="

/***/ }),
/* 106 */
/*!*********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/hot2.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/hot2.jpg";

/***/ }),
/* 107 */
/*!*********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/hot3.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/hot3.jpg";

/***/ }),
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/*!**********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/shop1.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 114 */
/*!**********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/shop2.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 115 */
/*!**********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/shop3.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 116 */
/*!**********************************************!*\
  !*** F:/黑马/小程序/zw_shop/static/img/shop4.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map