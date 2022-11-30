<template>
  <div class="tags">
    <el-tag
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name!=='home'"
    :disable-transitions="false"
    :effect="$route.name === tag.name?'dark':'plain'"
    round
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import router from "../router/index.js";
import store from "../store/index.js";
import route from "mockjs";

export default {
  name: "CommonAside",
  data() {
    return {
      tags: store.state.tabsList,//都不用计算属性了
    }
  },
  methods: {
    changeMenu(x) {
       return router.push({name:x.name});
    },
    handleClose(tag,index){
      //一开始没有加this，导致报错，其次黄色属性值表示没有取到data选项里的值
      let length = this.tags.length-1;
      //处理tabsList的值
      store.commit("closeTab",tag);
      //做一个判断
      if(this.tags.name!==route.name){
        return ;
      }
      if(index === length){

        return  router.push({
          name:this.tags[index-1].name
        })
      }
    }
  },
  mounted() {
    //setTimeout(()=>console.log(JSON.stringify(store.state)),10000);
  },
}
</script>

<style lang="less" scoped>
.tags{
  padding: 4px 10px 2px 10px;
  width:100%;
  }
.el-tag{
     margin-right:10px;
     margin-top: 0;
     cursor: pointer;
}
.el-tag:hover{
  transform: scale(1.1);
  transition:all 0.3s ease-in-out;
}
</style>