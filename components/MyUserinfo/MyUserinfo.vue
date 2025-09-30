<template>

	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image :src="userStore.profile.avatar" class="avatar"></image>
			<view class="nickname">
				{{ userStore.profile.nickname }}
			</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item" @click="handleSignIn">
					  <image src="/static/my/signin.png" class="icon"></image>
					  <text>签到</text>
					</view>
					<navigator url="/subpkg/points/points" open-type="navigate">
					  <view class="panel-item">
					    <image src="/static/my/Integral.png" class="icon"></image>
					    <text>积分</text>
					  </view>
					</navigator>
					<navigator url="/subpkg/recognitionRecord/recognitionRecord" open-type="navigate">
						<view class="panel-item">
							<image src="/static/my/picture.png" class="icon"></image>
							<text>识别记录</text>
						</view>
					</navigator>
					<navigator url="/subpkg/examRecords/examRecords" open-type="navigate">
						<view class="panel-item">
							<image src="/static/my/exam.png" class="icon"></image>
							<text>考试记录</text>
						</view>
					</navigator>
				</view>
			</view>
			
			<view class="panel">
				<navigator class="panel-list-item" url="/subpkg/chooseAvatarAndNickname/chooseAvatarAndNickname">
					<text>修改头像昵称</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</navigator>
				<navigator class="panel-list-item" url="/subpkg/bindSchoolClass/bindSchoolClass">
					<text>绑定学校班级</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</navigator>
				<view class="panel-list-item">
					<text>关于我们</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang='ts'>
import { addPoints } from '@/api/addPoints/addPoints.ts';
import { AddPointsRequest } from "../../types/points";

	import { useUserStore } from "@/stores";
	
	export default {
		name:"MyUserinfo",
		data() {
			return {
				
			};
		},
		computed: {
			// 将 userStore 注册为计算属性
			userStore() {
			  return useUserStore();
			}
		},
		methods: {
			async handleSignIn() {
			  // 构造请求参数
			  const params: AddPointsRequest = {
				type: 'sign',   // 这里根据后台要求写签到类型
				points: 50       // 可以自定义签到获得的积分
			  };
		
			  try {
				const res = await addPoints(params);
				console.log(res)
				if (res?.data?.issigned) {
				  // 今天已经签到
				  uni.showToast({
					title: '今天已经签到过了',
					icon: 'none'
				  });
				} else {
				  // 签到成功
				  uni.showToast({
					title: '签到成功',
					icon: 'success'
				  });
				}
			  } catch (error) {
				console.error('签到失败', error);
				uni.showToast({
				  title: '签到失败，请重试',
				  icon: 'none'
				});
			  }
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #f4f4f4;
	.top-box{
		height:500rpx;
		background-color: #389bff;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		
		.nickname{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	
	.panel-list{
		padding: 0 10px;
		position: relative;
		top: -10px;
		.panel{
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 8px;
			
			.panel-body{
				display: flex;
				justify-content: space-around;
				
				.panel-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;
					
					.icon{
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}
}
.panel-list-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	padding: 0 15px;
	line-height: 45px;
}
</style>