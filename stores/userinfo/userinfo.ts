import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserInfo } from '../../types/userinfo';

// 定义 store
export const useUserStore = defineStore(
	'user', 
	() => {
		const profile = ref<UserInfo>();
		const token = ref<string>();
		
		const setProfile = (val: UserInfo) => {
			profile.value = val;
		};
		
		const setToken = (val: string) => {
			token.value = val;
		};
		
		// 检查 profile 是否非空
		const hasProfile = () => {
		  return !!profile.value;
		};
		const hasToken = () => {
		  return !!token.value;
		};
		
		const updateProfileField = <K extends keyof UserInfo>(key: K, value: UserInfo[K]) => {
		  if (profile.value) {
		    profile.value[key] = value
		  } else {
		    profile.value = { [key]: value } as UserInfo // 如果没值就新建
		  }
		};
		
		return {
			profile,
			token,
			setProfile,
			hasProfile,
			setToken,
			hasToken,
			updateProfileField
		}
	},
	{
		persist: {
			storage: {
				getItem(key) {
					return uni.getStorageSync(key);
				},
				setItem(key, value) {
					return uni.setStorageSync(key, value);
				}
			}
		}
	}
)