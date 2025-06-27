<template>
  <view class="container">
    <view class="banner">
      <swiper 
        indicator-dots 
        indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#fff" 
        circular 
        autoplay 
        interval="4000"
      >
        <swiper-item v-for="(item, index) in carouselList" :key="index">
          <view class="image-container">
            <image 
              :src="item.imageUrl" 
              mode="aspectFill" 
              lazy-load
              @load="handleImageLoaded(index)"
              class="carousel-image"
              :class="{'image-loaded': imageLoadStates[index]}"
            ></image>
            <!-- 图片加载中指示器 -->
            <view 
              class="loading-indicator" 
              :class="{'hidden': imageLoadStates[index]}"
            ></view>
          </view>
        </swiper-item>
      </swiper>
    </view>
	<!-- 基础用法 -->
	<!-- 自定义搜索组件 -->
	<view class="page-container">
	    <!-- 搜索组件使用，添加完整事件监听 -->
	    <uni-mysearch 
	      placeholder="请输入要查询的垃圾"
	      iconColor="#3370FF"
	      :rightIcons="[{ type: 'mic-filled' }, { type: 'camera-filled' }]"
	      @input="handleInput"
	      @confirm="handleConfirm"
	      @focus="handleFocus"
	      @blur="handleBlur"
	      @clear="handleClear"
	      @iconClick="handleIconClick"
	      @rightIconClick="handleRightIconClick"
	    ></uni-mysearch>
	    
	    <!-- 搜索结果展示区域 -->
	    <view v-if="searchResult" class="result-container">
	      <view class="result-title">搜索结果：{{ searchValue }}</view>
	      <view class="result-content">{{ searchResult }}</view>
	    </view>
	  </view>
	  <view class="grid-container">
	      <!-- 四宫格布局 -->
	      <view class="grid-items">
	        <view 
	          v-for="(item, index) in gridData" 
	          :key="index" 
	          class="grid-item"
	          @click="goToDetail(item.url)"
	        >
	          <image 
	            :src="item.image" 
	            mode="aspectFill" 
	            class="grid-image"
	          ></image>
	          <text class="grid-text">{{ item.title }}</text>
	        </view>
	      </view>
	    </view>
  </view>
</template>

<script>
	
