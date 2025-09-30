<template>
	<view>
		<view class="login-container">
			<!-- 提示登录图标 -->
			<uni-icons type = "contact-filled" size = "100" color = "#AFAFAF"></uni-icons>
			<!-- 登录按钮 -->
			<button type = "primary" class = btn-login @click="login">一键登录</button>
			<!-- 登录提示 -->
			<view class="tips-text">
				登录后可享受服务
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MyLogin",
		data() {
			return {
				
			};
		},
		methods:{
			login(){
				let code = uni.login();
				console.log(code);
				// uni.getUserProfile({
				//   desc: '用于完善用户资料', // 必须是字符串，描述用途
				//   success: (res) => {
				//     console.log(res);
				//     // 处理用户信息
				//   },
				//   fail: (err) => {
				//     console.error('获取用户信息失败', err);
				//   }
				// });
				// uni.getUserInfo({
				//   success: (res) => {
				//     console.log(res.userInfo); // 匿名信息（nickName: "微信用户"）
				//   }
				// });
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	
	&::after {
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #389bff;
	}
	
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>