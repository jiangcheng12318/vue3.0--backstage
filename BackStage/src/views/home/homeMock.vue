//用于从mock获取数据
<template>
  <el-row class="home" :gutter="20">
    <el-col :span="10"
    >
      <el-card shadow="hover" class="left-card">
        <div class="user">
          <img src="../../assets/Me.jpg" alt=""/>
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
      <el-card shadow="hover" height="450px" style="margin-top:20px;">
        <el-table :data="tableData" stripe>
          <el-table-column
              v-for="(value,key) in tableLabel"
              :key="key"
              :prop="key"
              :label="value">
            <!--column按列来排，label连接表头，即各列名称，prop依据key绑定tableData中的数据，然后一列排下来-->
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="margin-top: 20px;" height="320px;">
      </el-card>
    </el-col>
    <el-col :span="14"   class="right-card">
      <div class="num">
        <el-card
            shadow="hover"
            :body-style="{display:'flex',padding: 0}"
            :index="item.name"
            v-for="item in countData"
            :key="item.name"
        >
          <component
              class="icons"
              :is="item.icon"
              :style="{background: item.color}"
          ></component>
          <div class="details">
            <p class="price">￥{{ item.value }}</p>
            <p class="title">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px" shadow="hover">
        <div ref="echart" style="height:280px">
        </div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height:240px" id="userEchart"></el-card>
        <el-card shadow="hover" style="height:240px" id="videoEchart"></el-card>
      </div>
    </el-col>

  </el-row>
</template>

<style lang="less" scoped>
.left-card,
.right-card{
  margin-top:0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.user {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: auto;
    border-radius: 50%;
    margin-right: 40px;
  }
}

.login-info {
  p {
    line-height: 30px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.user-info {
  margin-top: 50px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.icons {
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.details {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
  }

  .price {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .title {
    text-align: center;
    color: #999;
  }
}
.graph{

  .el-card{
   margin-top:20px;

  }
}

</style>
<script>
import * as echarts from "echarts";

export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销售量",
        monthBuy: "月销售量",
        totalBuy: "总销售量"
      },
      countData: [],
      xOptions: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },
      pieOptions: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      orderData: {
        xData: [],
        series: [],
      },
      userData: {
        xData: [],
        series: [],
      },
      videoData: {
        series: [],
      }
    }
  },
  methods: {
    async getTableList() {
      //console.log(res);
      this.tableData = await this.$api.getTableData();
    },
    async getCountList() {
      this.countData = await this.$api.getCountData();
    },
    async getChartList() {
      const result = await this.$api.getChartData();
      //console.log(result);//result为一个包括userdata,order-data,video-data的对象
      let res = result.orderData;//此处注意传入mock的数据中，code==200,且data|7之间不能有空格
      let userRes = result.userData;
      //折线图开始赋值
      this.orderData.xData = res.date;
      const keyArray = Object.keys(res.data.datda[0]);
      const series = [];
      keyArray.forEach((key)=>
      {//forEach的结果是无法返回的，但对其操作可以
        series.push({
          name:key,
          data:res.data.datda.map(item =>item[key]),//对每一个key都把值遍历进去，有点麻烦，其实filter也可以吧？
          type:"line",
        })
      });
      //将定义的series赋值给orderData
      this.orderData.series = series;
      this.xOptions.xAxis.data = this.orderData.xData;
      this.xOptions.series = this.orderData.series;
      //折线图渲染
      let hEcharts = echarts.init(this.$refs["echart"]);
      hEcharts.setOption(this.xOptions);

      //柱状图
      this.userData.xData = userRes.map((item)=>item.date);
      this.userData.series =[

        {
          name:"活跃用户",
          data:userRes.map(item => item.active),
          type:'bar',//柱状图
        },
        {
          name:"新增用户",
          data:userRes.map(item => item.new),
          type:'bar',
        }

      ];
      this.xOptions.xAxis.data = this.userData.xData;
      this.xOptions.series = this.userData.series;
      //柱状图渲染
      let uEcharts = echarts.init(document.getElementById("userEchart"));
      //let uEcharts = echarts.init(this.$refs["userecharts"]) 报错，在echarts渲染中只能使用dom寻找
      uEcharts.setOption(this.xOptions);

      //饼状图
      this.videoData.series =[
        {
          data: result.videoData,
          type: "pie"
        }
      ];
      this.pieOptions.series = this.videoData.series;
      let pEcharts = echarts.init(document.getElementById("videoEchart"));
      pEcharts.setOption(this.pieOptions);

    }
  },
  mounted() {
    this.getTableList();
    this.getCountList();
    this.getChartList();

  }
}
</script>
