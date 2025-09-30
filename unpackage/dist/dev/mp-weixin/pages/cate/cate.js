"use strict";
const common_vendor = require("../../common/vendor.js");
const api_cate_cate = require("../../api/cate/cate.js");
const _sfc_main = {
  data() {
    return {
      cateList: [
        {
          classifyId: 1,
          classifyName: "可回收垃圾"
        },
        {
          classifyId: 2,
          classifyName: "有害垃圾"
        },
        {
          classifyId: 3,
          classifyName: "厨余垃圾"
        },
        {
          classifyId: 4,
          classifyName: "其他垃圾"
        }
      ],
      activeIndex: 0,
      goodList: [],
      page: 1,
      hasMore: true,
      activeColors: ["#2565AE", "#E53122", "#8EC060", "#94918E"],
      currentItem: null,
      keyword: ""
    };
  },
  methods: {
    async changeActive(i) {
      this.activeIndex = i;
      this.goodList = [];
      this.page = 1;
      this.hasMore = true;
      await this.loadGoodList();
    },
    async loadGoodList() {
      if (!this.hasMore)
        return;
      const category = this.activeIndex;
      const page = this.page;
      const getCateData = {
        category,
        page
      };
      common_vendor.index.showLoading({ title: "加载中..." });
      try {
        const res = await api_cate_cate.getCate(getCateData);
        this.goodList = [...this.goodList, ...res.data.items || []];
        this.hasMore = res.data.hasMore;
        this.page++;
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/cate/cate.vue:124", e);
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    goToSearch() {
      if (this.keyword.trim()) {
        common_vendor.index.navigateTo({
          url: `/subpkg/identify/identify?type=0&searchWord=${this.keyword}`
        });
      } else {
        common_vendor.index.showToast({
          title: "请输入搜索关键词",
          icon: "none"
        });
      }
    },
    // 根据分类生成对应图标类名
    itemIconClass(index) {
      const iconMap = {
        0: "recycle-icon",
        // 可回收
        1: "hazard-icon",
        // 有害
        2: "food-icon",
        // 厨余
        3: "other-icon"
        // 其他
      };
      return iconMap[this.activeIndex] || "";
    },
    showLajiTips(item) {
      this.currentItem = item;
      this.$refs.tipsPopup.open();
    },
    closeTips() {
      this.$refs.tipsPopup.close();
    }
  },
  onLoad() {
    this.loadGoodList();
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "26",
      color: "#9F9F9F"
    }),
    b: common_vendor.o((...args) => $options.goToSearch && $options.goToSearch(...args)),
    c: $data.keyword,
    d: common_vendor.o(($event) => $data.keyword = $event.detail.value),
    e: common_vendor.f($data.cateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.classifyName),
        b: common_vendor.n($data.activeIndex === index ? "active" : ""),
        c: common_vendor.s($data.activeIndex === index ? {
          "--active-color": $data.activeColors[index]
        } : {}),
        d: index,
        e: common_vendor.o(($event) => $options.changeActive(index), index)
      };
    }),
    f: common_vendor.f($data.goodList, (goodItem, goodIndex, i0) => {
      return {
        a: common_vendor.n($options.itemIconClass(goodIndex)),
        b: common_vendor.t(goodItem.name),
        c: goodIndex,
        d: common_vendor.o(($event) => $options.showLajiTips(goodItem), goodIndex)
      };
    }),
    g: !$data.hasMore
  }, !$data.hasMore ? {} : {}, {
    h: common_vendor.o((...args) => $options.loadGoodList && $options.loadGoodList(...args)),
    i: common_vendor.t((_a = $data.currentItem) == null ? void 0 : _a.name),
    j: common_vendor.o((...args) => $options.closeTips && $options.closeTips(...args)),
    k: common_vendor.t(((_b = $data.currentItem) == null ? void 0 : _b.lajitip) || "暂无提示信息"),
    l: common_vendor.sr("tipsPopup", "ded2cdc8-1"),
    m: common_vendor.p({
      type: "center",
      ["background-color"]: "#fff"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cate/cate.js.map
