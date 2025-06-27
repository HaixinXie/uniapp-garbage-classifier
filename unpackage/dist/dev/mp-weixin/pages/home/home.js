"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carouselList: [
        { imageUrl: "/static/home/Carousel/image-1.jpg" },
        { imageUrl: "/static/home/Carousel/image-2.jpg" },
        { imageUrl: "/static/home/Carousel/image-3.jpg" }
      ],
      imageLoadStates: [false, false, false],
      // 每张图片的加载状态
      searchValue: "",
      searchResult: "",
      // 内置动态数据
      gridData: [
        {
          id: 1,
          title: "环保知识学习",
          image: "/static/home/grid-container/study.svg",
          url: "/pages/category/detail?id=1"
        },
        {
          id: 2,
          title: "竞答得积分",
          image: "/static/home/grid-container/question.svg",
          url: "/pages/category/detail?id=2"
        },
        {
          id: 3,
          title: "投放指南",
          image: "/static/home/grid-container/guide.svg",
          url: "/pages/category/detail?id=3"
        },
        {
          id: 4,
          title: "全部分类",
          image: "/static/home/grid-container/cate.svg",
          url: "/pages/category/detail?id=4"
        }
      ]
    };
  },
  methods: {
    handleImageLoaded(index) {
      this.$set(this.imageLoadStates, index, true);
    },
    // 跳转到详情页
    goToDetail(url) {
      if (url) {
        common_vendor.index.navigateTo({
          url
        });
      } else {
        common_vendor.index.showToast({
          title: "暂无跳转链接",
          icon: "none"
        });
      }
    },
    // 输入事件处理
    handleInput(value) {
      this.searchValue = value;
      common_vendor.index.__f__("log", "at pages/home/home.vue:138", "输入内容:", value);
      if (value.trim()) {
        this.realTimeSearch(value);
      }
    },
    // 确认搜索事件处理
    handleConfirm(value) {
      if (!value.trim()) {
        common_vendor.index.showToast({
          title: "请输入要查询的垃圾",
          icon: "none"
        });
        return;
      }
      this.searchValue = value;
      this.queryGarbageType(value);
    },
    // 聚焦事件处理
    handleFocus(e) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:162", "搜索框聚焦");
    },
    // 失焦事件处理
    handleBlur(e) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:168", "搜索框失焦");
    },
    // 清除搜索内容事件处理
    handleClear() {
      common_vendor.index.__f__("log", "at pages/home/home.vue:173", "清除搜索内容");
      this.searchValue = "";
      this.searchResult = "";
    },
    // 左侧图标点击事件处理
    handleIconClick() {
      common_vendor.index.__f__("log", "at pages/home/home.vue:180", "左侧图标点击");
      if (this.searchValue.trim()) {
        this.queryGarbageType(this.searchValue);
      } else {
        common_vendor.index.showToast({
          title: "请输入要查询的垃圾",
          icon: "none"
        });
      }
    },
    // 右侧图标点击事件处理
    handleRightIconClick(index) {
      const iconTypes = ["语音识别", "拍照识别"];
      common_vendor.index.__f__("log", "at pages/home/home.vue:195", `点击右侧图标: ${iconTypes[index]}`);
      if (index === 0) {
        this.startVoiceRecognition();
      } else if (index === 1) {
        this.startCameraRecognition();
      }
    },
    // 实时搜索功能
    realTimeSearch(keyword) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:211", "实时搜索建议:", keyword);
    },
    // 查询垃圾类型
    queryGarbageType(keyword) {
      common_vendor.index.showLoading({
        title: "查询中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        const garbageTypes = {
          "苹果": "厨余垃圾",
          "纸张": "可回收物",
          "电池": "有害垃圾",
          "塑料袋": "其他垃圾"
          // 可以添加更多垃圾类型...
        };
        this.searchResult = garbageTypes[keyword] || "未找到该垃圾的分类信息";
      }, 800);
    },
    // 语音识别功能
    startVoiceRecognition() {
      common_vendor.index.showToast({
        title: "语音识别功能",
        icon: "none"
      });
    },
    // 拍照识别功能
    startCameraRecognition() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera"],
        success: (res) => {
          common_vendor.index.showToast({
            title: "正在识别图片...",
            icon: "none"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_mysearch2 = common_vendor.resolveComponent("uni-mysearch");
  _easycom_uni_mysearch2();
}
const _easycom_uni_mysearch = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-mysearch/uni-mysearch.js";
if (!Math) {
  _easycom_uni_mysearch();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.carouselList, (item, index, i0) => {
      return {
        a: item.imageUrl,
        b: common_vendor.o(($event) => $options.handleImageLoaded(index), index),
        c: $data.imageLoadStates[index] ? 1 : "",
        d: $data.imageLoadStates[index] ? 1 : "",
        e: index
      };
    }),
    b: common_vendor.o($options.handleInput),
    c: common_vendor.o($options.handleConfirm),
    d: common_vendor.o($options.handleFocus),
    e: common_vendor.o($options.handleBlur),
    f: common_vendor.o($options.handleClear),
    g: common_vendor.o($options.handleIconClick),
    h: common_vendor.o($options.handleRightIconClick),
    i: common_vendor.p({
      placeholder: "请输入要查询的垃圾",
      iconColor: "#3370FF",
      rightIcons: [{
        type: "mic-filled"
      }, {
        type: "camera-filled"
      }]
    }),
    j: $data.searchResult
  }, $data.searchResult ? {
    k: common_vendor.t($data.searchValue),
    l: common_vendor.t($data.searchResult)
  } : {}, {
    m: common_vendor.f($data.gridData, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.goToDetail(item.url), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
