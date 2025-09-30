<template>
  <view class="container">
    <!-- 总积分 -->
    <view class="total-points">
      <text class="label">我的总积分：</text>
      <text class="value">{{ totalPoints }}</text>
    </view>

    <!-- 积分记录标题 -->
    <view class="header">积分记录</view>

    <!-- 积分明细列表 -->
    <view class="list">
      <view v-for="(item, index) in pointsList" :key="index" class="list-item">
        <view class="left">
          <text class="reason">{{ getReason(item.type) }}</text>
          <text class="time">{{ item.created_at }}</text>
        </view>
        <view
          class="right plus"
        >
          +{{ item.points }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getPoints } from "@/api/getPoints/getPoints.ts";

export default {
  data() {
    return {
      totalPoints: 0,  // 总积分
      pointsList: []   // 积分记录
    };
  },
  onLoad() {
    this.fetchPoints();
  },
  methods: {
    async fetchPoints() {
      try {
        const res = await getPoints();
        if (res && res.data) {
          this.totalPoints = res.data.total_points || 0;
          this.pointsList = res.data.points_list || [];
        }
      } catch (err) {
        console.error("获取积分数据失败", err);
        uni.showToast({ title: "获取积分失败", icon: "none" });
      }
    },
    // 根据 type 映射中文原因
    getReason(type) {
      const typeMap = {
        sign: "签到奖励",
        exam: "考试奖励"
      };
      return typeMap[type] || "其他";
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}
.total-points {
  background: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05);

  .label {
    font-size: 28rpx;
    color: #666;
  }
  .value {
    font-size: 40rpx;
    font-weight: bold;
    color: #3370ff;
    margin-left: 10rpx;
  }
}
.header {
  font-size: 34rpx;
  font-weight: bold;
  margin: 20rpx 0;
}
.list-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-bottom: 1px solid #eee;
}
.reason {
  font-size: 28rpx;
  font-weight: 500;
}
.time {
  display: block;
  font-size: 24rpx;
  color: #888;
  margin-top: 8rpx;
}
.right {
  font-size: 30rpx;
  font-weight: bold;
}
.plus {
  color: #4caf50;
}
</style>
