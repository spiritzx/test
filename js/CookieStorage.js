(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
    factory(global, true) :
    function (global) {
      if (!global.document) {
        throw new Error("cookieStorage requires a window with a document");
      }
      return factory(global);
    };
  } else {
    factory(global);
  }
  factory(window, true)
})(typeof window !== "undefined" ? window : this, function (window, noGlobal ) {
  var document = window.document;
  function CookieStorage() {
    // 初始化cookie的容器
    this.cookie = (function () {
      var cookie = {};
      var all = document.cookie;
      if (all === '') return cookie;
      var list = all.split('; ');//分离每一条cookie信息
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var icon = item.indexOf('=');
        var name = item.substring(0, icon);
        var value = item.substring(icon + 1);
        cookie[name] = value;
      };
      return cookie
    })()
  }
  CookieStorage.prototype = {
    constructor: CookieStorage,
    // 设置cookie
    /**
     * key:存储名，
     * value: 存储值
     * time: 过期时间，单位时间是秒
     * path:表示这个cookie影响到的路径，浏览器跟会根据这项配置，像指定域中匹配的路径发送cookie
     */
    setCookie: function (key, value, time, path) {
      if (!key) return;
      this.cookie[key] = value;
      var cookieValue = key + '=' + value;
      if (time) cookieValue += '; max-age=' + time;
      if (path) cookieValue += '; path=' + path;
      document.cookie = cookieValue;
    },
    // 获取特定cookie
    getCookie: function (key) {
      return this.cookie[key] || null;
    },
    // 获取所有cookie
    getAllCookie: function () {
      return this.cookie;
    },
    // 删除特定cookie
    deleteCookie: function (key) {
      if (!(key in this.cookie)) return;
      delete this.cookie[key];
      document.cookie = key + '=;max-age=0';//把cookie中的key值设为空；有效期设为0；删除cookie中的值
    },
    // 删除所有cookie
    clear: function () {
      for (var name in this.cookie) {
        document.cookie = name + '=;max-age=0';
      }
      this.cookie = {};
    },
    // 获取cookie值的长度
    size: function () {
      var name = "";
      var arr = [];
      var _cookie = this.cookie;
      for (name in _cookie) {
        arr.push(name)
      }
      return arr.length;
    }
  }
  var cookieStorage = new CookieStorage()
  if (noGlobal) {
    window.cookieStorage = cookieStorage;
  }
  return cookieStorage;
})