<template>
  <view class="container">
    <view class="header">📘 考试记录</view>

    <!-- 考试记录列表 -->
    <view class="list">
      <view 
        v-for="(item, index) in examList" 
        :key="index" 
        class="list-item"
      >
        <view class="info">
          <text class="title">垃圾分类知识测验</text>
          <text class="time">考试时间：{{ item.exam_time }}</text>
        </view>
        <view 
          class="score" 
          :class="{ high: item.score >= 90, mid: item.score >= 60 && item.score < 90, low: item.score < 60 }"
        >
          {{ item.score }} 分
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getExamRecords } from "@/api/examRecords/examRecords.ts";

export default {
  data() {
    return {
      examList: []
    }
  },
  created() {
    this.loadExamRecords();
  },
  methods: {
    async loadExamRecords() {
      try {
        const res = await getExamRecords();
        this.examList = res.data || [];
      } catch (err) {
        console.error("获取考试记录失败:", err);
      }
    }
  }
}
</script>

<style lang='scss'>
.container {
  padding: 24rpx;
  background: #f5f7fa;
  min-height: 100vh;
}
.header {
  font-size: 38rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #2e7d32;
  text-align: center;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.list-item {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.06);
  transition: transform 0.2s;
}
.list-item:active {
  transform: scale(0.98);
}

.info {
  flex: 1;
}
.title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}
.time {
  display: block;
  font-size: 24rpx;
  color: #888;
  margin-top: 6rpx;
}

.score {
  font-size: 34rpx;
  font-weight: bold;
  padding: 10rpx 20rpx;
  border-radius: 16rpx;
  min-width: 120rpx;
  text-align: center;
}

/* 分数颜色分级 */
.high {
  background: linear-gradient(135deg, #81c784, #4caf50);
  color: #fff;
}
.mid {
  background: linear-gradient(135deg, #64b5f6, #2196f3);
  color: #fff;
}
.low {
  background: linear-gradient(135deg, #e57373, #f44336);
  color: #fff;
}
</style>
