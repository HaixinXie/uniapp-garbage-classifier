<template>
  <view class="container">
    <view class="header">识别记录</view>
    
    <view v-if="recordList.length" class="list">
      <view v-for="(item, index) in recordList" :key="index" class="list-item">
        <image :src="item.image_url" class="thumb" />
        <view class="info">
          <text class="time">上传时间：{{ item.created_at }}</text>
        </view>
      </view>
    </view>

    <!-- 没有记录时显示提示 -->
    <view v-else class="no-record">
      暂无识别记录
    </view>
  </view>
</template>


<script>
import { getRecognitionRecord } from '@/api/recognitionRecord/recognitionRecord.ts'

export default {
  data() {
    return {
      recordList: []
    }
  },
  async created() {
	  try {
		  const res = await getRecognitionRecord();
		  this.recordList = res.data;
	  } catch(error) {
		  console.error("获取记录失败", error);
	  }
  }
}
</script>

<style lang='scss'>
.container {
  padding: 20rpx;
}
.header {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #eee;
}
.thumb {
  width: 120rpx;
  height: 120rpx;
  margin-right: 20rpx;
  border-radius: 8rpx;
  object-fit: cover;
}
.info {
  flex: 1;
}
.time {
  font-size: 28rpx;
  color: #555;
}
.no-record {
  text-align: center;
  font-size: 28rpx;
  color: #999;
  margin-top: 80rpx;
}

</style>
