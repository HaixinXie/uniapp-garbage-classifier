"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/identify/identify.js";
  "./pages/cate/cate.js";
  "./pages/exam/exam.js";
  "./pages/my/my.js";
}
const _sfc_main = {
  globalData: {
    selected: 0
  },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:13", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
