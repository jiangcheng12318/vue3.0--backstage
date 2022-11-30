<template>
<div>我是User的组件</div>
</template>

<script>
import {defineComponent, getCurrentInstance, onMounted} from "vue";

export default defineComponent({
  setup(){
    const {proxy} = getCurrentInstance();
    onMounted(
        ()=>{
          getUserData();
        }
    );
    const getUserData = async()=>{
      let res = await proxy.$api.getUserData();
      console.log(res);
    }
  }
})
</script>

<style scoped>

</style>