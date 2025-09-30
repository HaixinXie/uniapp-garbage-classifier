<template>
  <view class="bind-page">
    <!-- 标题 -->
    <view class="page-title">学校班级绑定</view>

    <!-- 未绑定状态 -->
    <view v-if="!isBound">
      <view class="panel">
        <!-- 学校选择 -->
        <picker mode="selector" :range="schoolList" :value="schoolIndex" @change="onSchoolChange">
          <view class="panel-item">
            <text class="label">学校</text>
            <text class="value">{{ schoolList[schoolIndex] }}</text>
            <uni-icons type="arrowright" size="18" color="#ccc"></uni-icons>
          </view>
        </picker>

        <!-- 班级选择 -->
        <picker mode="selector" :range="classList" :value="classIndex" @change="onClassChange" :disabled="classList.length === 0">
          <view class="panel-item">
            <text class="label">班级</text>
            <text 
              class="value" 
              :style="{ color: classList.length === 0 ? '#999' : '#333' }"
            >
              {{ classList.length ? classList[classIndex] : '请选择学校后再选择' }}
            </text>
            <uni-icons type="arrowright" size="18" color="#ccc"></uni-icons>
          </view>
        </picker>
      </view>

      <!-- 绑定按钮 -->
      <button class="bind-btn" @click="bindSchoolClass">确认绑定</button>
    </view>

    <!-- 已绑定状态 -->
    <view v-else>
      <view class="panel">
        <view class="panel-item">
          <text class="label">已绑定学校</text>
          <text class="value">{{ boundSchool }}</text>
        </view>
        <view class="panel-item">
          <text class="label">已绑定班级</text>
          <text class="value">{{ boundClass }}</text>
        </view>
      </view>

      <!-- 解绑按钮 -->
      <button class="unbind-btn" @click="unbindSchoolClass">解绑</button>
    </view>
  </view>
</template>

<script lang='ts'>
import { checkSchoolBound, bindSchoolClass } from '@/api/bindSchoolClass/bindSchoolClass.ts'
import { BindSchoolClassRequest } from "../../types/schoolclass"

export default {
  data() {
    return {
      // 是否已绑定
      isBound: false,

      // 已绑定的信息
      boundSchool: '',
      boundClass: '',

      // 学校列表
      schoolList: ['请选择学校', '长郡中学', '雅礼中学', '长沙市第一中学', '湖南师范大学附属中学'],
      schoolIndex: 0,

      // 学校-班级映射
      allClasses: {
        '长郡中学': ['高一(1)班', '高一(2)班'],
        '雅礼中学': ['高二(1)班', '高二(2)班'],
        '长沙市第一中学': ['高二(1)班', '高二(2)班'],
        '湖南师范大学附属中学': ['高二(1)班', '高二(2)班']
      },
      classList: [],
      classIndex: 0
    }
  },
  created() {
	  this.checkIsBound();
  },
  methods: {
	async checkIsBound() {
		try {
			const res = await checkSchoolBound();
			this.isBound = res.data.is_bound;
			if(this.isBound) {
				this.boundSchool = res.data.school;
				this.boundClass = res.data.class_name;
			}
		} catch(error) {
			console.error("获取绑定信息失败", error);
		}
	},
	
    onSchoolChange(e) {
      this.schoolIndex = e.detail.value
      const school = this.schoolList[this.schoolIndex]
      if (school && school !== '请选择学校') {
        this.classList = this.allClasses[school] || []
        this.classIndex = 0
      } else {
        this.classList = []
        this.classIndex = 0
      }
    },
    onClassChange(e) {
      this.classIndex = e.detail.value
    },
    // 绑定
    async bindSchoolClass() {
      const school = this.schoolList[this.schoolIndex]
      const classname = this.classList.length ? this.classList[this.classIndex] : null

      if (!school || school === '请选择学校') {
        uni.showToast({ title: '请选择学校', icon: 'none' })
        return
      }
      if (!classname) {
        uni.showToast({ title: '请选择班级', icon: 'none' })
        return
      }

	  try {
		const bindSchoolClassRequest: BindSchoolClassRequest = {
			school,
			classname
		};
		await bindSchoolClass(bindSchoolClassRequest);

		this.boundSchool = school;
		this.boundClass = classname;
		this.isBound = true;
		uni.showToast({ title: '绑定成功', icon: 'success' });
	  } catch(error) {
	    console.error("绑定失败", error);
	  }
    },
    // 解绑
    async unbindSchoolClass() {
	  try {
		const school = "";
		const classname = "";
		const bindSchoolClassRequest: BindSchoolClassRequest = {
			school,
			classname
		};
		await bindSchoolClass(bindSchoolClassRequest);
		this.boundSchool = ''
		this.boundClass = ''
		this.isBound = false
		this.schoolIndex = 0
		this.classList = []
		this.classIndex = 0
		
		uni.showToast({ title: '已解绑', icon: 'none' })
	  } catch(error) {
		console.error("解绑失败", error);
	  }
    }
  }
}
</script>

<style lang="scss">
.bind-page {
  padding: 30rpx;
  background: #f7f8fa;
  min-height: 100vh;
}

.page-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.panel {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
  overflow: hidden;
}

.panel-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
}

.label {
  font-size: 30rpx;
  color: #333;
}

.value {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  margin-right: 20rpx;
}

.bind-btn {
  margin-top: 60rpx;
  background-color: #fc4353;
  color: #fff;
  font-size: 30rpx;
  border-radius: 50rpx;
  padding: 20rpx 0;
}

.unbind-btn {
  margin-top: 60rpx;
  background-color: #fff;
  color: #fc4353;
  border: 2rpx solid #fc4353;
  font-size: 30rpx;
  border-radius: 50rpx;
  padding: 20rpx 0;
}
</style>
