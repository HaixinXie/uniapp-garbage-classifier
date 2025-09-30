"use strict";
const common_vendor = require("../../common/vendor.js");
const app = getApp();
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
          url: "/subpkg/ecoLearn/ecoLearn"
        },
        {
          id: 2,
          title: "考试得积分",
          image: "/static/home/grid-container/question.svg",
          url: "/pages/exam/exam"
        },
        {
          id: 3,
          title: "投放指南",
          image: "/static/home/grid-container/guide.svg",
          url: "/subpkg/guide/guide"
        },
        {
          id: 4,
          title: "全部分类",
          image: "/static/home/grid-container/cate.svg",
          url: "/pages/cate/cate"
        }
      ],
      hotKnowledge: [
        {
          id: 1,
          title: "如何正确投放可回收物",
          desc: "纸张、塑料、金属等可回收物应分类投放，保持干净整洁。",
          image: "/static/home/hotKnowledge/hotKnowledge01.jpg",
          url: "/subpkg/recycleGuide/recycleGuide"
        },
        {
          id: 2,
          title: "厨余垃圾处理小技巧",
          desc: "厨余垃圾应去除包装袋，尽量沥干水分投放。",
          image: "/static/home/hotKnowledge/hotKnowledge02.jpg",
          url: "/subpkg/kitchenWasteTips/kitchenWasteTips"
        }
      ]
    };
  },
  methods: {
    handleImageLoaded(index) {
      this.$set(this.imageLoadStates, index, true);
    },
    // 跳转到详情页
    goToDetail(url, index) {
      if (url) {
        if (index == 1) {
          app.globalData.selected = 3;
          common_vendor.index.switchTab({
            url
          });
        } else if (index == 3) {
          app.globalData.selected = 1;
          common_vendor.index.switchTab({
            url
          });
        } else {
          common_vendor.index.navigateTo({
            url
          });
        }
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
      common_vendor.index.__f__("log", "at pages/home/home.vue:187", "输入内容:", value);
      if (value.trim()) {
        this.realTimeSearch(value);
      }
    },
    // 确认搜索事件处理
    handleConfirm(value) {
      const keyword = value.trim();
      if (!keyword) {
        common_vendor.index.showToast({
          title: "请输入要查询的垃圾",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/subpkg/identify/identify?type=0&searchWord=${keyword}`
      });
    },
    // 聚焦事件处理
    handleFocus(e) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:214", "搜索框聚焦");
    },
    // 失焦事件处理
    handleBlur(e) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:220", "搜索框失焦");
    },
    // 清除搜索内容事件处理
    handleClear() {
      common_vendor.index.__f__("log", "at pages/home/home.vue:225", "清除搜索内容");
      this.searchValue = "";
      this.searchResult = "";
    },
    // 左侧图标点击事件处理
    handleIconClick() {
      const keyword = this.searchValue.trim();
      if (!keyword) {
        common_vendor.index.showToast({
          title: "请输入要查询的垃圾",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/subpkg/identify/identify?type=0&searchWord=${keyword}`
      });
    },
    // 右侧图标点击事件处理
    handleRightIconClick(index) {
      this.startCameraRecognition();
    },
    // 实时搜索功能
    realTimeSearch(keyword) {
      common_vendor.index.__f__("log", "at pages/home/home.vue:256", "实时搜索建议:", keyword);
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
    // 拍照识别功能
    startCameraRecognition() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          common_vendor.index.navigateTo({
            url: `/subpkg/identify/identify?type=1&tempFilePath=${tempFilePath}`
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/home/home.vue:294", "选择图片失败：", err);
          common_vendor.index.showToast({
            title: "选择图片失败",
            icon: "none"
          });
        }
      });
    },
    goToKnowledge(item) {
      common_vendor.index.navigateTo({
        url: item.url
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
        d: common_vendor.o(($event) => $options.goToDetail(item.url, index), index)
      };
    }),
    n: common_vendor.f($data.hotKnowledge, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.desc),
        d: index,
        e: common_vendor.o(($event) => $options.goToKnowledge(item), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
