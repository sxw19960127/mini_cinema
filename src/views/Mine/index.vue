<template>
  <div id="main">
    <!-- 使用组件 -->
    <Header title="mine" />
    <div id="content">
      <router-view />
      <!-- <Login /> -->
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Login from "@/components/Login";
export default {
  name: "Mine",
  components: {
    Header,
    TabBar,
    Login
  }
};
</script>

<style>
</style>
