// mock/classify.js
export default {
  // 模拟获取分类列表的API
  getClassifyList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            code: 200,
            message: "获取成功",
            data: {
              classify: [
                {
                  id: 1,
                  classifyName: "可回收垃圾",
                  icon: "recyclable",
                  children: [
                    {
                      id: 101,
                      text: "废纸",
                      picUrl: "https://picsum.photos/seed/paper/200/200"
                    },
                    {
                      id: 102,
                      text: "塑料瓶",
                      picUrl: "https://picsum.photos/seed/bottle/200/200"
                    },
                    {
                      id: 103,
                      text: "易拉罐",
                      picUrl: "https://picsum.photos/seed/can/200/200"
                    },
                    {
                      id: 104,
                      text: "玻璃瓶",
                      picUrl: "https://picsum.photos/seed/glass/200/200"
                    },
                    {
                      id: 105,
                      text: "旧衣物",
                      picUrl: "https://picsum.photos/seed/clothes/200/200"
                    },
                    {
                      id: 102,
                      text: "塑料瓶",
                      picUrl: "https://picsum.photos/seed/bottle/200/200"
                    },
                    {
                      id: 103,
                      text: "易拉罐",
                      picUrl: "https://picsum.photos/seed/can/200/200"
                    },
                    {
                      id: 104,
                      text: "玻璃瓶",
                      picUrl: "https://picsum.photos/seed/glass/200/200"
                    },
                    {
                      id: 105,
                      text: "旧衣物",
                      picUrl: "https://picsum.photos/seed/clothes/200/200"
                    },
                    {
                      id: 102,
                      text: "塑料瓶",
                      picUrl: "https://picsum.photos/seed/bottle/200/200"
                    },
                    {
                      id: 103,
                      text: "易拉罐",
                      picUrl: "https://picsum.photos/seed/can/200/200"
                    },
                    {
                      id: 104,
                      text: "玻璃瓶",
                      picUrl: "https://picsum.photos/seed/glass/200/200"
                    },
                    {
                      id: 105,
                      text: "旧衣物",
                      picUrl: "https://picsum.photos/seed/clothes/200/200"
                    }
                  ]
                },
                {
                  id: 2,
                  classifyName: "有害垃圾",
                  icon: "hazardous",
                  children: [
                    {
                      id: 201,
                      text: "充电电池",
                      picUrl: "https://picsum.photos/seed/battery/200/200"
                    },
                    {
                      id: 202,
                      text: "荧光灯",
                      picUrl: "https://picsum.photos/seed/light/200/200"
                    },
                    {
                      id: 203,
                      text: "过期药品",
                      picUrl: "https://picsum.photos/seed/medicine/200/200"
                    },
                    {
                      id: 204,
                      text: "油漆桶",
                      picUrl: "https://picsum.photos/seed/paint/200/200"
                    },
                    {
                      id: 205,
                      text: "化妆品",
                      picUrl: "https://picsum.photos/seed/cosmetic/200/200"
                    }
                  ]
                },
                {
                  id: 3,
                  classifyName: "厨余垃圾",
                  icon: "kitchen",
                  children: [
                    {
                      id: 301,
                      text: "剩菜剩饭",
                      picUrl: "https://picsum.photos/seed/food1/200/200"
                    },
                    {
                      id: 302,
                      text: "果皮",
                      picUrl: "https://picsum.photos/seed/fruit/200/200"
                    },
                    {
                      id: 303,
                      text: "蔬菜",
                      picUrl: "https://picsum.photos/seed/vegetable/200/200"
                    },
                    {
                      id: 304,
                      text: "鱼骨",
                      picUrl: "https://picsum.photos/seed/fish/200/200"
                    },
                    {
                      id: 305,
                      text: "茶叶渣",
                      picUrl: "https://picsum.photos/seed/tea/200/200"
                    }
                  ]
                },
                {
                  id: 4,
                  classifyName: "其他垃圾",
                  icon: "other",
                  children: [
                    {
                      id: 401,
                      text: "卫生纸",
                      picUrl: "https://picsum.photos/seed/toiletpaper/200/200"
                    },
                    {
                      id: 402,
                      text: "纸尿裤",
                      picUrl: "https://picsum.photos/seed/diaper/200/200"
                    },
                    {
                      id: 403,
                      text: "烟头",
                      picUrl: "https://picsum.photos/seed/cigarette/200/200"
                    },
                    {
                      id: 404,
                      text: "尘土",
                      picUrl: "https://picsum.photos/seed/dust/200/200"
                    },
                    {
                      id: 405,
                      text: "花盆",
                      picUrl: "https://picsum.photos/seed/flowerpot/200/200"
                    }
                  ]
                }
              ]
            }
          }
        });
      }, 500);
    });
  }
};