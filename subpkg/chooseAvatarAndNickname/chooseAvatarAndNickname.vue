<template>
	<view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="avatar"></image>
    </button> 
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="nickname" placeholder="请填写昵称" v-model="nickname" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button @tap="onSubmit" class="form-button">保 存</button>
    </view>
  </view>
</template>

<script lang='ts'>
import { UsernameRequest } from "../../types/username"; 
import { useUserStore } from '@/stores'
import { updateUsername } from '@/api/updateUsername/updateUsername.ts'

export default {
  // 响应式数据
  data() {
    return {
      // 头像url
	  avatar: "",
	  // 昵称
	  nickname: "",
      // 安全区域距离
      safeAreaInsets: uni.getSystemInfoSync().safeAreaInsets
    }
  },
  created() {
	const userStore = useUserStore();
  	this.avatar = userStore.profile.avatar;
	this.nickname = userStore.profile.nickname;
  },

  // 方法
  methods: {

    // 修改头像
    onChooseAvatar(e) {
		const { avatarUrl } = e.detail;
		uni.getFileInfo({
		  filePath: avatarUrl, // 这里传 chooseavatar 拿到的临时路径
		  success: (res) => {
		        const fileSize = res.size; // 单位：字节
		        const maxSize = 2 * 1024 * 1024; // 2MB
		  
		        if (fileSize > maxSize) {
		          uni.showToast({
		            title: "图片不能超过2MB",
		            icon: "none"
		          });
				  console.log("图片超过2mb");
		          return;
		        }
				const userStore = useUserStore();
				const token = userStore.token;
		        // ✅ 文件符合要求，可以上传
		        uni.uploadFile({
		        	url: 'http://1.92.146.66:5000/api/upload-avatar',
		        	name: 'avatar',
		        	filePath: avatarUrl,
		        	fileType: 'image',
		        	header: {
		        		'Authorization': `Bearer ${token}`, // 常见格式：Bearer + 空格 + token
		        	},
		        	success: (res) => {
		        	  if (res.statusCode === 200) {
		        		try {
		        		  const data = JSON.parse(res.data);   // 把字符串转成对象
		        		  console.log("完整返回数据:", data);
		        	
		        		  if (data.code === 200 && data.avatar) {
							userStore.updateProfileField("avatar", data.avatar);
							this.avatar = data.avatar;
		        		  } else {
		        			uni.showToast({ icon: 'none', title: '未更新头像' });
		        		  }
		        		} catch (e) {
		        		  console.error("解析 JSON 失败", e);
		        		  uni.showToast({ icon: 'none', title: '返回数据异常' });
		        		}
		        	    // uni.showToast({ icon: 'success', title: '更新成功' });
		        	  } else {
		        	    // uni.showToast({ icon: 'error', title: '出现错误' });
		        	  }
		        	},
		        	fail: (err) => {
		        		console.error('上传图片失败', err);
		        		uni.showToast({
		        		  title: '上传图片失败',
		        		  icon: 'none'
		        		});
		        	}
		        })
		      },
		      fail: (err) => {
		        console.error("获取文件信息失败", err);
		      }
		});
    },

    // 提交表单
    async onSubmit() {
      // 更新Store昵称
	  try {
		const usernameRequest: UsernameRequest = {
			username: this.nickname
		}
	    await updateUsername(usernameRequest);
	    const userStore = useUserStore();
	    userStore.profile.nickname = this.nickname;
		uni.showToast({ icon: 'success', title: '保存成功' });
	  } catch (error) {
	    console.error('更新昵称失败:', error);
	  }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar-wrapper {
  padding: 0;
  width: 70px !important;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.avatar {
  display: block;
  width: 70px;
  height: 70px;
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
	align-items: center;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
