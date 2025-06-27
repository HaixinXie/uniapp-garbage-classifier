const app = getApp()
Component({
	data: {
		selected: 0,
		color: "#707070",
		selectedColor: "#0da407",
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
			const url = data.path
			app.globalData.selected = data.index;
			wx.switchTab({
				url
			})
		},
	}
})