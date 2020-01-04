// 底部一级路由切换组件

<template>
  <footer id="footer">
     <ul>
         <router-link tag="li" to="/movie">
            <i class="iconfont icon-dianying"></i>
            <p>电影</p>
         </router-link>
         <router-link tag="li" to="/cinema">
            <i class="iconfont icon-yingyuan"></i>
            <p>影院</p>
         </router-link>
         <router-link tag="li" to="/mine">
            <i class="iconfont icon-wode"></i>
            <p>我的</p>
         </router-link> 
     </ul>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
   #footer{
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-top: 2px solid #ebe8e3;
      position: fixed;
      left: 0;
      bottom: 0; 
      ul{
         text-align: center;
         height: 50px;
         align-items: center;
         display: flex;
         li{
            height: 40px;
            flex: 1;
         }
         i{
            font-size: 20px;
         }
         p{
            font-size: 12px;
            line-height: 18px;
         }
      }
   }
   // 路由切换生效样式
   .router-link-active{
      color: #f03d37;
   }
</style>
