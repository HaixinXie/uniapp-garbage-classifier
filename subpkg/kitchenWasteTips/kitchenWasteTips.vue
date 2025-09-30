<template>
  <view class="detail-container">
    <!-- 封面图 -->
    <image class="cover" src="/static/home/hotKnowledge/hotKnowledge02.jpg" mode="aspectFill"></image>

    <!-- 内容区 -->
    <view class="content-box">
      <view class="title">厨余垃圾处理小技巧</view>
      <view class="desc">
        厨余垃圾应去除包装袋，尽量沥干水分投放。
      </view>

      <!-- 知识要点 -->
      <view class="section">
        <view class="section-title">✅ 投放要点</view>
        <view class="section-text">
          1. 剩菜剩饭请去除一次性餐具。<br />
          2. 果皮菜叶沥干水分后再投放。<br />
          3. 茶渣、咖啡渣可直接投放。<br />
          4. 不要将塑料袋混入厨余垃圾。
        </view>
      </view>

      <!-- 小贴士 -->
      <view class="tips kitchen">
        🥬 提示：厨余垃圾含水量高，提前沥水可避免垃圾桶渗漏和异味！
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.detail-container {
  background: #f9fafc;
  min-height: 100vh;
}
.cover {
  width: 100%;
  height: 400rpx;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
.content-box {
  padding: 30rpx;
}
.title {
  font-size: 38rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #ef6c00;
}
.desc {
  font-size: 28rpx;
  color: #555;
  line-height: 42rpx;
  margin-bottom: 30rpx;
}
.section {
  margin-bottom: 30rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
  color: #fb8c00;
}
.section-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: #444;
}
.tips {
  background: #fff3e0;
  padding: 20rpx;
  border-radius: 16rpx;
  font-size: 26rpx;
  color: #e65100;
  line-height: 38rpx;
}
</style>
