<template>
	<view>
		<back :showBackText="false" customClass="bg-gradual-blue text-white" title="答题结果"></back>
		<view class="result-container" v-if="isLoad">
			<!-- 成绩卡片 -->
			<view class="result-card bg-white shadow">
				<!-- 成绩圆环 -->
				<view class="score-circle">
					<view class="circle-bg">
						<view class="circle-progress" :style="'transform: rotate(' + (responseData.right_rate * 3.6) + 'deg)'"></view>
					</view>
					<view class="circle-content">
						<text class="circle-percent">{{ responseData.right_rate }}%</text>
						<text class="circle-label">正确率</text>
					</view>
				</view>
				
				<!-- 详细数据 -->
				<view class="result-stats">
					<view class="stat-item">
						<text class="stat-value text-blue">{{ responseData.right_count }}</text>
						<text class="stat-label">做对题数</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<text class="stat-value">{{ responseData.answer_count }}/{{ responseData.all_count }}</text>
						<text class="stat-label">已完成</text>
					</view>
				</view>
				
				<!-- 评价信息 -->
				<view class="result-comment">
					<text class="comment-text" v-if="responseData.right_rate >= 80">太棒了！继续保持！</text>
					<text class="comment-text" v-else-if="responseData.right_rate >= 60">不错的表现，还可以更好！</text>
					<text class="comment-text" v-else>再接再厉，继续努力！</text>
				</view>
			</view>
			
			<!-- 操作按钮 -->
			<view class="action-buttons">
				<button @tap="redirectTap" class="cu-btn round bg-gradual-blue shadow lg" data-action="1">
					<text class="cuIcon-home"></text> 返回首页
				</button>
				<button @tap="redirectTap" class="cu-btn round bg-gradual-purple shadow lg margin-top" data-action="2">
					<text class="cuIcon-my"></text> 继续考试
				</button>
			</view>
		</view>
		<adfootbanner unitId="adunit-9f7b1de89ce8659f"></adfootbanner>
	</view>
</template>

<script>

	// let app = getApp();
	let that = null;
	export default {
		data() {
			return {
				isLoad: false,
				responseData: {}
			};
		},
		onLoad(option) {
			this.responseData = {
				right_rate: option.score,
				right_count: option.right_count
			}
			this.isLoad = true;
		},
		methods: {
			redirectTap(options) {
				let action = options.currentTarget.dataset.action;
				let url = action == 1 ? '/pages/home/home' : '/pages/exam/exam';
				uni.switchTab({
					url: url
				});
			}
		}
	};
</script>
<style lang="scss">
	/* 结果页面容器 */
	.result-container {
	    padding: 30rpx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    min-height: calc(100vh - 200rpx);
	}
	
	/* 结果卡片 */
	.result-card {
	    width: 100%;
	    border-radius: 20rpx;
	    padding: 40rpx 30rpx;
	    margin-bottom: 40rpx;
	    position: relative;
	    overflow: hidden;
	}
	
	.shadow {
	    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	}
	
	/* 成绩圆环 */
	.score-circle {
	    width: 240rpx;
	    height: 240rpx;
	    margin: 20rpx auto 40rpx;
	    position: relative;
	}
	
	.circle-bg {
	    width: 240rpx;
	    height: 240rpx;
	    border-radius: 50%;
	    background-color: #f5f5f5;
	    position: relative;
	    overflow: hidden;
	}
	
	.circle-progress {
	    width: 120rpx;
	    height: 240rpx;
	    position: absolute;
	    top: 0;
	    left: 120rpx;
	    background-color: #0081ff;
	    transform-origin: left center;
	}
	
	.circle-progress::before {
	    content: '';
	    position: absolute;
	    width: 240rpx;
	    height: 240rpx;
	    border-radius: 50%;
	    background-color: #0081ff;
	    top: 0;
	    left: -120rpx;
	}
	
	.circle-content {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    border-radius: 50%;
	    background-color: white;
	    transform: scale(0.85);
	}
	
	.circle-percent {
	    font-size: 48rpx;
	    font-weight: bold;
	    color: #333;
	}
	
	.circle-label {
	    font-size: 24rpx;
	    color: #666;
	    margin-top: 10rpx;
	}
	
	/* 详细数据 */
	.result-stats {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    margin: 20rpx 0 30rpx;
	}
	
	.stat-item {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    padding: 0 40rpx;
	}
	
	.stat-value {
	    font-size: 40rpx;
	    font-weight: bold;
	    color: #333;
	}
	
	.text-blue {
	    color: #0081ff;
	}
	
	.stat-label {
	    font-size: 24rpx;
	    color: #666;
	    margin-top: 10rpx;
	}
	
	.stat-divider {
	    width: 2rpx;
	    height: 60rpx;
	    background-color: #eee;
	}
	
	/* 评价信息 */
	.result-comment {
	    text-align: center;
	    padding: 20rpx 0;
	    border-top: 1rpx solid #f0f0f0;
	}
	
	.comment-text {
	    font-size: 30rpx;
	    color: #666;
	}
	
	/* 操作按钮 */
	.action-buttons {
	    width: 100%;
	    display: flex;
	    flex-direction: column;
	    padding: 20rpx 30rpx;
	}
	
	.action-buttons .cu-btn {
	    margin-bottom: 20rpx;
	    height: 90rpx;
	    font-size: 32rpx;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	
	.action-buttons .cuIcon-home,
	.action-buttons .cuIcon-my {
	    margin-right: 10rpx;
	    font-size: 36rpx;
	}
	
	.margin-top {
	    margin-top: 20rpx;
	}
</style>