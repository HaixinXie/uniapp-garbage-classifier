<template>
	<view class="my-container">
		<MyUserinfo v-if="isLogin"></MyUserinfo>
		<MyLogin v-else></MyLogin>
		<!-- <MyLogin></MyLogin> -->
	</view>
</template>

<script>
	import MyLogin from '@/components/MyLogin/MyLogin.vue';
	import MyUserinfo from '@/components/MyUserinfo/MyUserinfo.vue';
	import { useUserStore } from "@/stores";
	export default {
		data() {
			return {
				isLogin: true
			}
		},
		created() {
		    // 在组件创建时，从 Pinia 中获取登录状态
		    const userStore = useUserStore();
		    // 根据 store 中的 token 或 hasToken() 方法判断
		    this.isLogin = userStore.hasToken(); // 假设 hasToken() 返回布尔值
		}
	};
</script>

<style lang="scss">
		
	page, .my-container {
		height: 100%;
	}

</style>
