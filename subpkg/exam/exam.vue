<template>
	<view>
		<view class="result-tt-top" :style="'padding-top:' + tophight+'px;'">
			<view class="page-title-wrap">
				<!-- <text @click="fanhui" class="iconfont icon-fanhui1 fanhui-icon">这个</text> -->
				<text>在线答题</text>
			</view>
		</view>	
		<!-- 考试答题区 -->
		<view class="zhe">	
			<view class="dangbiao">
				<image class="dangbiao-img" src="/static/exam/question_above.png" mode="aspectFill"></image>
			</view>
		 <block v-if="tiList[current] != undefined">	
			<!-- 题目类型数量 -->
			<view class="zhe-type">
				<view class="zhe-type-left">
					<text class="zhe-title font_30" v-if="tiList[current].type == '1'">单选题</text>
				</view>
				<view>
					<text class="current-ti-num">{{currentQid}}</text>
					<text class="current-ti-all-num">/{{tiList.length}}</text>
				</view>
			</view>
			
			
			<!-- 题目区 -->
			<scroll-view class="scroll-view" scroll-y="true" :style="'height:' + scrollH+'rpx;'">
				
					<view class="que-content color_32 font_30">
						{{tiList[current].title}}
					</view>
					<!-- 选项 -->
					<view class="option-list">
					
					<!-- 单选题 -->
					<block v-if="tiList[current].type == '0'">
							
						  <block v-for="(item, index) in optionList" :key="index">
									
								<block v-if="user_answer.ti_data[current] != 'is_end'">
									<view class="option-item" @click="checkDanxuan(index)">
										{{ti_info_abc[index]}}.{{item}}
									</view>
								</block>
								<!-- 做完此题了 -->
								<block v-else>
									<!-- 做对了 只有作对的题变粉色 其他不变  -->
									<block v-if="right_cuo[current] == '1'">
										<block v-if="tiList[current].answer == index">
											<view class="option-item optionright">
												<image class="duicuo-img" src="/static/exam/duihao.png"
													mode="aspectFill"></image>
												{{ti_info_abc[index]}}.{{item}}
											</view>
										</block>
										<block v-else>
											<view class="option-item">
												{{ti_info_abc[index]}}.{{item}}
											</view>
										</block>
									</block>
									<!-- 做错了 做错选项加叉号 正确答案变色 -->
									<block v-else>
										<!-- 是正确答案,但是用户没选 -->
										<block v-if="user_ans[tiList[current].id] == index">
											<view class="option-item optionwrong">
												<image class="duicuo-img" src="/static/exam/cuohao.png"
													mode="aspectFill"></image>
													{{ti_info_abc[index]}}.{{item}}
											</view>
										</block>
										<block v-else-if="tiList[current].answer == index">
											<view class="option-item optionright">
												<image class="duicuo-img" src="/static/exam/duihao.png"
													mode="aspectFill"></image>
												{{ti_info_abc[index]}}.{{item}}
											</view>
										</block>
										<block v-else>
											<view class="option-item">
												{{ti_info_abc[index]}}.{{item}}
											</view>
										</block>
										
									</block>
									
								</block>
								
							</block>
						</block>
						
					</view>
					
			</scroll-view>
		
		 </block>
		 
		</view>
		
		<!-- 上一题下一题按钮 -->
		<view class="ti-btn-wrap">
			<text @click="checkTi('1')" class="pre-ti-btn ti-btn" :class="{check_ti :(check_ti == '1')}">上一题</text>
			<text @click="checkTi('2')" class="next-ti-btn ti-btn" :class="{check_ti :(check_ti == '2')}">下一题</text>
		</view>
	</view>
</template>

