<template>
  <view class="custom-tab-bar">
    <!-- 底部导航背景 -->
    <view class="tab-bar-bg"></view>
    
    <!-- 左侧四个常规标签 -->
    <view class="tab-item" :class="{'active': currentTab === 0}" @click="switchTab(0)">
      <image class="tab-icon" :src="currentTab === 0 ? tabIcons[0].active : tabIcons[0].normal"></image>
      <text class="tab-text">{{ tabIcons[0].text }}</text>
    </view>
    
    <view class="tab-item" :class="{'active': currentTab === 1}" @click="switchTab(1)">
      <image class="tab-icon" :src="currentTab === 1 ? tabIcons[1].active : tabIcons[1].normal"></image>
      <text class="tab-text">{{ tabIcons[1].text }}</text>
    </view>
    
    <!-- 中间大图标 -->
    <view class="middle-button" @click="switchTab(2)">
      <image class="middle-icon" :src="tabIcons[2].normal"></image>
    </view>
    
    <view class="tab-item" :class="{'active': currentTab === 3}" @click="switchTab(3)">
      <image class="tab-icon" :src="currentTab === 3 ? tabIcons[3].active : tabIcons[3].normal"></image>
      <text class="tab-text">{{ tabIcons[3].text }}</text>
    </view>
    
    <view class="tab-item" :class="{'active': currentTab === 4}" @click="switchTab(4)">
      <image class="tab-icon" :src="currentTab === 4 ? tabIcons[4].active : tabIcons[4].normal"></image>
      <text class="tab-text">{{ tabIcons[4].text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabIcons: [
        { text: '首页', normal: '/static/tab-icons/home.png', active: '/static/tab-icons/home-active.png' },
        { text: '分类', normal: '/static/tab-icons/cate.png', active: '/static/tab-icons/cate-active.png' },
        { text: '', normal: '/static/tab-icons/identify.png', active: '/static/tab-icons/identify.png' },
        { text: '考试', normal: '/static/tab-icons/exam.png', active: '/static/tab-icons/exam-active.png' },
        { text: '我的', normal: '/static/tab-icons/my.png', active: '/static/tab-icons/my-active.png' }
      ]
    }
  },
  mounted() {
    // 获取当前页面路径，设置初始选中状态
    this.setCurrentTab()
  },
  methods: {
    switchTab(index) {
      // 中间按钮（拍照）特殊处理
      if (index === 2) {
        uni.navigateTo({ url: '/pages/identify/identify' })
        return
      }
      
      // 其他页面使用 switchTab 切换
      uni.switchTab({
        url: this.getTabUrl(index),
        success: () => {
          this.currentTab = index
        }
      })
    },
    setCurrentTab() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const path = currentPage.route
      
      // 根据当前页面路径设置选中状态
      const tabPaths = [
        'pages/home/home',
        'pages/cate/cate',
        'pages/identify/identify',
        'pages/exam/exam',
        'pages/my/my'
      ]
      
      const index = tabPaths.indexOf(path)
      if (index !== -1) {
        this.currentTab = index
      }
    },
    getTabUrl(index) {
      const tabUrls = [
        '/pages/home/home',
        '/pages/cate/cate',
        '/pages/exam/exam',
        '/pages/my/my'
      ]
      return tabUrls[index] || '/pages/home/home'
    }
  }
}
</script>

<style>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 999;
}

.tab-bar-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
  z-index: -1;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.tab-icon {
  width: 24px;
  height: 24px;
}

.tab-text {
  font-size: 10px;
  color: #8a8a8a;
  margin-top: 2px;
}

.active .tab-text {
  color: #389bff;
}

.middle-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #389bff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(56, 155, 255, 0.5);
}

.middle-icon {
  width: 32px;
  height: 32px;
}
</style>