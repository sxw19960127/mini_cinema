<template>
  <div id="main">
    <!-- 使用组件 -->

    <!-- 头部 -->
    <Header />
    <!-- 二级路由切换部分 -->
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{ $store.state.city.nm }}</span>
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
    <router-view name="detail" />
  </div>
</template>

<script>
// 引入头部、底部组件
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import {messageBox} from '@/components/JS'
export default {
  name: 'Movie',
  components: {
    // 注册局部组件
    Header,
    TabBar
  },
  mounted() {
    setTimeout(() => { // 数据请求回来之后,延迟几秒再弹出城市定位
        this.axios.get('/api/getLocation').then(res => {
            var msg = res.data.msg;
            if(msg === 'ok') {
                var nm = res.data.data.nm;
                var id = res.data.data.id;
                if(this.$store.state.city.id == id) {return;}
                messageBox({
                    title: '定位',
                    content: nm,
                    cancel: '取消',
                    ok: '切换定位',
                    handleCancel() {
						          // console.log(1)
                    },
                    handleOk() {
                      window.localStorage.setItem('nowNm',nm);
                      window.localStorage.setItem('nowId',id);
                      // 当切换的时候,我们重新加载一下我们的页面
                      window.location.reload()
                    }
                })
            }
        })
    }, 3000)
}
  // mounted() {
  //   messageBox({
  //     title: '定位',
  //     content: '兰溪',
  //     cancel: '取消',
  //     ok: '切换定位',
  //     handleCancel() {
  //       console.log(111)
  //     },
  //     handleOk() {
  //       console.log(222)
  //     }
  //   })
  // }
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
      z-index: 99;
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
