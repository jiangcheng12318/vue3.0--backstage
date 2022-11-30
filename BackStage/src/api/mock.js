import Mock from 'mockjs';
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'
//拦截请求
Mock.mock('/home/getData',homeApi.getHomeData)

//从本地获取user的数据,拦截
Mock.mock(/user\/getUser/,'get',userApi.getUserList);
Mock.mock(/user\/addUser/,'post',userApi.createUser);
Mock.mock(/user\/editUser/,'post',userApi.updateUser);
Mock.mock(/user\/deleteUser/,'get',userApi.deleteUser);