// 二级路由组件 City 部分

<template>
   <div class="city_body">
      <div class="city_list"> 
         <Loading v-if="flag" />
         <Scroller v-else ref="city_List">
            <!-- Scroller里面必须是一个子节点,所以我们可以使用一个div进行包裹一下 -->
            <div>
               <!-- <div class="city_hot">
                  <h2>热门城市</h2>
                  <ul class="clearfix">
                     <li>上海</li>
                  </ul>
               </div>
               <div class="city_sort">
                  <div>
                     <h2>A</h2>
                     <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                     </ul>
                  </div>
               </div> -->
               <div class="city_hot">
                  <h2>热门城市</h2>
                  <ul class="clearfix">
                     <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{ item.nm }}</li>
                  </ul>
               </div>
               <div class="city_sort" ref="city_sort">
                  <div v-for="item in cityList" :key="item.index">
                     <h2>{{ item.index }}</h2>
                     <ul>
                        <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{ itemList.nm }}</li>
                     </ul>
                  </div>
               </div>
            </div>
         </Scroller>
      </div>
      <div class="city_index">
         <ul>
            <!-- <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li> -->
            <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
         </ul>
      </div> 
   </div>
</template>

<script>
export default {
   name: 'City',
   data() {
      return {
         cityList: [],
         hotList: [],
         flag: true
      }
   },
   mounted() {
      var cityList = window.localStorage.getItem('cityList');
      var hotList = window.localStorage.getItem('hotList');

      if(cityList && hotList) {
         this.cityList = JSON.parse(cityList);
         this.hotList = JSON.parse(hotList)
         this.flag = false
      }else {
         this.axios.get('/api/cityList').then((res) => {
            // console.log(res)
            let msg = res.data.msg
            if(msg === 'ok') {
               // 获取到的所有数据
               let cities = res.data.data.cities 
               // [ { index: 'A',list: [{ name: '安徽',id: 1 },{ name: '埃及',id: 2 } ]} ] 将数据整理成这种结构
               // 封装一个函数,将原始数据传递进去,以达到格式化的效果
               var { cityList,hotList } = this.formatCityList(cities)
               this.cityList = cityList;
               this.hotList = hotList;
               this.flag = false

               window.localStorage.setItem('cityList', JSON.stringify(cityList));
               window.localStorage.setItem('hotList', JSON.stringify(hotList))
            }
         })
      }
   },
   methods: {
      formatCityList(cities) {
         let cityList = [] // 最后整理完成的数据
         let hotList = [] // 筛选出id为1的热门城市

         for(var i = 0;i < cities.length;i ++) {
            if(cities[i].isHot === 1) {
               hotList.push(cities[i])
            }
         }

         for(var i = 0;i < cities.length;i ++) {
            // 截取第一个英文字母并转换为大写形式
            var firstLetter = cities[i].py.substring(0,1).toUpperCase()
            if(toCom(firstLetter)) { // 新添加index
               cityList.push({ index: firstLetter,list: [{ nm: cities[i].nm, id: cities[i].id }]})
            }else { // 累加到已有index索引中
               for(var j = 0;j < cityList.length;j ++) {
                  if(cityList[j].index === firstLetter) {
                     cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id })
                  }
               }
            }

         }

         function toCom(firstLetter) {
            for(var i = 0;i < cityList.length;i ++) {
               if(cityList[i].index === firstLetter) {
                  return false
               }
            }
            return true
         }

         // console.log(cityList)

         cityList.sort((n1,n2) => {
            if(n1.index > n2.index) {
               return 1
            }else if(n1.index < n2.index) {
               return -1
            }else {
               return 0
            }
         })

         console.log(cityList)
         console.log(hotList)
         return {
            cityList,
            hotList
         }
      },
      handleToIndex(index) {
         var h2 = this.$refs.city_sort.getElementsByTagName('h2')
         // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
         // 将一个refs属性加到组件上,那么他就拿到当前的组件对象,然后我们.出对象的方法,记得加上负号
         this.$refs.city_List.toScrollTop(-h2[index].offsetTop); 
      },
      handleToCity(nm,id) {
         this.$store.commit('city/CITY_INFO', {nm,id})
         window.localStorage.setItem('nowNm', nm);
         window.localStorage.setItem('nowId', id);
         this.$router.push('/movie/noePlaying');
      }
   }
}
</script>

<style lang="scss" scoped>
   .city_body{
      width: 100%; 
      margin-top: 45px; 
      display: flex; 
      position: absolute; 
      top: 0; 
      bottom: 0;
      .city_list{ 
         flex: 1; 
         overflow: auto; 
         background: #FFF5F0;
         .city_hot{ 
            margin-top: 20px;
            h2{ 
               padding-left: 15px; 
               line-height: 30px; 
               font-size: 14px; 
               background:#F0F0F0; 
               font-weight: normal;
            }
            ul{
               li{
                  width: 29%;
                  height: 33px;
                  border: 1px solid #e6e6e6;
                  border-radius: 3px;
                  line-height: 33px;
                  text-align: center;
                  background: #fff;
                  padding: 0 4px;
                  margin-top: 15px;
                  margin-left: 3%;
                  float: left;
                  box-sizing: border-box;   
               }
            }
         }
         .city_sort{
            div{
               margin-top: 20px;
               h2{
                  padding-left: 15px; 
                  line-height: 30px; 
                  font-size: 14px; 
                  background: #F0F0F0; 
                  font-weight: normal;
               }
               ul{
                  margin-top: 10px;
                  padding-left: 10px; 
                  li{
                     line-height: 30px;
                  }
               }
            }
         }
      }
      .city_index{
         width: 20px; 
         text-align: center;
         display: flex; 
         flex-direction: column; 
         justify-content: center; 
         border-left: 1px #e6e6e6 solid;
      }
   }
</style>