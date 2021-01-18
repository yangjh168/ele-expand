<template>
  <el-container class="app-container">
    <el-header class="main-header">演示demo</el-header>
    <el-container class="main-container">
      <el-aside class="main-aside" width="200px">
        <el-menu :default-openeds="['1']" menu-trigger="click" router>
          <el-submenu index="1">
            <template slot="title">组件</template>
            <el-menu-item index="/ts-selec">ts-select</el-menu-item>
            <el-menu-item index="/ts-range">ts-range</el-menu-item>
            <el-menu-item index="/ts-form">ts-form</el-menu-item>
            <el-menu-item index="/ts-search">ts-search</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-header {
    background-color: #1989fa;
    color: #fff;
    display: flex;
    align-items : center;
    justify-content: center;
  }
  .main-container {
    height: calc(100vh - 60px);
  }
  .main-aside {
    background-color: #20222A;
    color: #fff;
    & /deep/ .el-menu {
      background-color: #20222A;
      color: #fff;

      & /deep/ .el-menu-item, .el-submenu__title {
        color: #fff;
      }
      & /deep/ .el-submenu__title:hover {
        background-color: #1989fa;
      }
      & /deep/ .el-menu-item:focus, .el-menu-item:hover {
        background-color: #1989fa;
      }
    }
  }
</style>
