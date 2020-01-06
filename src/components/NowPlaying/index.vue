// 二级路由组件 nowplaying 部分

<template>
   <!-- 4.给父级容器起一个ref属性,用以找到他 -->
  <div class="movie_body" ref="movie_body">
      <Loading v-if="flag" />
      <Scroller v-else :handleToScroll = "handleToScroll" :handleToTouchEnd = "handleToTouchEnd">
         <ul>
               <!-- <li v-for="(item,index) in 10" :key="item + index">
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
               </li> -->
               <li class="pullDown">{{ pullDownMessage }}</li>
               <li v-for="item in movieList" :key="item.id">
                  <!-- 一.添加tap事件 -->
                  <div class="pic_show" @tap="handleToDetail(item.id)">
                     <img :src="item.img | setWH('128.180')" alt=""> 
                  </div>
                  <div class="info_list">
                     <h2>{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2> 
                     <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                     <p>主演：{{ item.star }}</p>
                     <p>{{ item.showInfo }}</p>
                  </div>
                  <div class="btn_mall">
                     购票
                  </div>
               </li>
         </ul>
      </Scroller>
  </div> 
</template>

<script>
// 1.引入better-scroll组件
// import BScroll from 'better-scroll'
export default {
   name: 'NowPlaying',
   data() {
      return {
         movieList: [],
         pullDownMessage: '',
         flag: true
      }
   },
   activated() {
      var cityId = this.$store.state.city.id // 1
      if( this.preCityId === cityId) {return;}
      this.isLoading = true;
      this.axios.get('/api/movieOnInfoList?cityId=' + cityId).then((res) => {
         console.log(1)
         var msg = res.data.msg;
         if(msg === 'ok') {
            this.movieList = res.data.data.movieList;
            this.flag = false // 数据加载成功之后
            // 2.$nextTick()方法能够保证我们的数据完全被渲染到页面上,并且页面已经完整呈现出来了
            // this.$nextTick(() => {
            //    // 3.在$nextTick()里面new BScroll方法就能成功
            //    var scroll = new BScroll( this.$refs.movie_body, {
            //       tap: true,
            //       probeType: 1 // = 1时,滚动的时候会派发scroll事件,会截流
            //    })

            //    scroll.on('scroll', (pos) => {
            //       if(pos.y > 30) {
            //          this.pullDownMessage = '正在更新中'
            //       }
            //       // console.log('scroll')
            //    })
            //    scroll.on('touchEnd', (pos) => {
            //       if(pos.y > 30) {
            //          this.axios.get('/api/movieOnInfoList?cityId=10').then(res => {
            //             var msg = res.data.msg;
            //             if(msg === 'ok') {
            //                this.pullDownMessage = '更新成功';
            //                setTimeout(() => {
            //                   this.movieList = res.data.data.movieList;
            //                   this.pullDownMessage = ''
            //                }, 1000)
            //             }
            //          })
            //       }
            //       // console.log('touchend')
            //    })
            // })
         }
      })
   }, 
   methods: {
      handleToDetail(movieId) {
         console.log(movieId)
         this.$router.push('/movie/detail/' + movieId)
      },
      handleToScroll(pos) {
         if(pos.y > 30) {
            this.pullDownMessage = '正在更新中'
         }
      },
      handleToTouchEnd(pos) {
         if(pos.y > 30) {
            this.axios.get('/api/movieOnInfoList?cityId=10').then(res => {
               var msg = res.data.msg;
               if(msg === 'ok') {
                  this.pullDownMessage = '更新成功';
                  setTimeout(() => {
                     this.movieList = res.data.data.movieList;
                     this.pullDownMessage = ''
                  }, 1000)
               }
            })
         }
      }
   }
    
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
            display: flex;

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
      .pullDown{
         margin: 0;
         padding: 0;
         border: none;
      }
   }

// .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
// .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
// .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
// .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