export default {
  data() {
    return {
      carouselList: [
        { imageUrl: '/static/home/Carousel/image-1.jpg' },
        { imageUrl: '/static/home/Carousel/image-2.jpg' },
        { imageUrl: '/static/home/Carousel/image-3.jpg' }
      ],
      imageLoadStates: [false, false, false], // 每张图片的加载状态
	  searchValue: '',
	  searchResult: '',
	  // 内置动态数据
		gridData: [
		  {
			id: 1,
			title: '环保知识学习',
			image: '/static/home/grid-container/study.svg',
			url: '/pages/category/detail?id=1'
		  },
		  {
			id: 2,
			title: '竞答得积分',
			image: '/static/home/grid-container/question.svg',
			url: '/pages/category/detail?id=2'
		  },
		  {
			id: 3,
			title: '投放指南',
			image: '/static/home/grid-container/guide.svg',
			url: '/pages/category/detail?id=3'
		  },
		  {
			id: 4,
			title: '全部分类',
			image: '/static/home/grid-container/cate.svg',
			url: '/pages/category/detail?id=4'
		  }
		]
    }
  },
  methods: {
    handleImageLoaded(index) {
      // 更新对应图片的加载状态
      this.$set(this.imageLoadStates, index, true);
    },
	// 跳转到详情页
	goToDetail(url) {
	  if (url) {
		uni.navigateTo({
		  url: url
		});
	  } else {
		uni.showToast({
		  title: '暂无跳转链接',
		  icon: 'none'
		});
	  }
	},
	// 输入事件处理
	handleInput(value) {
	  this.searchValue = value;
	  console.log('输入内容:', value);
	  
	  // 这里可以添加实时搜索逻辑
	  if (value.trim()) {
		this.realTimeSearch(value);
	  }
	},
	
	// 确认搜索事件处理
	handleConfirm(value) {
	  if (!value.trim()) {
		uni.showToast({
		  title: '请输入要查询的垃圾',
		  icon: 'none'
		});
		return;
	  }
	  
	  this.searchValue = value;
	  this.queryGarbageType(value);
	},
	
	// 聚焦事件处理
	handleFocus(e) {
	  console.log('搜索框聚焦');
	  // 可以添加聚焦时的动画效果或提示
	},
	
	// 失焦事件处理
	handleBlur(e) {
	  console.log('搜索框失焦');
	},
	
	// 清除搜索内容事件处理
	handleClear() {
	  console.log('清除搜索内容');
	  this.searchValue = '';
	  this.searchResult = '';
	},
	
	// 左侧图标点击事件处理
	handleIconClick() {
	  console.log('左侧图标点击');
	  // 左侧默认是搜索图标，点击可以触发搜索
	  if (this.searchValue.trim()) {
		this.queryGarbageType(this.searchValue);
	  } else {
		uni.showToast({
		  title: '请输入要查询的垃圾',
		  icon: 'none'
		});
	  }
	},
	
	// 右侧图标点击事件处理
	handleRightIconClick(index) {
	  const iconTypes = ['语音识别', '拍照识别'];
	  console.log(`点击右侧图标: ${iconTypes[index]}`);
	  
	  // 根据点击的图标索引执行不同操作
	  if (index === 0) {
		// 语音识别功能
		this.startVoiceRecognition();
	  } else if (index === 1) {
		// 拍照识别功能
		this.startCameraRecognition();
	  }
	},
	
	// 实时搜索功能
	realTimeSearch(keyword) {
	  // 这里可以实现实时搜索建议
	  // 示例：模拟搜索建议
	  console.log('实时搜索建议:', keyword);
	},
	
	// 查询垃圾类型
	queryGarbageType(keyword) {
	  uni.showLoading({
		title: '查询中...'
	  });
	  
	  // 模拟API请求
	  setTimeout(() => {
		uni.hideLoading();
		
		// 这里应该替换为真实的垃圾分类API调用
		const garbageTypes = {
		  '苹果': '厨余垃圾',
		  '纸张': '可回收物',
		  '电池': '有害垃圾',
		  '塑料袋': '其他垃圾',
		  // 可以添加更多垃圾类型...
		};
		
		this.searchResult = garbageTypes[keyword] || '未找到该垃圾的分类信息';
	  }, 800);
	},
	
	// 语音识别功能
	startVoiceRecognition() {
	  uni.showToast({
		title: '语音识别功能',
		icon: 'none'
	  });
	  // 这里应调用语音识别API
	},
	
	// 拍照识别功能
	startCameraRecognition() {
	  uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['camera'],
		success: (res) => {
		  uni.showToast({
			title: '正在识别图片...',
			icon: 'none'
		  });
		  // 这里应调用图像识别API处理选中的图片
		}
	  });
	}
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  overflow: hidden;
}

.banner {
  width: 100%;
  position: relative;
  
  // 使用 padding-bottom 保持比例
  &:before {
    content: "";
    display: block;
    width: 100%;
    padding-bottom: 56.25%; // 16:9 比例
  }
  
  swiper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0; // 默认隐藏图片
  transition: opacity 0.3s ease;
  
  &.image-loaded {
    opacity: 1; // 图片加载完成后显示
  }
}

.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  
  // 加载动画
  &:after {
    content: "";
    width: 30rpx;
    height: 30rpx;
    border: 2rpx solid #ccc;
    border-top-color: #389bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  &.hidden {
    display: none;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 四宫格布局样式 */
.grid-container {
  padding: 20rpx;
  box-sizing: border-box;
}

.grid-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.grid-item {
  width: calc(25% - 20rpx); /* 每个项占25%宽度，减去间距 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.grid-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  margin-bottom: 12rpx;
  // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.grid-text {
  font-size: 24rpx;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

</style>