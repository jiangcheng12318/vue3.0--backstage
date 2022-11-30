<template>
  <el-header>
    <div class="left-content">
      <!--这是图标的展示-->
      <el-button size="small" @click="handleCollapse">
        <el-icon>
          <Menu/>
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
      <span>
    <img class="user" src="../assets/Me.jpg" alt="">
     </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "Common",
  methods: {
    handleCollapse() {
      //使用store.commit去提交改变state的状态
      store.commit('updateIsCollapse')//选项式api在根组件中定义过后可以直接以this.$elem调用，无需再去引入方法了
    }
  },
  computed:{
    current(){
      return store.state.currentMenu;
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  color: #fff;
}

.el-button {
  margin: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #444; //444相较于333视觉攻击性要弱一点
}

.left-content {
  display: flex;
  align-items: center;
}

.right-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
:deep(.bread  span){
  color:#fff !important;
  cursor:pointer !important;
}

</style>