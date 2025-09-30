const app = getApp()
Component({
	data: {
		selected: 0,
		color: "#707070",
		selectedColor: "#3370FF",
		backgroundColor: "#F7F8F8",
		list: [{
				pagePath: "/pages/home/home",
				iconPath: "/static/tab-icons/home.png",
				selectedIconPath: "/static/tab-icons/home-active.png",
				text: "首页"
			}, {
				pagePath: "/pages/cate/cate",
				iconPath: "/static/tab-icons/cate.png",
				selectedIconPath: "/static/tab-icons/cate-active.png",
				text: "分类"
			},
			{
				pagePath: "/pages/identify/identify",
				iconPath: "/static/tab-icons/identify.png",
				selectedIconPath: "/static/tab-icons/identify.png",
				text: "",
				bulge: true,
			}, {
				pagePath: "/pages/exam/exam",
				iconPath: "/static/tab-icons/exam.png",
				selectedIconPath: "/static/tab-icons/exam-active.png",
				text: "考试"
			},
			{
				pagePath: "/pages/my/my",
				iconPath: "/static/tab-icons/my.png",
				selectedIconPath: "/static/tab-icons/my-active.png",
				text: "我的"
			}
		]
	},

	ready: function() {
		this.setData({
			selected: app.globalData.selected
		})
	},

	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const index = data.index
			// 判断是否点击中间图标（索引为2）
		    if (index === 2) {
			// 执行自定义函数
			  this.handleMiddleButtonClick()
			  return
		    }
			// 非中间图标，正常切换页面
			const url = data.path
			app.globalData.selected = data.index;
			wx.switchTab({
				url
			})
		},
		// 自定义函数：处理中间按钮点击事件
		handleMiddleButtonClick() {
		  console.log('点击了中间按钮');
		  // 在这里添加你想要执行的代码
		  // 调用拍照/选择图片
		  wx.chooseImage({
		    count: 1, // 文件个数
		    success: (res) => {
		      const tempFilePath = res.tempFilePaths[0];
		      wx.navigateTo({
		      			url: `/subpkg/identify/identify?type=${1}&tempFilePath=${tempFilePath}`
		      });
		    },
			fail: (err) => {
				console.error('选择图片失败：', err);
				wx.showToast({
				  title: '选择图片失败',
				  icon: 'none'
				});
			  }
		  })
		}
	}
})