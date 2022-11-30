<template>
  <el-aside :width="$store.state.isCollapse? '120px':'64px'">
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        :collapse="!$store.state.isCollapse"
        :collapse-transition="false"
    ><!--将转变设置为false，使得其无延迟时间-->
      <h3 v-show="this.$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!this.$store.state.isCollapse">后台</h3>
      <el-menu-item
          :index="item.path"
          v-for="item in noChildren()"
          :key="item.path"
          @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"/>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
          :index="item.label"
          v-for="item in hasChildren()"
          :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"/>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              :index="subItem.path"
              v-for="(subItem,subIndex) in item.children"
              :key="subIndex"
              @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"/>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>

<script>
import router from "../router/index.js";
import store from "../store/index.js";

export default {
  name: "CommonAside",
  data() {
    return {
      list: [{
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: 'Home/Home'
      },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'goods',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          path: 'other',
          icon: 'more',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }],

    }
  },
  methods: {
    noChildren() {
      return this.list.filter(
          (item) => !item.children
      )
    },
    hasChildren() {
      return this.list.filter(
          (item) => item.children
      )
    },
    clickMenu(x) {
      store.commit('selectMenu',x);
      return router.push({
        name: x.name,
      })
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  line-height: 48px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}

.el-menu {
  border-right: none;
}

.icons {
  width: 18px;
  height: 18px;
}
</style>