<template>
   <div class="cinema_body">
      <ul>
         <li v-for="(item,index) in 6" :key="item + index">
            <div>
               <span>大地影院(澳东世纪店)</span>
               <span class="q">
                  <span class="price">22.9</span> 元起
               </span>
            </div>
            <div class="address">
               <span>金州区大连经济技术开发区澳东世纪3层</span>
               <span>1763.5km</span>
            </div>
            <div class="card">
               <div>小吃</div>
               <div>折扣卡</div>
            </div>
         </li>
         <!-- <li v-for="item in cinemaList" :key="item.id">
            <div>
               <span>{{ item.nm }})</span>
               <span class="q">
                  <span class="price">{{ item.sellPrice }}</span> 元起
               </span>
            </div>
            <div class="address">
               <span>{{ item.addr }}</span>
               <span>{{ item.distance }}</span>
            </div>
            <div class="card">
               遍历对象也可以使用v-for指令,其中num遍历的是对象的属性名,key遍历的是对象的属性值
               <div v-for="(num,key) in item.tag" v-if="num === 1" :key="key">{{ key | formatCard }}</div>
            </div>
         </li> -->
      </ul>
   </div>
</template>

<script>
export default {
   name: 'CiList',
   data() {
      return {
         cinemaList: []
      }
   },
   mounted() {
      this.axios.get('/api/cinemaList?cityId=3').then(res => {
         var msg = res.data.msg;
         if(msg === 'ok') {
            this.cinemaList = res.data.data.cinemas;
         }
      })
   },
   filters: { // 局部过滤器
      formatCard(key) {
         var card = [
            { key: 'allowRefund',value: '改签' },
            { key: 'endose',value: '退' },
            { key: 'sell',value: '折扣卡' },
            { key: 'snack',value: '小吃' }
         ];
         for(var i = 0;i < card.length;i ++) {
            if(card[i].key === key) {
               return card[i].value
            }
         }
         return '' // 都没有匹配到,给一个默认值 '空字符串
      }
   }
    
}
</script>

<style lang="scss" scoped>
   .cinema_body{
      ul{ 
         padding: 20px;
         li{
            border-bottom: 1px solid #e6e6e6; 
            margin-bottom: 20px;
            div{
               margin-bottom: 10px;
               .q{
                  font-size: 11px; 
                  color: #f03d37;
                  .price{
                     font-size: 18px;
                  }
               }
            }
            .address{ 
               font-size: 13px; 
               color: #666;
               span:nth-of-type(2) {
                  float: right;
               }
            }
            .card{
               display: flex;
               div{
                  padding: 0 3px; 
                  height: 15px; 
                  line-height: 15px; 
                  border-radius: 2px; 
                  color: #f90; 
                  border: 1px solid #f90; 
                  font-size: 13px; 
                  margin-right: 5px;
               }
            }
         }
      }
   }
</style>