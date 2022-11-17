<template>
  <div>
    <!-- 添加用户 -->
    <el-button type="primary" @click="dialogVisible = true"
      >添加新用户</el-button
    >

    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <!-- 添加用户表单 -->
      <el-form :model="form" :rules="formRules" ref="myAddForm">
        <el-form-item label="用户姓名" label-width="80px" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄" label-width="80px" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" label-width="80px" prop="position">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddNewUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户列表 -->
    <el-row :gutter="10">
      <!-- 响应式盒子 -->
      <el-col :md="24" :lg="18" :xl="18">
        <!-- 用户表格 -->
        <el-table :data="userList" stripe border>
          <el-table-column type="index" label="#"></el-table-column>
          <!-- 渲染用户名称这一列 -->
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="年龄" prop="age"></el-table-column>
          <el-table-column label="头衔" prop="position"></el-table-column>
          <el-table-column label="创建时间">
            <template v-slot:default="scoped">
              <div>
                {{ scoped.row.addtime | dateFormat }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="{ row }">
              <div>
                <router-link :to="`/users/${row.id}`">详情</router-link>
                <a href="#" @click.prevent="onRemove(row.id)">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    //   声明校验年龄的函数
    let checkAge = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请填写整数"));
      }
      if (value > 100 || value < 1) {
        return callback(new Error("年龄必须在1到100之间"));
      }
      callback();
    };
    return {
      userList: [],
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        position: "",
      },

      formRules: {
        name: [
          { required: true, message: "姓名是必填项", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15之间" },
        ],
        age: [
          { required: true, message: "年龄是必填项", trigger: "blur" },
          { validator: checkAge, trigger: "blur" },
        ],
        position: [
          { required: true, message: "头衔是必填项", trigger: "blur" },
          { min: 1, max: 10, message: "长度在1到10之间" },
        ],
      },
    };
  },
  methods: {
    // 异步获取用户列表数据
    async getUserList() {
      const { data: res } = await this.$http.get("/api/users");
      if (res.status !== 0) return console.log("用户获取失败");
      this.userList = res.data;
      //   console.log(this.userList);
    },
    // 监听对话框关闭
    onClose() {
      // console.log('ok');
      this.$refs.myAddForm.resetFields();
    },
    // 用户点击添加
    onAddNewUser() {
      this.$refs.myAddForm.validate(async (valid) => {
        if (!valid) return;
        // 执行添加处理
        else {
          const { data: res } = await this.$http.post("/api/users", this.form);
          if (res.status !== 0) {
            // 利用message组件返回结果
            return this.$message.error("添加失败");
          }
          this.$message.success("添加成功");
          this.dialogVisible = false;
          this.getUserList();
        }
      });
    },

    // 用户删除
    async onRemove(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") return this.$message.info("取消了删除");

      const { data: res } = await this.$http.delete(`/api/users/${id}`);
      if (res.status !== 0) {
        // 利用message组件返回结果
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getUserList();
    },
  },

  // vue实例创建时调用获取用户函数
  created() {
    this.getUserList();
  },
};
</script>

<style scoped lang="less">
.el-table {
  margin-top: 15px;
}
</style>