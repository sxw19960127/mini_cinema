// 二级路由组件 Search 部分

<template>
   <div class="search_body">
      <div class="search_input">
         <div class="search_input_wrapper">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" v-model="message">
         </div>					
      </div>
      <div class="search_result">
         <h3>电影/电视剧/综艺</h3>
         <ul>
            <!-- <li>
               <div class="img">
                  <img src="@/img/movie_1.jpg">
               </div>
               <div class="info"> 
                  <p>
                     <span>无名之辈</span>
                     <span>8.5</span>
                  </p>
                  <p>A Cool Fish</p>
                  <p>剧情,喜剧,犯罪</p>
                  <p>2018-11-16</p>
               </div>
            </li> -->
            <li v-for="item in moviesList" :key="item.id">
               <div class="img">
                  <img :src="item.img | setWH('128.180')">
               </div>
               <div class="info"> 
                  <p>
                     <span>{{ item.nm }}</span>
                     <span>{{ item.sc }}</span>
                  </p>
                  <p>{{ item.enm }}</p>
                  <p>{{ item.cat }}</p>
                  <p>{{ item.rt }}</p>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Search',
   data() {
      return {
         message: '',
         moviesList: []
      }
   },
   methods: {
      // 1
      cancelRequest() {
         if(typeof this.source === 'function') {
            this.source('终止请求')
         }
      }
   },
   watch: {
      // 我们需要去监听message字段,所以下面只需要写上就能够监听到message数据的改变了
      message(newValue) {
         var that = this;
         var cityId = this.$store.state.city.id
         // 2
         this.cancelRequest();
         this.axios.get('/api/searchList?cityId=' + cityId + '&kw=' + newValue,{
            cancelToken: new this.axios.CancelToken(function(c) {
               that.source = c;
            })
         }).then(res => {
            var msg = res.data.msg;
            var movies = res.data.data.movies;
            if(msg && movies) {
               // 符合搜索要求的数据赋值给moviesList进行保存
               this.moviesList = res.data.data.movies.list;
            }
         }).catch(err => {
            if(this.axios.isCancel(err)) {
               console.log('Rquest canceled', err.message); // 请求如果被取消,这里是返回取消的message
            }else {
               // handle error
               console.log(err);
            }
         })
      } 
   }
}
</script>

<style lang="scss" scoped>
   .search_body{
      flex: 1;
      overflow: auto;
      .search_input{ 
         padding: 8px 10px; 
         background-color: #f5f5f5; 
         border-bottom: 1px solid #e5e5e5;
         .search_input_wrapper{ 
            padding: 0 10px; 
            line-height: 20px;
            border: 1px solid #e6e6e6; 
            border-radius: 5px; 
            background-color: #fff; 
            display: flex; 
            i{
               font-size: 16px; 
               padding: 4px 0; 
            }
            input{
               width: 100%;
               border: none; 
               font-size: 13px; 
               color: #333; 
               padding: 4px 0; 
               outline: none; 
               margin-left: 5px; 
            }
         }
      }
      .search_result{
         h3{
            font-size: 15px; 
            color: #999; 
            padding: 9px 15px; 
            border-bottom: 1px solid #e6e6e6;
         }
         ul{
            li{
               border-bottom: 1px dashed #c9c9c9; 
               padding: 10px 15px; 
               box-sizing: border-box; 
               display: flex;
               .img{
                  width: 60px; 
                  float:left;
                  img{
                     width: 100%;
                  }
               }
               .info{
                  float: left; 
                  margin-left: 15px; 
                  flex: 1;
                  p{
                     height: 22px; 
                     line-height: 22px;
                     display: flex;  
                     font-size: 12px;
                  }
                  p:nth-of-type(1) span:nth-of-type(1){ 
                     font-size: 18px; 
                     flex:1; 
                  }
                  p:nth-of-type(1) span:nth-of-type(2){ 
                     font-size: 16px; 
                     color: #fc7103;
                  }
               }
            }
         }
      }
   }
</style>
