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
      imageLoadStates: [false, false, false]
      // 每张图片的加载状态
    };
  },
  methods: {
    handleImageLoaded(index) {
      this.$set(this.imageLoadStates, index, true);
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
  return {
    a: common_vendor.f($data.carouselList, (item, index, i0) => {
      return {
        a: item.imageUrl,
        b: common_vendor.o(($event) => $options.handleImageLoaded(index), index),
        c: $data.imageLoadStates[index] ? 1 : "",
        d: $data.imageLoadStates[index] ? 1 : "",
        e: index
      };
    }),
    b: common_vendor.p({
      placeholder: "请输入要查询的垃圾",
      iconColor: "#3370FF",
      rightIcons: [{
        type: "mic-filled"
      }, {
        type: "camera-filled"
      }]
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
