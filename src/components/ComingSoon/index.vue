// 二级路由组件 comingSoon 部分
// 由于接口出bug,所以还是使用静态数据了

<template>
  <div class="movie_body">
      <Loading v-if="flag" />
      <Scroller v-else>
         <ul>
               <li v-for="(item,index) in 10" :key="item + index">
                     <div class="pic_show">
                        <img src="@/img/movie_1.jpg">
                     </div>
                     <div class="info_list">
                        <h2>无名之辈</h2>
                        <p><span class="person">17746</span> 人想看</p>
                        <p>主演: 陈建斌,任素汐,潘斌龙</p>
                        <p>2018-11-30上映</p>
                     </div>
                     <div class="btn_pre">
                        预售
                     </div>
               </li>
               <!-- <li v-for="item in comingList" :key="item.id">
                  <div class="pic_show">
                     <img :src="item.img | setWH('128.180')">
                  </div>
                  <div class="info_list">
                     <h2>{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                     <p><span class="person">{{ item.wish }}</span> 人想看</p>
                     <p>主演: {{ item.star }}</p>
                     <p>{{ item.rt }}上映</p>
                  </div>
                  <div class="btn_pre">
                     预售
                  </div>
               </li> -->
         </ul>
      </Scroller>
  </div>
</template>

<script>
export default {
   name: 'ComingSoon',
   data() {
      return {
         comingList: [],
         flag: true,
         preCityId: -1
      }
   },
   activated() {
      var cityId = this.$store.state.city.id;
      if(this.preCityId === cityId) {return ;}
      this.isLoading = true;
      this.axios.get('/api/movieComingList?cityId=476').then(res => {
         var msg = res.data.msg;
         if(msg === 'ok') {
            this.comingList = res.data.data.comingList;
            this.flag = false
            this.preCityId = cityId
         }
      })
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
            border-bottom: 1px solid #e6e6e6; 
            padding-bottom: 10px;
            display: flex; 
            align-items: center; 
            .pic_show{ 
               width:64px; 
               height: 90px;
               img{
                  width: 100%;
               }
            }
            .info_list{
               margin-left: 10px; 
               flex: 1; 
               position: relative;
               h2{
                  font-size: 17px; 
                  width: 150px; 
                  line-height: 24px;

                  overflow: hidden; 
                  white-space: nowrap; 
                  text-overflow:ellipsis;
               }
               p{
                  font-size: 13px;
                  color: #666; 
                  width: 200px;
                  line-height: 22px; 

                  overflow: hidden; 
                  white-space: nowrap; 
                  text-overflow:ellipsis;
               }
            }
            .btn_pre{
               width: 47px; 
               height: 27px; 
               line-height: 28px; 
               text-align: center; 
               background-color: #3c9fe6; 
               color: #fff; 
               border-radius: 4px; 
               font-size: 12px; 
               cursor: pointer;
            } 
         }
      }
   }
</style>
