<script lang="ts">
import { useUserStore } from '@/stores'; // 依据项目路径进行调整
import { login } from '@/api/login/login.ts';
import { LoginRequest } from "./types/loginrequest";
import { UserInfo } from './types/userinfo';
	export default {
		globalData: {
			selected: 0
		},
		onLaunch: function() {
			console.log('App Launch');
			const userStore = useUserStore();
			if (!userStore.hasProfile()) {
			  this.handleLogin(); // 调用自定义方法
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		// 新增：自定义方法
		  methods: {
		    // 处理登录逻辑
		    handleLogin() {
		      uni.login({
		        success: (res) => {
		          if (res.errMsg === "login:ok") {
		            const code = res.code;
		            // console.log('获取登录 code:', code);
					const loginData: LoginRequest = {
					  code // 替换为实际的授权码
					};
		            this.requestUserInfo(loginData); // 调用获取用户信息的方法
		          }
		        },
		        fail: (err) => {
		          console.error('登录失败:', err);
		        }
		      });
		    },
		   // 使用 code 请求用户信息
		   async requestUserInfo(loginData: LoginRequest) {
		     try {
		       const res = await login(loginData); // 假设 login 接口接收 code
			   // console.log(res);
		       const { token, nickname, avatar } = res.data;
		       
		       // 存储用户信息到 store
		       const userStore = useUserStore();
		   	
		       userStore.setToken(token);
			   // console.log(userStore.token)
			   
			   const partialUser: UserInfo = {
			   	nickname,
			   	avatar
			   };
			   userStore.setProfile(partialUser);
		       
		       // console.log('用户信息获取成功');
		     } catch (error) {
		       console.error('获取用户信息失败:', error);
		     }
		   } 
		    
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

