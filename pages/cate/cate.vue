<template>
  <view class="classify">
    <!-- 搜索框 -->
    <view class="search">
      <view class="search-content">
        <uni-icons type="search" size="26" color="#9F9F9F"></uni-icons>
        <!-- 这里使用input组件让用户输入关键词 -->
        <input 
          type="text" 
          placeholder="搜索垃圾分类" 
          v-model="keyword" 
          class="search-input"
		  @confirm="goToSearch"
        />
      </view>
    </view>

    <!-- 分类部分 -->
    <view class="cate-container">
      <view class="cate-left">
        <view :class="['cate-item', activeIndex === index ? 'active' : '']" 
              :style="activeIndex === index ? { '--active-color': activeColors[index] } as any : {}"
              v-for="(item, index) in cateList" 
              :key="index" 
              @click="changeActive(index)">
          {{ item.classifyName }}
        </view>
      </view>
      
      <scroll-view 
        class="cate-right" 
        scroll-y 
        @scrolltolower="loadGoodList">
        <view class="cate-content" 
              v-for="(goodItem, goodIndex) in goodList" 
              :key="goodIndex"
              @click="showLajiTips(goodItem)">
          <view class="content-item">
            <view class="item-icon" :class="itemIconClass(goodIndex)"></view>
            <view class="item-text">{{ goodItem.name }}</view>
          </view>
        </view>
        <view v-if="!hasMore" class="no-more">没有更多了</view>
      </scroll-view>
    </view>

    <!-- 弹窗（底部卡片） -->
    <uni-popup ref="tipsPopup" type="center" background-color="#fff">
      <view class="tips-card">
        <view class="tips-header">
          <text class="tips-title">{{ currentItem?.name }}</text>
          <text class="tips-close" @click="closeTips">×</text>
        </view>
        <view class="tips-body">
          <text>{{ currentItem?.lajitip || '暂无提示信息' }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts">
import { useUserStore } from "@/stores";
import { getCate } from '@/api/cate/cate.ts';
import { CateRequest } from "../../types/cate";


export default {
  data() {
    return {
      cateList: [
        {
          classifyId: 1,
          classifyName: '可回收垃圾'
        },
        {
          classifyId: 2,
          classifyName: '有害垃圾'
        },
        {
          classifyId: 3,
          classifyName: '厨余垃圾'
        },
        {
          classifyId: 4,
          classifyName: '其他垃圾'
        }
      ],
		activeIndex: 0,
		goodList: [],
		page: 1,
		hasMore: true,
		activeColors: ['#2565AE', '#E53122', '#8EC060', '#94918E'],
		currentItem: null,
		keyword: ''
    };
  },
  methods: {
    async changeActive(i) {
      this.activeIndex = i;
	  this.goodList = [];        // 清空旧数据
	  this.page = 1;             // 重置页码
	  this.hasMore = true;       // 重置加载状态
	  await this.loadGoodList(); // 拉取第一页数据
    },
	async loadGoodList() {
		if (!this.hasMore) return;
		
		const category = this.activeIndex;
		const page = this.page;
		
		const getCateData: CateRequest = {
		  category,
		  page
		};

		uni.showLoading({ title: "加载中..." });
		try {
		  const res = await getCate(getCateData); // 假设封装的请求
		  this.goodList = [...this.goodList, ...res.data.items || []];
		  this.hasMore = res.data.hasMore;
		  this.page++;
		} catch (e) {
		  console.error(e);
		} finally {
		  uni.hideLoading();
		}
	  },
    goToSearch() {
	  // 检查是否输入了关键词
	  if (this.keyword.trim()) {
		// 使用输入的关键词进行跳转
		uni.navigateTo({
		  url: `/subpkg/identify/identify?type=0&searchWord=${this.keyword}`
		});
	  } else {
		// 可以提示用户输入关键词
		uni.showToast({
		  title: '请输入搜索关键词',
		  icon: 'none'
		});
	  }
	},
    // 根据分类生成对应图标类名
    itemIconClass(index) {
      const iconMap = {
        0: 'recycle-icon',    // 可回收
        1: 'hazard-icon',     // 有害
        2: 'food-icon',       // 厨余
        3: 'other-icon'       // 其他
      };
      // 根据当前分类索引获取图标类型
      // const cateIndex = Math.floor(index / 5); // 假设每类5个项目
      return iconMap[this.activeIndex] || '';
    },
	showLajiTips(item) {
	  this.currentItem = item;
	  (this.$refs.tipsPopup as any).open();
	},
	closeTips() {
	  (this.$refs.tipsPopup as any).close();
	}
  },
  onLoad() {
    this.loadGoodList();
  }
};
</script>

<style lang="scss">
.classify {
  background: linear-gradient(180deg, #f0f9ff, #ffffff);
  min-height: 100vh;
  position: relative;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  /* 搜索栏 */
  .search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 134rpx;
    background: linear-gradient(90deg, #42a5f5, #1e88e5);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30rpx;
    box-sizing: border-box;

    .search-content {
      width: 100%;
      max-width: 600rpx;
      height: 80rpx;
      background: #fff;
      border-radius: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #9f9f9f;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

      text {
        margin-left: 12rpx;
        font-size: 28rpx;
      }
    }
  }

  /* 分类容器 */
  .cate-container {
    width: 100%;
    display: flex;
    padding-top: 134rpx;
    height: calc(100vh - 134rpx);

    /* 左侧分类栏 */
    .cate-left {
      position: fixed;
      top: 134rpx;
      left: 0;
      width: 200rpx;
      height: calc(100vh - 134rpx);
      background-color: #fff;
      overflow-y: auto;
      border-right: 1rpx solid #eee;

      .cate-item {
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        padding-left: 40rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #555;
        transition: all 0.3s;
        position: relative;
      }

      .active {
        background: #f0f7ff;
        font-weight: bold;
        color: var(--active-color);

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20rpx;
          width: 8rpx;
          height: 60rpx;
          background: var(--active-color);
          border-radius: 0 4rpx 4rpx 0;
        }
      }
    }

    /* 右侧内容 */
    .cate-right {
      margin-left: 200rpx;
      flex: 1;
      height: calc(100vh - 134rpx);
      overflow-y: auto;
      padding: 20rpx;

      .cate-content {
        display: flex;
        flex-direction: column;
        gap: 24rpx;

        .content-item {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 16rpx;
          padding: 28rpx 30rpx;
          box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
          transition: transform 0.2s, box-shadow 0.2s;

          &:active {
            transform: scale(0.97);
            box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.12);
          }

          .item-icon {
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 22rpx;
            font-size: 28rpx;
            color: #fff;
          }

          .recycle-icon {
            background: linear-gradient(135deg, #42a5f5, #1e88e5);
          }
          .hazard-icon {
            background: linear-gradient(135deg, #ef5350, #d32f2f);
          }
          .food-icon {
            background: linear-gradient(135deg, #81c784, #388e3c);
          }
          .other-icon {
            background: linear-gradient(135deg, #bdbdbd, #757575);
          }

          .item-text {
            font-size: 30rpx;
            color: #333;
            font-weight: 500;
          }
        }
      }

      .no-more {
        text-align: center;
        font-size: 26rpx;
        color: #aaa;
        padding: 30rpx 0;
      }
    }
  }
}

.tips-card {
  padding: 30rpx;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  background: #fff;
  box-shadow: 0 -6rpx 20rpx rgba(0,0,0,0.08);

  .tips-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .tips-title {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
    }

    .tips-close {
      font-size: 40rpx;
      color: #999;
      padding: 0 10rpx;
    }
  }

  .tips-body {
    font-size: 28rpx;
    color: #555;
    line-height: 1.6;
  }
}

</style>