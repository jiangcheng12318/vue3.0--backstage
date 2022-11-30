<template>
  <div class="user-header">
    <el-button type="primary" @click="addUser">
      +新增
    </el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table"
  >
    <el-table :data="list" style="width: 100%; height: 100%">
      <el-table-column
          v-for="item in tableLabel"
          :key="item.model"
          :label="item.label"
          :prop="item.model"
          :width="item.width? item.width:125"
          header-align="center"
          align="center"
      />
      <!--align使得表格内容居中对齐-->
      <el-table-column fixed="right" label="操作" min-width="180">
        <!--此处的scope是为什么？-->
        <!--以下为打印scope所得到的store值
        {store: {…}, _self: {…}, column: {…}, row: Proxy, $index: 0, …}
        $index: 0
        cellIndex: 5
        column:{order: '', id: 'el-table_1_column_6', type: 'default', property: undefined, align: null, …}
        expanded:false
        row:Proxy {id: '5ccDebb3-F4F6-1eba-c12c-68cDfBedeB1E', name: '曾伟', addr: '上海 上海市 宝山区', age: 26, birth: '2017-11-23', …}
        store:{ns: {…}, assertRowKey: ƒ, updateColumns: ƒ, scheduleLayout: ƒ, isSelected: ƒ, …}
        _self:{uid: 89, vnode: {…}, type: {…}, parent: {…}, appContext: {…}, …}
        [[Prototype]]:Object
        -->
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑<!--scope.row为表格数据-->
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        small
        background
        layout="prev, pager, next,total"
        :total="config.total"
        class="mt-4"
        @current-change="handleCurrentChange"
        :page-size="9"
        :page-sizes="[9,10,12,15]"
    />
  </div>
  <div>
    <el-dialog
        v-model="dialogVisible"
        :title="action === 'add'? '新增用户':'编辑用户'"
        width="45%"
        :before-close="handleClose"
    >
      <el-form :inline="true" :model="formUser" ref="userForm"
               :rules="rules" label-position="right" label-width="80px">
        <!--设置第一排的输入格式，与config传输的数据进行绑定-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formUser.name" placeholder="姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <!--因为返回的数值为字符串类型，所以加个.number转变为数字类型-->
              <el-input v-model.number="formUser.age" placeholder="年龄"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--第二行的书写-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="formUser.sex" placeholder="请选择">
                <el-option label="男" value="0"/>
                <el-option label="女" value="1"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birth">
              <el-date-picker
                  v-model="formUser.birth"
                  type="date"
                  label="出生日期"
                  placeholder="请输入"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!--第三行的书写-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="addr">
              <el-input v-model="formUser.addr" placeholder="请输入地址" type="textarea" style="width: 423px"/>
            </el-form-item>
          </el-col>

        </el-row>
        <!--按钮，点击事件-->
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <!--对于取消按钮清除内容格式的看法： 个人认为其填写信息应该是有效的，其点击取消不一定希望push掉信息-->
            <el-button type="primary" @click="dialogVisible=false">取消</el-button>
            <!--因此增加一个重置按钮-->
            <el-button type="primary" @click="resetForm">重置</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>

import {ElMessage, ElMessageBox} from "element-plus";
import {nextTick} from "vue";

