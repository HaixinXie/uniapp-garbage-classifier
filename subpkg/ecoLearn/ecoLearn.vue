<template>
  <view class="container">
    <!-- 知识卡片 -->
    <view class="card">
      <text class="title">🌍 今日环保小知识</text>
      <text class="content">{{ knowledge }}</text>
    </view>

    <!-- 互动问答 -->
    <view class="qa-section">
      <view 
        v-for="(msg, index) in messages" 
        :key="index" 
        class="msg" 
        :class="msg.role"
      >
        <text>{{ msg.text }}</text>
      </view>
    </view>

    <!-- 输入框 -->
    <view class="input-box">
      <input v-model="userInput" placeholder="请输入环保问题..." />
      <button class="send-btn" @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script lang='ts'>
import { LLMRequest } from "../../types/llm"
import { llmAnswer } from"@/api/llmAnswer/llmAnswer.ts"

export default {
  data() {
    return {
      knowledgeList: [
        "废旧电池属于有害垃圾，不能随意丢弃。",
        "塑料瓶属于可回收垃圾，建议清洗后投放。",
        "节约用电可以减少碳排放，从小事做起。",
        "多使用公共交通，有助于减少空气污染。"
      ],
      knowledge: "",
      userInput: "",
      messages: []
    };
  },
  created() {
    const randomIndex = Math.floor(Math.random() * this.knowledgeList.length);
    this.knowledge = this.knowledgeList[randomIndex];
  },
  methods: {
    async sendMessage() {
	  if (!this.userInput) return;

	  // 1. 先把用户消息 push 进消息列表
	  this.messages.push({ role: "user", text: this.userInput });

	  const question = this.userInput;
	  this.userInput = ""; // 清空输入框

	  try {
		// 2. 调用接口
		const payload: LLMRequest = { text: question };
		const res = await llmAnswer(payload);
		console.log(res)
		if (res && res.data) {
		  // 3. 把大模型的回答 push 进消息列表
		  this.messages.push({
			role: "ai",
			text: "🤖 " + res.data.answer
		  });
		} else {
		  this.messages.push({
			role: "ai",
			text: "🤖 抱歉，大模型暂时没有返回答案。"
		  });
		}
	  } catch (error) {
		console.error("llmAnswer 调用失败:", error);
		this.messages.push({
		  role: "ai",
		  text: "🤖 出错啦，请稍后再试。"
		});
	  }
	}
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f6f9f7;
  padding: 20rpx;
  box-sizing: border-box;
}

/* 卡片 */
.card {
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.1);
}
.title {
  display: block;     /* 让标题独占一行 */
  font-weight: bold;
  font-size: 34rpx;
  margin-bottom: 16rpx;
  color: #2e7d32;
}

.content {
  display: block;     /* 让内容独占一行 */
  font-size: 28rpx;
  color: #444;
}

/* 问答区 */
.qa-section {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  overflow-y: auto;
  box-shadow: inset 0 0 6rpx rgba(0,0,0,0.05);
  margin-bottom: 20rpx;
}
.msg {
  max-width: 70%;
  padding: 16rpx 20rpx;
  border-radius: 18rpx;
  margin: 12rpx 0;
  word-wrap: break-word;
  font-size: 28rpx;
}
.user {
  align-self: flex-end;
  background: #d1ecf1;
  color: #0c5460;
  margin-left: auto;
  border-bottom-right-radius: 4rpx;
}
.ai {
  align-self: flex-start;
  background: #e2f0cb;
  color: #1b5e20;
  margin-right: auto;
  border-bottom-left-radius: 4rpx;
}

/* 输入框 */
.input-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  padding: 12rpx;
  border-radius: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}
input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 28rpx;
  padding: 12rpx 20rpx;
}
.send-btn {
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: #fff;
  border-radius: 24rpx;
  padding: 10rpx 28rpx;
  font-size: 28rpx;
  margin-left: 12rpx;
}
</style>
