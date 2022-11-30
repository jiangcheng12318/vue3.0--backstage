<template>
  <div class="tags">
    <el-tag
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name!=='home'"
    :disable-transitions="false"
    :effect="$route.name === tag.name?'dark':'plain'"
    @click="changeMenu(tag)"
    round
     >{{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    const tags = store.state.tabsList;
    const changeMenu = (item)=>{
      router.push({name: item.name})
    };

    return {
      tags,
      changeMenu,
    }
  }
}
</script>

<style lang="less" scoped>
.tags{
  padding: 2px 10px  10px;
  width:100%;
  cursor: pointer;
  .el-tag{
    margin-right:10px;
    margin-top: 0;

  }
}
</style>