export default {
  name: "Home",
  data() {
    return {
      dialogVisible: false,
      formInline: {
        keyword: "",
      },
      list: [],
      tableLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',

          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date',
          width: 200,
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input',
          width: 320,
        }
      ],
      config: {
        total: 0,
        page: 1,
        name: '',
      },
      formUser: {
        name: "",//添加用户的姓名
        age: '',
        addr: '',
        birth: '',//想起来了，双击引号可以快速跳出引号
        sex: ''
      },
      rules: {
        name: [
          {required: true, message: '必填'}
        ],
        age: [
          {required: true, message: '必填'},
          {type: 'number', message: '请输入数值'}
        ],
        sex: [
          {required: true, message: '必选'}
        ],
        birth: [
          {required: true, message: '必选', type: 'date'}
        ],
        addr: [
          {required: true, message: '必填'}
        ]
      },
      action: 'add',
    }
  },
  methods: {
    async getUser(config) {
      let res = await this.$api.getUserData(config);
      //console.log(res);
      this.config.total = res.count;
      this.list = res.list.map((item) => {
        item.sex = item.sex === 1 ? '女' : '男';
        return item;//注意返回
      });
    },
    addUser() {
      this.dialogVisible = true;
      this.action = 'add';
      //添加预先重置
      this.$refs.userForm.resetFields();
    },
    //废弃控制page-size的方法
    handleSizeChange(val) {
      //console.log(`${val} items per page`)
    },
    handleCurrentChange(page) {
      console.log(`current page: ${page}`);//改半天才发现是limit的事情……
      //console.log(page)检查page是否传参成功
      this.config.page = page;
      this.getUser(this.config);

    },
    //搜索方法
    handleSearch() {
      this.config.name = this.formInline.keyword;
      this.getUser(this.config);
    },
    //关闭方法，调用了element-plus的对象
    handleClose(done) {
      ElMessageBox.confirm(
          '你确定关闭吗？',
          'warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            this.$refs.userForm.resetFields();
            done()
          })
          .catch(() => {
            // catch error
          })
    },
    //格式化日期，
    timeFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      function add(n) {
        return n < 10 ? "0" + n : n;
      }

      return year + '-' + add(month) + '-' + add(day);
    },
    //添加用户,此处又要使用异步函数，因为等待了mock的数据,在之前几个虽然传入数据，但getUser本身就是一个promise
    onSubmit(formUser) {
      //格式化时间

      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (this.action === 'add') {
            this.formUser.birth = this.timeFormat(this.formUser.birth);
            let res = await this.$api.addUser(this.formUser);//此处传参就可以了
            //console.log(this.$refs.userForm);
            //console.log(this.formUser.birth);
            if (res) {
              //document.getElementById('userForm').resetFields();需要给form赋id
              //重置表单
              this.$refs.userForm.resetFields();
              //退出dialog
              this.dialogVisible = false;
              //传入数据
              await this.getUser(this.config);
              ElMessage({
                message: '添加成功',
                type: 'success'
              })
            }
          } else {
            //检验一下formUser的值
            //console.log(formUser);
            this.formUser.birth = this.timeFormat(this.formUser.birth);
            let res = await this.$api.editUser(this.formUser);//此处传参就可以了
            ElMessage({
              message: '编辑成功',
              type: 'success'
            });
            if (res) {
              //document.getElementById('userForm').resetFields();需要给form赋id
              //重置表单
              this.$refs.userForm.resetFields();
              //退出dialog
              this.dialogVisible = false;
              //传入数据
              await this.getUser(this.config);
            }
          }
        } else {
          ElMessage({
            message: '请输入正确内容',
            type: 'error',
          })
        }

      })

    },
    resetForm() {
      this.$refs.userForm.resetFields();
    },
    handleEdit(row) {
      console.log(row);
      this.action = 'edit';
      this.dialogVisible = true;
      nextTick(
          () => {
            //此时formUser已经与dialog的框值绑定好了，因此只需要把row的值赋值给formUser即可，对于对象来说，浅拷贝即可
            Object.assign(this.formUser, row);
          }
      )

    },
    handleDelete(row) {
      //调用一个判断框
      ElMessageBox.confirm(
          "您确定要删除吗？",
          'warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(async () => {
                //删除用户
                await this.$api.deleteUser(row);

                ElMessage({
                  message: '删除成功',
                  type: 'success'
                });

                await this.getUser(this.formUser);
              }
          ).catch(() => {

      })

      //更新名单

    }
  },
  mounted() {
    this.getUser(this.config);
  }
}
</script>

<style scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}

/*
隐藏的格式需要穿透
 */
:deep(.el-input__wrapper), button {
  border-radius: 6px;
}
</style>