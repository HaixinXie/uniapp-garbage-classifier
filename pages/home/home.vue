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
	<uni-mysearch placeholder="请输入要查询的垃圾"
	iconColor="#3370FF"
      :rightIcons="[{ type: 'mic-filled' }, { type: 'camera-filled' }]"></uni-mysearch> 
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
      imageLoadStates: [false, false, false] // 每张图片的加载状态
    }
  },
  methods: {
    handleImageLoaded(index) {
      // 更新对应图片的加载状态
      this.$set(this.imageLoadStates, index, true);
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
</style>