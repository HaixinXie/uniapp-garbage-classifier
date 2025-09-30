<template>
	<view class="exam-container">
		<!-- 顶部标题栏 -->
		<view class="exam-header">
			<text class="exam-title">垃圾分类知识考试</text>
			<text class="exam-subtitle">提升环保意识 · 从答题开始</text>
		</view>

		<!-- 功能卡片 -->
		<view class="exam-content">
			<navigator class="exam-item start" url="/subpkg/exam/exam">
				开始考试
			</navigator>
			<view class="exam-item rules" @click="reviewExamRules">
				考试规则
			</view>
			<navigator class="exam-item rank" url="/subpkg/leaderboard/leaderboard">
				查看排行榜
			</navigator>
		</view>

		<!-- 提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog 
				type="info" 
				cancelText="关闭" 
				confirmText="确定" 
				title="考试规则" 
				content="1. 考试限时 30 分钟\n2. 答题过程中不能返回修改\n3. 满分 100 分，60 分及格\n4. 每次考试成绩将计入排行榜"
			/>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		methods:{
			reviewExamRules(){
				this.$refs.alertDialog.open()
			}
		}
	}
</script>

<style lang="scss">
.exam-container {
	height: 100vh;
	background: linear-gradient(180deg, #e0f7fa, #ffffff);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx 30rpx;
	box-sizing: border-box;
}

/* 顶部标题 */
.exam-header {
	text-align: center;
	margin-bottom: 60rpx;
}
.exam-title {
	font-size: 52rpx;
	font-weight: bold;
	color: #0077cc;
}
.exam-subtitle {
	display: block;
	font-size: 28rpx;
	color: #666;
	margin-top: 12rpx;
}

/* 功能卡片区 */
.exam-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 40rpx;
}

/* 卡片按钮 */
.exam-item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100rpx;
	font-size: 34rpx;
	font-weight: bold;
	color: #fff;
	border-radius: 16rpx;
	box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease-in-out;
}

/* 点击缩放效果 */
.exam-item:active {
	transform: scale(0.96);
}

/* 按钮配色 */
.start {
	background: linear-gradient(135deg, #42a5f5, #1e88e5);
}
.rules {
	background: linear-gradient(135deg, #66bb6a, #43a047);
}
.rank {
	background: linear-gradient(135deg, #ffca28, #f57c00);
}
</style>
