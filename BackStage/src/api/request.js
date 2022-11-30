import axios from "axios";
import config from "../config/index.js";
import {ElMessage} from 'element-plus'
const NETWORK_ERROR = "网络请求异常……"
//创建一个axios实例对象

const service = axios.create({
    baseURL: config.baseApi
})
//在请求之前做一些事情

service.interceptors.request.use(
    (req)=>
        //可以定义header
    //jwk-token认证的时候
{
    return req
}
)
//在请求之后做一些事情

service.interceptors.response.use((res)=>{
    const {code,data,msg} =res.data
    //根据后端协商的情况而言
    if(code===200){
        return data
    }else{
        //网络请求错误
        ElMessage.error(msg||NETWORK_ERROR)
        return Promise.reject(msg||NETWORK_ERROR)
    }
})

//封装的核心函数
function request(options){
    //对象
    /*
    options={
     methods:
     params:
     data:
     mock:
     }
     */
    options.method = options.method ||'get'
    if(options.method.toLowerCase()==='get'){
        options.params = options.data
    }
    //对mock的处理
    let isMock = config.mock;
    if(typeof options.mock !=='undefined'){
        isMock = options.mock//方便自己传入修改的mock
    }
    //对线上环境做处理
    if(config.env === 'prod'){
        //禁止线上环境使用mock
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock? config.mockApi:config.baseApi
    }
    return service(options)
}

export default request