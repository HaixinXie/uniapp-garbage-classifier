"use strict";
require("../../stores/index.js");
const common_vendor = require("../../common/vendor.js");
const stores_userinfo_userinfo = require("../../stores/userinfo/userinfo.js");
const _sfc_main = {
  data() {
    return {
      isLogin: true
    };
  },
  created() {
    const userStore = stores_userinfo_userinfo.useUserStore();
    this.isLogin = userStore.hasToken();
  }
};
if (!Array) {
  const _easycom_MyUserinfo2 = common_vendor.resolveComponent("MyUserinfo");
  const _easycom_MyLogin2 = common_vendor.resolveComponent("MyLogin");
  (_easycom_MyUserinfo2 + _easycom_MyLogin2)();
}
const _easycom_MyUserinfo = () => "../../components/MyUserinfo/MyUserinfo.js";
const _easycom_MyLogin = () => "../../components/MyLogin/MyLogin.js";
if (!Math) {
  (_easycom_MyUserinfo + _easycom_MyLogin)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin
  }, $data.isLogin ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
