<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户详情</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goBack"
        >返回</el-button
      >
    </div>
    <div class="text item">
        <p>姓名：{{userInfo.name}}</p>
        <p>年龄：{{userInfo.age}}</p>
        <p>头衔：{{userInfo.position}}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserDetail",
  props: ["id"],
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get(`/api/users/${this.id}`);
      if (res.status !== 0) return this.$message.info("获取用户详情失败");
      this.userInfo = res.data;
      console.log(this.userInfo);
    },
    goBack(){
        this.$router.go(-1)
    }
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>