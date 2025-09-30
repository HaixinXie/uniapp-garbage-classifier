<template>
  <view class="detail-container">
    <!-- 封面图 -->
    <image class="cover" src="/static/home/hotKnowledge/hotKnowledge01.jpg" mode="aspectFill"></image>

    <!-- 内容区 -->
    <view class="content-box">
      <view class="title">如何正确投放可回收物</view>
      <view class="desc">
        纸张、塑料、金属等可回收物应分类投放，保持干净整洁。
      </view>

      <!-- 知识要点 -->
      <view class="section">
        <view class="section-title">✅ 投放要点</view>
        <view class="section-text">
          1. 纸张应避免油污、塑料膜污染。<br />
          2. 塑料瓶请清空内容物并压扁后投放。<br />
          3. 金属制品请去除残留物，保持干净。<br />
          4. 玻璃制品注意轻拿轻放，避免破损伤人。
        </view>
      </view>

      <!-- 小贴士 -->
      <view class="tips">
        ♻️ 提示：可回收物循环利用价值高，正确投放能有效减少资源浪费！
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
  color: #2e7d32;
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
  color: #388e3c;
}
.section-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: #444;
}
.tips {
  background: #e8f5e9;
  padding: 20rpx;
  border-radius: 16rpx;
  font-size: 26rpx;
  color: #1b5e20;
  line-height: 38rpx;
}
</style>
