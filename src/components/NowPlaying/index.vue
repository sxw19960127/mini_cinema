// 二级路由组件 nowplaying 部分

<template>
  <div class="movie_body">
     <ul>
        <li v-for="(item,index) in 10" :key="item + index">
           <div class="pic_show">
              <img src="@/img/movie_1.jpg" alt=""> 
           </div>
           <div class="info_list">
              <h2>斗破苍穹</h2>
              <p>主演: 萧炎,萧熏儿,药老</p>
              <p>今天33家影院放映600场</p>
           </div>
           <div class="btn_mall">
              购票
           </div>
        </li>
     </ul>
  </div> 
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
   .movie_body{
      flex: 1;
      overflow: auto;
      ul{
         margin: 0 12px;
         overflow: hidden;
         li{
            margin-top: 12px;
            align-items: center;
            display: flex;
            border-bottom: 1px solid #e6e6e6;
            padding-bottom: 10px;
         }
      }
      .pic_show{
         width: 64px;
         height: 90px;
         img{
            width: 100%;
         }
      }
      .info_list{
         margin-left: 10px;
         flex: 1;
         display: relative;
         h2{
            font-size: 17px;
            width: 150px;
            line-height: 24px;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
         }
         p{
            font-size: 13px;
            color: #666;
            width: 200px;
            line-height: 22px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
         }
      }
      .btn_mall{
         width: 47px;
         height: 27px;
         line-height: 27px;
         text-align: center;
         background-color: #f03d37;
         color: #fff;
         border-radius: 4px;
         font-size: 12px;
         cursor: pointer;
      }
   }

// .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
// .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
// .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
// .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
