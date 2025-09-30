<template>
  <view class="laji-list">
    <!-- 标题栏 -->
    <view class="laji-item-title" v-if="type==1">
      <view class="title-name">名称</view>
      <view class="title-type">
        <view class="title-trust">置信度</view>
        <view class="title-category">类别</view>
      </view>
    </view>
    <view class="laji-item-title" v-else-if="type==0">
      <view class="title-name">名称</view>
      <view class="title-category">类别</view>
    </view>

    <!-- 列表循环 -->
    <view 
      class="laji-item" 
      v-for="(item, index) in lajiList" 
      :key="index" 
      @click="showLajiTips(item)"
    >
      <view class="laji-name-wrapper">
        <view class="laji-name">{{ item.name }}</view>
      </view>

      <!-- type==1 显示置信度 + 类别 -->
      <view class="laji-type" v-if="type==1">
        <view class="laji-confidence">{{ toPercentage(item.trust) }}</view>
        <view class="laji-lajitype" :style="getTypeStyle(item.lajitype)">
          {{ getTypeText(item.lajitype) }}
        </view>
      </view>

      <!-- type==0 只显示类别 -->
      <view class="laji-lajitype" v-else :style="getTypeStyle(item.lajitype)">
        {{ getTypeText(item.lajitype) }}
      </view>
    </view>

    <!-- 提示弹窗 -->
    <uni-popup ref="tipPopup" type="dialog">
      <uni-popup-dialog 
        type="info" 
        title="投放指南"
        confirmText="我知道了"
        :content="currentTip"
      />
    </uni-popup>
  </view>
</template>

<script lang='ts'>
import { useUserStore } from "../../stores";
import { SearchRequest } from '../../types/search'
import { search } from '@/api/search/search.ts'

export default {
  data() {
    return {
      type: 0,
      searchWord: "",
      tempFilePath: "",
      lajiList: [],
      currentTip: ""  // 当前展示的提示内容
    };
  },
  onLoad(option) {
    this.type = option.type;
    if(this.type == 0){
      this.searchWord = option.searchWord;
      this.wordIdentify();
    } else {
      this.tempFilePath = option.tempFilePath;
      this.imageIdentify();
    }
  },
  methods: {
    async wordIdentify(){
      try {
        const searchRequest: SearchRequest = { kw: this.searchWord }
        const res = await search(searchRequest);
		console.log(res)
        this.lajiList = res.data;
      } catch(error) {
        console.error("搜索失败", error);
      }
    },
    imageIdentify(){
      const userStore = useUserStore();
      const token = userStore.token;
      uni.uploadFile({
        url: 'http://1.92.146.66:5000/api/classify-image',
        name: 'file',
        filePath: this.tempFilePath,
        fileType: 'image',
        header: { 'Authorization': `Bearer ${token}` },
        success: (res) => {
          if (res.statusCode === 200) {
            try {
              const data = JSON.parse(res.data);
              if (data.code === 200 && data.result && data.result.list) {
                this.lajiList = data.result.list;
              } else {
                uni.showToast({ icon: 'none', title: '未识别到结果' });
              }
            } catch (e) {
              console.error("解析 JSON 失败", e);
              uni.showToast({ icon: 'none', title: '返回数据异常' });
            }
          }
        },
        fail: (err) => {
          console.error('上传图片失败', err);
          uni.showToast({ title: '上传图片失败', icon: 'none' });
        }
      })
    },
    // 获取类型文本
    getTypeText(type) {
      const typeMap = {
        0: "可回收物",
        1: "有害垃圾",
        2: "厨余垃圾",
        3: "其他垃圾",
        4: "无法识别"
      };
      return typeMap[type] || "未知分类";
    },
    // 获取类型样式
    getTypeStyle(type) {
      const styleMap = {
        0: { backgroundColor: '#E8F4EA', color: '#34A853' },
        1: { backgroundColor: '#FEEAE9', color: '#EA4335' },
        2: { backgroundColor: '#FFF4E5', color: '#FBBC05' },
        3: { backgroundColor: '#F5F5F5', color: '#666666' },
        4: { backgroundColor: '#E0E0E0', color: '#999999' }
      };
      return styleMap[type] || {};
    },
    toPercentage(decimal, precision = 2) {
      return (decimal * 100).toFixed(precision) + '%';
    },
    // 点击显示提示
    showLajiTips(item) {
      this.currentTip = item.lajitip || "暂无相关提示";
	  (this.$refs.tipPopup as any).open();
    }
  }
}
</script>

<style lang="scss">
.laji-item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 24rpx;
  font-weight: 600;
  font-size: 28rpx;
  color: #666;
  background-color: #F8F8F8;
  border-bottom: 1rpx solid #E5E5E5;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
  margin-top: 20rpx;
}

.title-name {
  width: 70%; /* 与内容区域保持一致 */
}

.title-type {
  display: flex;
  width: 30%; /* 与内容区域保持一致 */
  justify-content: flex-end;
  align-items: center;
}

.title-trust {
  width: 45%; /* 控制置信度列宽度 */
  text-align: right;
  padding-right: 16rpx;
}

.title-category {
  width: 55%; /* 控制类别列宽度 */
  text-align: right;
}
.laji-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.laji-name-wrapper {
  display: flex;
  align-items: center;
  max-width: 70%; /* 防止长文本挤压右侧内容 */
}

.laji-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.laji-confidence {
  font-size: 24rpx;
  color: #666;
  margin-left: 12rpx;
  white-space: nowrap;
  margin-right: 20px;
}

.laji-type {
  display: flex;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  white-space: nowrap;
}

.uni-popup__dialog-content {
  font-size: 28rpx;
  color: #444;
  line-height: 1.6;
  text-align: left;
}
</style>
