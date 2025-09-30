"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
const api_login_login = require("./api/login/login.js");
const stores_userinfo_userinfo = require("./stores/userinfo/userinfo.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/identify/identify.js";
  "./pages/cate/cate.js";
  "./pages/exam/exam.js";
  "./pages/my/my.js";
  "./subpkg/exam/exam.js";
  "./subpkg/leaderboard/leaderboard.js";
  "./subpkg/result/result.js";
  "./subpkg/chooseAvatarAndNickname/chooseAvatarAndNickname.js";
  "./subpkg/identify/identify.js";
  "./subpkg/study/study.js";
  "./subpkg/guide/guide.js";
  "./subpkg/points/points.js";
  "./subpkg/recognitionRecord/recognitionRecord.js";
  "./subpkg/examRecords/examRecords.js";
  "./subpkg/bindSchoolClass/bindSchoolClass.js";
  "./subpkg/ecoLearn/ecoLearn.js";
  "./subpkg/recycleGuide/recycleGuide.js";
  "./subpkg/kitchenWasteTips/kitchenWasteTips.js";
}
const _sfc_main = {
  globalData: {
    selected: 0
  },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:11", "App Launch");
    const userStore = stores_userinfo_userinfo.useUserStore();
    if (!userStore.hasProfile()) {
      this.handleLogin();
    }
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:18", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:21", "App Hide");
  },
  // 新增：自定义方法
  methods: {
    // 处理登录逻辑
    handleLogin() {
      common_vendor.index.login({
        success: (res) => {
          if (res.errMsg === "login:ok") {
            const code = res.code;
            const loginData = {
              code
              // 替换为实际的授权码
            };
            this.requestUserInfo(loginData);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at App.vue:39", "登录失败:", err);
        }
      });
    },
    // 使用 code 请求用户信息
    async requestUserInfo(loginData) {
      try {
        const res = await api_login_login.login(loginData);
        const { token, nickname, avatar } = res.data;
        const userStore = stores_userinfo_userinfo.useUserStore();
        userStore.setToken(token);
        const partialUser = {
          nickname,
          avatar
        };
        userStore.setProfile(partialUser);
      } catch (error) {
        common_vendor.index.__f__("error", "at App.vue:64", "获取用户信息失败:", error);
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(stores_index.pinia);
  return {
    app,
    pinia: stores_index.pinia
    // 可选：返回 pinia 实例供其他地方使用
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
