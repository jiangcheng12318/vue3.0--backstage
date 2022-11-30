<template>
  <el-row class="home" :gutter="20">
    <el-col :span="10" style="margin-top: 20px"
    >
    <el-card shadow="hover">
      <div class="user">
        <img src="../../assets/Me.jpg" alt="" />
        <div class="user-info">
        <h2 class="name">Admin</h2>
        <p class="role">管理员</p>
        </div>
      </div>
      <div class="login-info">
        <p>上次登录时间：<span>2022</span></p>
        <p>上次登录地点：<span>北京</span></p>
      </div>
    </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData" >
        <el-table-column
        v-for="(value,key) in tableLabel"
        :key="key"
        :prop="key"
        :label="value">
         <!--column按列来排，label连接表头，即各列名称，prop依据key绑定tableData中的数据，然后一列排下来-->
        </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="14" style="margin-top: 20px"></el-col>
  </el-row>
</template>

<style lang="less" scoped>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.user{
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img{
    width: 150px;
    height: auto;
    border-radius: 50%;
    margin-right: 40px;
  }
}
.login-info{
  p{
    line-height: 30px;
    font-size: 14px;
    color: #999;
    span{
      color: #666;
      margin-left: 60px;
    }
  }
}
</style>
<script>
export default {
  name: "Home",
  data() {
    return {
      tableData:[
      {
        name: 'oppo',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: 'vivo',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '苹果',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '小米',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '三星',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '魅族',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      }
    ],
      tableLabel:{
        name: "品牌",
        todayBuy: "今日销售量",
        monthBuy: "月销售量",
        totalBuy: "总销售量"
      },
    }
  }
}
</script>
