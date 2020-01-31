<template>
  <div id="main">
    <!-- 使用组件 -->
    <Header title="cinema" />
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <!-- 使用 -->
      <CiList />
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import CiList from "@/components/CiList"; // 引入
export default {
  name: "Cinema",
  components: {
    Header,
    TabBar,
    CiList // 注册
  }
};
</script>

<style lang="scss" scoped>
#content {
  margin-top: 23px;
  .cinema_menu {
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
  }
}
</style>