<script lang = 'ts'>
import { getQuestion } from '@/api/getQuestion/getQuestion.ts';
import { SubmitExamRequest } from "../../types/submitExam";
import { submitExam } from '@/api/submitExam/submitExam.ts';
import { addPoints } from '@/api/addPoints/addPoints.ts';
import { AddPointsRequest } from "../../types/points";

	export default {
		data() {
			return {
				start_time:0, //开始答题时间
				is_zhe_show: '0', //是否显示遮罩层
				is_zhe_top: '0', //是否显示遮罩层上半边
				is_show_result: '0',
				scrollH: 0,
				check_ti: '', //选择上一题/下一题
				tiList: [],
				optionList: [
					"可回收垃圾",
					"有害垃圾",
					"厨余垃圾",
					"其他垃圾"
				],
				current: 0, //当前页面索引
				tilist_c: {}, //当前索引试题
				currentQid: 1,
				ti_info_abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], //选择题选项
				// 存放用户每题答对答错情况
				right_cuo: [], //索引 对 1 错 0
				//用户答题数据, 对题数  错题数 题目信息
				user_answer: {
					'dui_num': 0,
					'cuo_num': 0,
					'ti_data': []
				},
				//判断题相关数据
				panduan: {
					'is_end': '0', //是否已做完此题(记入缓存使用)
				},
				user_ans: {}, //存放用户每题答案 索引 => res
				dingxiang: {
					'ans': [], //存放每次点击答案时的选项id
					'key': {
						'0': '0',
						'1': '1',
						'2': '2',
						'3': '3',
						'4': '4',
						'5': '5',
						'6': '6',
						'7': '7'
					},
					'start_check': [], //是否开始输入 控制按钮变色, 索引: '1
					//存放定项题 每个选项是否选择 索引: {a: 'is_checked', b: 'is_checked', ...}
					'abc': [], 
				},
				// 填空题相关数据
				tiankong: {
					'ans': [], //存放用户input输入的答案
					'sub': [], //是否提交 id: 是否提交 {'1' : '1', '2': '1', ...}
					'right_ans': [], //正确答案字符串 1.XX 2.XX
					'start_check': [], //是否开始输入 控制按钮变色, 索引: '1'
				},
				result: {}, //存放答题结果
				duihao: '../../static/images/tongji_duihao.png',
				cuohao: '../../static/images/tongji_cuohao.png',
				timeNums: [],//计时器 索引1:40,索引2:40,...
				tophight: 0
			}
		},
		onReady() {
			
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
					that.scrollH = res.windowHeight * 750 / res.windowWidth - 700;
					// #ifdef MP-WEIXIN
					that.scrollH = res.windowHeight * 750 / res.windowWidth - res.safeArea.top - 740;
					// #endif
				}
			});
			
			this.getTestsList();

			// #ifdef MP-WEIXIN
			this.tophight = uni.getMenuButtonBoundingClientRect().top + 8;
			// #endif
		},
		methods: {
			fanhui(){
				uni.reLaunch({
					url: '/pages/exam/exam',
				})
			},
			// 获取试题列表
			async getTestsList() {
				try {
				  const res = await getQuestion();		  
				  this.tiList = res.data;  
				} catch (error) {
				  console.error('获取题目信息失败:', error);
				}
			},
			//单选题  us: 用户选择答案
			checkDanxuan(us){
				
				let rs = this.tiList[this.current].answer;
				if (this.user_answer.ti_data[this.current] == 'is_end') {
					return;
				}
				this.setAnsCache(rs, us);
			},
			//处理用户答题数据及选项显示状态
			setAnsCache(rs, us) {
				let that = this;
				// let gData = app.globalData;
				
				// 改变此题状态为已做完 	
				that.user_answer.ti_data[that.current] = 'is_end';
				that.$set(that.user_answer.ti_data, that.current, 'is_end');
				
				// 判断和单选共用一个逻辑 	
				if (rs == us) {
					that.right_cuo[that.current] = '1';
					that.user_answer.dui_num++;
					that.$set(that.right_cuo, that.current, '1');
		
				} else {
					that.right_cuo[that.current] = '0';
					that.user_answer.cuo_num++;
					that.$set(that.right_cuo, that.current, '0');
				}
				// 存放用户答案 题目id => 答案
				that.user_ans[that.tiList[that.current].id] = us;
			},
			// 选择上一题 /下一题
			checkTi(ti_num) {
				this.check_ti = ti_num;
				//上一题
				if (ti_num == '1') {
					if(this.current == 0) {
						return;
					}
					this.current--;
					this.currentQid--;
				}
				// 下一题
				if (ti_num == '2') {
					
					// 在40秒内做完当前题才可做下一题
					if(this.user_answer.ti_data[this.current] != 'is_end') {
						uni.showToast({
							icon:'none',
							title: '请先答当前题目',
						});
						return;
					} 
						
					// 做到最后一题直接交卷
					if(this.current == (this.tiList.length -1)) {
						// 参数 用户id 试题id
						this.subTests();
						return;
					}
					this.current++;
					this.currentQid++;
					
				}
			
			},
			// 提交答案
			async subTests(){
				const score = this.user_answer.dui_num * 100 / this.tiList.length;
				const submitExamData: SubmitExamRequest = {
					score
				};
				const addPointsRequest: AddPointsRequest = {
					type: "exam",
					points: score
				}
				try {
				   const res1 = await submitExam(submitExamData);
				   const res2 = await addPoints(addPointsRequest);
				   
				   if(res1.code == 200 && res2.code == 200) {
					   uni.redirectTo({
					   	url: `/subpkg/result/result?score=${score}&right_count=${this.user_answer.dui_num}`
					   });
				   } else {
					   console.error('提交考试分数失败或者增加积分失败');
				   }
				} catch (error) {
				  console.error('提交考试分数失败或者增加积分失败:', error);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
		overflow: hidden;
	}
	
	.result-tt-top {
		background: url(/static/exam/datibeijing.jpg) no-repeat center center fixed;
		background-size: cover;
		width: 100vw;
		height: 100vh;
	}
	
	.page-title-wrap {
		height: 510rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		position: relative;
		
	}
		
	.fanhui-icon {
		position: absolute;
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		left: 6rpx;
		top: 6rpx;
	}
	/* 答题区域 */
		.zhe {
			width: 82%;
			height: calc(50vh);
			position: absolute;
			top: 0;
			bottom: 20rpx;
			left: 0;
			right: 0;
			margin: auto;
			border-radius: 12rpx;
			padding: 30rpx;
			padding-bottom: 200rpx;
			background-color: #FFFFFF;
		}
		
		.scroll-view {
			overflow: hidden;
		}
		
		.dangbiao {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			width: 110rpx;
			height: 110rpx;
			position: absolute;
			top: -55rpx;
			left: 50%;
			transform: translate(-50%);
			z-index: 999;
			background-color: #FFF;
			border: 2rpx solid #F0F0F0;
		}
		
		.dangbiao-img {
			display: inline-block;
			width: 60%;
			height: 60%;
		}
		
		.zhe-type {
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom: 2rpx solid #F0F0F0;
			margin-bottom: 40rpx;
		}
		
		.zhetop {
			background-color: #000;
			background: rgba(0, 0, 0, 0.2);
			z-index: 4999;
			position: fixed;
			top: 0rpx;
			min-height: 2000rpx;
			width: 100%;
		}
		
		
		.shu {
			display: inline-block;
			background-color: #FE5A13;
			height: 40rpx;
			width: 10rpx;
			margin-right: 14rpx;
		}
		
		.zhe-type-left {
			width: 90%;
		}
		
		.zhe-title {
			display: inline-block;
			/* width: 30%; */
			text-align: center;
			color: #FFFFFF;
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			letter-spacing: 1rpx;
			background-color: #ED292A;
		}
		
		.current-ti-num {
			font-size: 50rpx;
			font-weight: bold;
			color: #ED292A;
		}
		
		.current-ti-all-num {
			color: #ED292A;
		}
		
		.que-content {
			line-height: 45rpx;
			margin-bottom: 40rpx;
		}
		
		.option-item {
			min-height: 90rpx;
			margin-bottom: 20rpx;
			border-radius: 11rpx;
			border: 2rpx solid #F0F0F0;;
			display: flex;
			align-items: center;
			padding-left: 20rpx;
		}
		
		.ti-btn-wrap {
			height: 100rpx;
			width: 600rpx;
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			bottom: 25rpx;
		}
		
		.ti-btn {
			display: inline-block;
			width: 40%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			position: absolute;
			border-radius: 53rpx;
			border: 2rpx solid #F2F2F4;
			font-size: 30rpx;
			background-color: #ED292A;
			color: #FFFFFF;
		}
		
		.pre-ti-btn {
			left: 20rpx;
		}
		
		.next-ti-btn {
			right: 20rpx;
		}
		
		.check_ti {
			background-color: #FE5A13 !important;
			color: #FFFFFF;
		}
		
		.option-item {
			color: #707376;
		}
		
		.duicuo-img {
			margin-right: 20rpx;
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			flex-shrink: 0;
		}
		
		/* 正确答案颜色 */
		.optionright {
			background-color: rgba(0,201,0,0.1) !important;
			color: #00c900 !important;
		}
		/* 错误答案变色 */
		.optionwrong {
			background-color: rgba(237,41,42,0.1) !important;
			color: #ed292a;
		}
		
		.optionwhite {
			background-color: #FFFFFF !important;
		}
		
		
		/* 结果页 样式 */
		.top_tips{
		  background: url('http://wycs2.sdwanyue.com/wxsmall/tip.png') no-repeat;
		  background-size: 100% 100%;
		  width: 144px;
		  height: 40px;
		  position: fixed;
		  right: 0;
		  top: 2px;
		  font-size: 13px;
		  text-align: center;
		  line-height: 46px;
		  color: #fff;
		}
		.top{
		  background: url('https://dj.sdwanyue.com/uniapp/dati_bg.png') no-repeat center;
		  background-size: 100% 100%;
		  width: 100%;
		  height: 380rpx;  
		  position: absolute;
		  left: 0;
		  top: 0;
		  border-radius: 12rpx 12rpx 0 0;
		}
		
		.top_text1{
		  text-align: center;
		  color: #fff;
		  letter-spacing: 1px;
		  font-size: 20px;
		  position: relative;
		  top: 44px;
		}
		
		.top_text2{
		  color: #FF4D00;
		  text-align: center;
		  letter-spacing: 1px;
		  font-size: 35rpx;
		  margin-top: 90rpx;
		}
		
		.top_text3{
		  color: #FF4D00;
		  font-size: 52px;
		  text-align: center;
		  margin-top: 10px;  
		}
		
		
		.result-bottom {
			margin-top: 380rpx;
		}
		
		.li{
		  width: 100%;
		  height: 105rpx;
		  border-bottom: 1px solid #FBFBFB;
		  line-height: 105rpx;
		}
		
		.li_img{
		  width: 20px;
		  height: 20px;
		  margin-top: 17px;
		  margin-left: 20px;
		}
		
		.li_text{
		  margin-left: 12px;
		  color: #8D9EB7;
		  font-size: 30rpx;
		  position: relative;
		  top: -4px;
		}
		.tips{
		  color: #fff;
		  font-size: 10px;
		  margin-top: 30px;
		  text-align: center;
		  font-weight: 100;
		  letter-spacing: 1px;  
		}
		
		#back{
		  color: #707376;
		  background: #fff;
		  padding: 0;
		  height: 55px;
		  width: 90%;
		  line-height: 55px;
		  font-size: 15px;
		  letter-spacing: 1px;
		  margin-top: 30px;
		  border: 1px solid #F2F2F4;
		  font-weight: 300;
		  margin-bottom: 30px;
		}  
		
		.button_view{
		  width: 90%;
		  margin: 0 auto;
		  clear: both;
		  overflow: hidden;  
		  position: absolute;
		  bottom: 10rpx;
		}
		
		#button_view_prev{
		  float: left;
		  width:36%;
		  height: 50px;
		  line-height: 50px;
		  padding: 0;
		  color: #fff;
		  background: #487AFF;
		  border: 1px solid #F2F2F4;
		  font-weight: 300;
		  letter-spacing: 1px;
		  border: 1px solid #F2F2F4;
		}
		
		#button_view_next{
		  float: left;
		  width:47%;
		  height: 45px;
		  line-height: 45px;
		  padding: 0;
		  color: #707376;
		  background: #fff;
		  font-weight: 300;
		  letter-spacing: 1px;
		  margin-left: 2%;
		  border: 1px solid #F2F2F4;
		  text-align: center;
		}
		#button_view_getgift{
		  float: left;
		  width:47%;
		  height: 45px;
		  line-height: 45px;
		  padding: 0;
		  color: #fff;
		  background: linear-gradient(#FF6224,#FF3615);
		  border: 1px solid #F2F2F4;
		  font-weight: 300;
		  letter-spacing: 1px;
		  border: 1px solid #F2F2F4;
		  margin-left: 2%;
		  text-align: center;
		}
		
		#button_view_prev1{
		  float: left;
		  width:47.5%;
		  height: 50px;
		  line-height: 50px;
		  padding: 0;
		  color: #fff;
		  background: #487AFF;
		  border: 1px solid #F2F2F4;
		  font-weight: 300;
		  letter-spacing: 1px;
		  border: 1px solid #F2F2F4;
		}
		
		#button_view_next1{
		  float: left;
		  width:47.5%;
		  height: 50px;
		  line-height: 50px;
		  padding: 0;
		  color: #707376;
		  background: #fff;
		  font-weight: 300;
		  letter-spacing: 1px;
		  margin-left: 5%;
		  border: 1px solid #F2F2F4;
		}
		/* 确认答案按钮 */
			.ans-btn-wrap {
				margin-top: 120rpx;
				height: 60rpx;
				text-align: center;
			}
			
			.ans-btn {
				height: 100%;
				line-height: 60rpx;
				width: 170rpx;
				border-radius: 6rpx;
				display: inline-block;
				font-size: 24rpx;
				color: #969696;
				background-color: #E6E6E6;
			}
			
			.is_start_check {
				background-color: #ED292A !important;
				color: #FFFFFF;
			}
			
			/* 答案 */
			.ans {
				min-height: 80rpx;
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				background-color: #F9FBFA;
			}
			.ans-jiexi {
				margin-top: 40rpx;
			}
			
			.jiexi-content {
				min-height: 300rpx;
			}
</style>
