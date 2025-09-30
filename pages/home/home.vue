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
	      :rightIcons="[{ type: 'camera-filled' }]"  
	      @input="handleInput"
	      @confirm="handleConfirm"
	      @focus="handleFocus"
	      @blur="handleBlur"
	      @clear="handleClear"
	      @iconClick="handleIconClick"
	      @rightIconClick="handleRightIconClick"
	    />
	    
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
	          @click="goToDetail(item.url, index)"
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
		
		<view class="hot-knowledge-section">
		  <view class="section-title">热门知识</view>
		  <view class="card-container">
		    <view 
		      v-for="(item, index) in hotKnowledge" 
		      :key="index" 
		      class="knowledge-card" 
		      @click="goToKnowledge(item)"
		    >
		      <image :src="item.image" class="card-image" />
		      <view class="card-content">
		        <text class="card-title">{{ item.title }}</text>
		        <text class="card-desc">{{ item.desc }}</text>
		      </view>
		    </view>
		  </view>
		</view>

  </view>
</template>

<script>

const app = getApp()

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
			url: '/subpkg/ecoLearn/ecoLearn'
		  },
		  {
			id: 2,
			title: '考试得积分',
			image: '/static/home/grid-container/question.svg',
			url: '/pages/exam/exam'
		  },
		  {
			id: 3,
			title: '投放指南',
			image: '/static/home/grid-container/guide.svg',
			url: '/subpkg/guide/guide'
		  },
		  {
			id: 4,
			title: '全部分类',
			image: '/static/home/grid-container/cate.svg',
			url: '/pages/cate/cate'
		  }
		],
		hotKnowledge: [
			{
			  id: 1,
			  title: '如何正确投放可回收物',
			  desc: '纸张、塑料、金属等可回收物应分类投放，保持干净整洁。',
			  image: '/static/home/hotKnowledge/hotKnowledge01.jpg',
			  url: '/subpkg/recycleGuide/recycleGuide'
			},
			{
			  id: 2,
			  title: '厨余垃圾处理小技巧',
			  desc: '厨余垃圾应去除包装袋，尽量沥干水分投放。',
			  image: '/static/home/hotKnowledge/hotKnowledge02.jpg',
			  url: '/subpkg/kitchenWasteTips/kitchenWasteTips'
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
	goToDetail(url, index) {
	  if (url) {
		if(index == 1) {
			app.globalData.selected = 3;
			uni.switchTab({
				url: url
			});
		}else if(index == 3) {
			app.globalData.selected = 1;
			uni.switchTab({
				url: url
			});
		} else {
			uni.navigateTo({
			  url: url
			});
		}
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
	  const keyword = value.trim();
	    if (!keyword) {
	      uni.showToast({
	        title: '请输入要查询的垃圾',
	        icon: 'none'
	      });
	      return;
	    }
	    
	    // 跳转到识别页面，type=0表示文字检索
	    uni.navigateTo({
	      url: `/subpkg/identify/identify?type=0&searchWord=${keyword}`
	    });
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
	  const keyword = this.searchValue.trim();
	  if (!keyword) {
	    uni.showToast({
	      title: '请输入要查询的垃圾',
	      icon: 'none'
	    });
	    return;
	  }
	
	  // 跳转到文字识别页面，type=0表示文字搜索
	  uni.navigateTo({
	    url: `/subpkg/identify/identify?type=0&searchWord=${keyword}`
	  });
	},
	
	// 右侧图标点击事件处理
	handleRightIconClick(index) {
	  this.startCameraRecognition();
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
	
	
	// 拍照识别功能
	startCameraRecognition() {
	  uni.chooseImage({
		count: 1,
		success: (res) => {
		  const tempFilePath = res.tempFilePaths[0];
		  uni.navigateTo({
		  			url: `/subpkg/identify/identify?type=1&tempFilePath=${tempFilePath}`
		  });
		},
		fail: (err) => {
			console.error('选择图片失败：', err);
			uni.showToast({
			  title: '选择图片失败',
			  icon: 'none'
			});
		  }
	  });
	},
	goToKnowledge(item) {
	  uni.navigateTo({
		url: item.url
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

.hot-knowledge-section {
  margin-top: 40rpx;
  padding: 0 20rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .card-container {
    display: flex;
    justify-content: space-between;
  }

  .knowledge-card {
    width: 48%; // 两张卡片左右排列
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
  }

  .card-image {
    width: 100%;
    height: 150rpx;
    object-fit: cover;
  }

  .card-content {
    padding: 16rpx;
  }

  .card-title {
    font-size: 28rpx;
    font-weight: 600;
    margin-bottom: 10rpx;
  }

  .card-desc {
	display: block;
    font-size: 24rpx;
    color: #666;
    line-height: 32rpx;
  }
}


</style>