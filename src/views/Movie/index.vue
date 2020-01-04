<template>
  <div id="main">
    <!-- 使用组件 -->

    <!-- 头部 -->
    <Header />
    <!-- 二级路由切换部分 -->
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>大连</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <!-- 二级路由展示区 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
 
    <!-- 底部 -->
    <TabBar />
  </div>
</template>

<script>
// 引入头部、底部组件
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
export default {
  name: 'Movie',
  components: {
    // 注册局部组件
    Header,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
  #content{
    .movie_menu{
      width: 100%;
      height: 45px;
      background: white;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 99999;
      .city_name{
        margin-left: 20px;
        height: 100%;
        line-height: 45px;
      }
      .hot_swtich{
        height: 100%;
        line-height: 45px;
        display: flex;
        .hot_item{
          font-size: 15px;
          width: 80px;
          color: #666;
          text-align: center;
          margin: 0 12px;
          font-weight: 700;
        }
      }
    }
    .search_entry{
      margin-right: 20px;
      height: 100%;
      line-height: 45px;
      i{
        font-size:24px; 
      }
    }
    .router-link-active{
      color: #ef4238;
      border-bottom: 2px solid #ef4238;
    }
  }
</style>
