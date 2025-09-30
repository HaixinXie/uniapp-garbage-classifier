
import axios from "axios"
import type { AxiosAdapter, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import mpAdapter from "axios-miniprogram-adapter";
import { useUserStore } from "../stores";
axios.defaults.adapter = mpAdapter as any
 
interface Result<T = any> {
  code: number | string;
  msg: string;
  data: T;
};
 
declare module 'axios' {
  //如遇到request()方法里的retuen报类型错误，放开这段注释采用这种形式定义返回类型,将上方的Result接口注释
  interface AxiosResponse<T = any> {
    code: number | string;
    msg: string;
    data: T;
  }
  type Result<T = any> = AxiosResponse<T>;
}
 
 const baseUrl = "http://1.92.146.66:5000/api"
 
// 导出Request类，可以用来自定义传递配置来创建实例
class HttpRequest {
  baseURL: string;
  timeout: number;
 
  constructor() {
    this.baseURL = baseUrl;
    this.timeout = 10000;
  }
 
  request<T = any>(options: AxiosRequestConfig): Promise<Result<T>> {
    // axios 实例
    const instance: AxiosInstance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }
 
  get<T = any>(url: string, data?: any, outHeaders = {}): Promise<Result<T>> {
    return this.request<T>({
      method: 'get',
      url,
      params: { ...data }, // get参数可以直接展开
      headers: {}
    })
  }
 
  post<T = any>(url: string, data = {}, headers = {}) {
    return this.request<T>({
      method: 'post',
      url,
      data, // 直接传递数据
      headers
    });
  }
  mergeOptions(options: AxiosRequestConfig) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
  }
  // 设置拦截器
  setInterceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // uni.showLoading({
      //   title: '加载中...',
      //   mask: true
      // });
	  const userStore = useUserStore();
	  if(userStore.hasToken()){
		  const token = userStore.token;
		    if (token) {
		  	config.headers.Authorization = `Bearer ${token}`;
		  }
	  }
 
      return config;
    },
      (err: any) => {
        console.log(err, '请求拦截报错');
        uni.hideLoading();
        return Promise.reject(err);
      })
 
    // 响应拦截器
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log("返回信息",res);
        uni.hideLoading();
        let { status, data } = res;
        if (status === 200) {
          return data
        } else {
		  console.log('status错误：', status);
        }
      },
      err => {
        console.log('axios报错', err)
        uni.hideLoading(); // 立即关闭加载框
        return Promise.reject(err)
      }
    )
  }
}
// 默认导出Request实例
export default new HttpRequest()