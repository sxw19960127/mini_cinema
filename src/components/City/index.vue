// 二级路由组件 City 部分

<template>
   <div class="city_body">
      <div class="city_list">
         <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
               <li>上海</li>
               <li>北京</li>
               <li>上海</li>
               <li>北京</li>
               <li>上海</li>
               <li>北京</li>
               <li>上海</li>
               <li>北京</li>
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
            <div>
               <h2>B</h2>
               <ul>
                  <li>北京</li>
                  <li>保定</li>
                  <li>蚌埠</li>
                  <li>包头</li>
               </ul>
            </div>
         </div>
      </div>
      <div class="city_index">
         <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
         </ul>
      </div> 
   </div>
</template>

<script>
export default {
   name: 'City'
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