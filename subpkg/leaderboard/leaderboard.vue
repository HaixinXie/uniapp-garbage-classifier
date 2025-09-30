<template>
  <div class="rank-page">
    <!-- 筛选栏 -->
    <view class="filter-bar">
        <!-- 学校选择 -->
        <picker mode="selector" :range="schoolList" :value="schoolIndex" @change="onSchoolChange">
          <view class="filter-item">
            学校：{{ schoolList[schoolIndex] }}
          </view>
        </picker>

        <!-- 班级选择 -->
        <picker mode="selector" :range="classList" :value="classIndex" @change="onClassChange" :disabled="classList.length === 0">
          <view class="filter-item" :style="{ color: classList.length === 0 ? '#999' : '#333' }">
            班级：{{ classList.length ? classList[classIndex] : '不可选' }}
          </view>
        </picker>
    </view>

    <!-- Tab 切换 -->
    <div class="tab-bar">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index" 
        :class="['tab-item', activeTab === tab.value ? 'active' : '']"
        @click="changeTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 排行榜列表 -->
    <div class="rank-list">
      <div class="rank-item" v-for="(item, index) in rankList" :key="index">
        <span class="rank-num">#{{ index + 1 }}</span>
        <img class="avatar" :src="item.avatar" alt="avatar"/>
        <span class="name">{{ item.nickname }}</span>
        <span class="score">{{ item.score }} 分</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { getLeaderboard } from '@/api/getLeaderboard/getLeaderboard.ts';
import { LeaderboardRequest } from "../../types/leaderboard";

export default {
  name: "RankPage",
  data() {
    return {
		activeTab: 'day', // 默认日榜
		tabs: [
		{ label: '当日', value: 'day' },
		{ label: '当月', value: 'month' },
		{ label: '总榜', value: 'total' }
		],
      // 学校数据（第一个是默认 "全部用户"）
		schoolList: ['全部用户', '长郡中学', '雅礼中学', '长沙市第一中学', '湖南师范大学附属中学'],
		schoolIndex: 0, // 默认选 "全部用户"

		// 学校-班级映射
		allClasses: {
		  '长郡中学': ['全部用户', '高一(1)班', '高一(2)班'],
		  '雅礼中学': ['全部用户', '高二(1)班', '高二(2)班'],
		  '长沙市第一中学': ['全部用户', '高二(1)班', '高二(2)班'],
		  '湖南师范大学附属中学': ['全部用户', '高二(1)班', '高二(2)班']
		},

		classList: [],   // 当前学校对应的班级
		classIndex: 0,
        rankList: []
    };
  },
  created() {
    this.fetchRankList();
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.fetchRankList();
    },
    async fetchRankList() {
      const school = this.schoolIndex == 0 ? '' : this.schoolList[this.schoolIndex];
	  const class_name = this.classIndex == 0 ? '' : this.classList[this.classIndex];
	  const type = this.activeTab;
	  
      const leaderboardRequest: LeaderboardRequest = {
      	school,
		class_name,
		type
      };
	  
      try {
         const res = await getLeaderboard(leaderboardRequest);
		 // console.log(res);
		 this.rankList = res.data;
         
      } catch (error) {
        console.error('查询排行榜信息失败:', error);
      }
    },
	// 更新班级列表
	updateClassList() {
	  const school = this.schoolList[this.schoolIndex]
	  if (school === '全部用户') {
		this.classList = [] // 全部用户时，班级不可选
		this.classIndex = 0
	  } else {
		this.classList = this.allClasses[school] || []
		this.classIndex = 0
	  }
	},

	// 选择学校
	onSchoolChange(e) {
	  this.schoolIndex = e.detail.value
	  this.updateClassList()
	  this.fetchRankList()
	},

	// 选择班级
	onClassChange(e) {
	  this.classIndex = e.detail.value
	  this.fetchRankList()
	}
  }
};
</script>

<style lang="scss">
.rank-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f0f7ff, #ffffff);
  padding: 20rpx;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  /* 筛选栏 */
  .filter-bar {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 20rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 20rpx;

    .filter-item {
      font-size: 28rpx;
      color: #333;
    }
  }

  /* Tab切换 */
  .tab-bar {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;
    background: #fff;
    border-radius: 100rpx;
    padding: 10rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      padding: 16rpx 0;
      border-radius: 100rpx;
      transition: all 0.3s;

      &.active {
        background: linear-gradient(135deg, #42a5f5, #1e88e5);
        color: #fff;
        font-weight: bold;
        box-shadow: 0 4rpx 10rpx rgba(66, 165, 245, 0.3);
      }
    }
  }

  /* 排行榜列表 */
  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .rank-item {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 20rpx;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      transition: transform 0.2s;

      &:active {
        transform: scale(0.98);
      }

      .rank-num {
        width: 60rpx;
        font-size: 32rpx;
        font-weight: bold;
        text-align: center;
      }

      /* 特殊样式：前三名 */
      &:nth-child(1) .rank-num {
        background: linear-gradient(135deg, #FFD700, #FFA500);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &:nth-child(2) .rank-num {
        background: linear-gradient(135deg, #C0C0C0, #A9A9A9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &:nth-child(3) .rank-num {
        background: linear-gradient(135deg, #CD7F32, #8B4513);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        margin: 0 20rpx;
        border: 3rpx solid #eee;
      }

      .name {
        flex: 1;
        font-size: 30rpx;
        color: #333;
        font-weight: 500;
      }

      .score {
        font-size: 32rpx;
        font-weight: bold;
        color: #42a5f5;
      }
    }
  }
}

</style>
