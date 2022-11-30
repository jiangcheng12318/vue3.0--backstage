import {createStore} from 'vuex';

export default createStore(
    {
        state:{
            isCollapse: true,
            currentMenu: null,
            tabsList:[
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 'house',
                    url: 'Home/Home'
                },
            ]
        },
        mutations:{
            updateIsCollapse(state,payload){
                state.isCollapse = !state.isCollapse;
            },
            selectMenu(state,val){
                //val.name === 'home'? (state.currentMenu = null):(state.currentMenu = val)
                if(val.name==='home'){
                    state.currentMenu = null
                }else{
                    state.currentMenu = val;
                    const result = state.tabsList.findIndex(item =>item.name===val.name);
                    result===-1?state.tabsList.push(val):''//点击增加tab标签
                }
            },
            closeTab(state,tag){
                let  res = state.tabsList.findIndex(item => item.name===tag.name);//找到索引值
                state.tabsList.splice(res,1);//不起作用
            }
        },
    }
)