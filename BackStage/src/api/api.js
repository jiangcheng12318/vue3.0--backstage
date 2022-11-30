/**
 * 整个项目api的管理
 *
 */
import request from "./request.js";
export default{
    //home组件
    getTableData(params) {

    return request({
        url:'/home/getData',
        method: 'get',
        data: params,//
        mock: true

    })
    },
    getCountData(){//不需要传入特殊的参数
        return request({
            url:'/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    getChartData() {
        return request({
            url:'/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    getUserData(params){
        return request({
            url:'/user/getUser/',
            method: 'get',
            mock: false,
            data: params
        })
    },
    addUser(params){
        return request({
            url:'/user/addUser/',
            method: 'post',
            mock: false,
            data: params
        })
    },
    editUser(params){
        return request({
            url:'/user/editUser/',
            method: 'post',
            mock: false,
            data: params
        })
    },
    deleteUser(params){
        return request({
            url:'/user/deleteUser/',
            method: 'get',
            mock: false,
            data: params
        })
    }
}