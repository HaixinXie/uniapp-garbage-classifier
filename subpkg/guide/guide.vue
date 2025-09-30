<template>
  <view class="guide-container">
    <!-- 顶部标题 -->
    <view class="header">
      🗑️ 垃圾投放指南
    </view>

    <!-- 分类卡片 -->
    <view class="cards">
      <view class="card recycle">
        <view class="card-title">♻️ 可回收物</view>
        <view class="card-content">
          包括：纸张、塑料瓶、玻璃、金属、衣物等<br />
          <text class="tip">请清洁后投放</text>
        </view>
      </view>

      <view class="card harmful">
        <view class="card-title">☣️ 有害垃圾</view>
        <view class="card-content">
          包括：电池、灯管、药品、油漆桶等<br />
          <text class="tip">请单独包装</text>
        </view>
      </view>

      <view class="card kitchen">
        <view class="card-title">🥬 厨余垃圾</view>
        <view class="card-content">
          包括：剩菜剩饭、果皮菜叶、茶渣等<br />
          <text class="tip">避免塑料袋混入</text>
        </view>
      </view>

      <view class="card other">
        <view class="card-title">🗑️ 其他垃圾</view>
        <view class="card-content">
          包括：灰土、陶瓷、一次性餐具、卫生纸等<br />
          <text class="tip">干燥后再投放</text>
        </view>
      </view>
    </view>

    <!-- 小贴士 -->
    <view class="tips">
      <view class="tips-title">🌟 投放小贴士</view>
      <view class="tips-list">
        <text>1. 分类前请尽量清洁，避免二次污染</text>
        <text>2. 厨余垃圾可沥干水分再投放</text>
        <text>3. 有害垃圾应投放到专用回收箱</text>
        <text>4. 可回收物循环利用，减少资源浪费</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
}
</script>

<style lang="scss">
.guide-container {
  padding: 24rpx;
  background: #f5f7fa;
  min-height: 100vh;
}

/* 顶部标题 */
.header {
  text-align: center;
  font-size: 40rpx;
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 30rpx;
  padding: 20rpx 0;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  border-radius: 20rpx;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.1);
}

/* 分类卡片 */
.cards {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card {
  padding: 24rpx;
  border-radius: 20rpx;
  color: #fff;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.1);
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.card-content {
  font-size: 26rpx;
  line-height: 40rpx;
}

.tip {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  font-style: italic;
}

/* 不同垃圾类型颜色 */
.recycle {
  background: linear-gradient(135deg, #4caf50, #81c784);
}
.harmful {
  background: linear-gradient(135deg, #f44336, #e57373);
}
.kitchen {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}
.other {
  background: linear-gradient(135deg, #9e9e9e, #bdbdbd);
}

/* 小贴士 */
.tips {
  margin-top: 40rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.08);
}

.tips-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.tips-list text {
  display: block;
  font-size: 26rpx;
  color: #555;
  margin-bottom: 12rpx;
}
</style>
