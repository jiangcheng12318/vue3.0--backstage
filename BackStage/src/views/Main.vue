<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <CommonAside/>
      <el-container>
        <el-header>
          <CommonHeader/><!--替换为子组件-->
        </el-header>
        <CommonTab />
        <el-main calss="right-main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab1.vue";

export default {
  name: "Main",
  components: {
    CommonHeader, CommonAside,CommonTab
  }
}
</script>

<style lang="less" scoped>
header {
  padding: 0;
}
.el-container{
  height:100%;
}
.common-layout {
  height: 100%;
  .right-main{
    height:calc(100% - 90px);
  }
  & > .el-container {
    height: 100%;

    & > .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
</style>