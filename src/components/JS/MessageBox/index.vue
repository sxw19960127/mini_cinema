<template>
   <div class="messageBox">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <div> 
         <span v-if="cancel" @touchstart="handleCancel">{{ cancel }}</span>
         <span v-if="ok" @touchstart="handleOk">{{ ok }}</span>
      </div>
   </div>
</template>

<script>
export default {
   name: 'messageBox'
}
</script>

<style lang="scss" scoped>
   .messageBox{
      width: 200px;
      height: 140px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: white;
      box-shadow: 3px 3px 3px 3px #ccc;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -60px 0 0 -100px;
      h2{
         text-align: center;
         line-height: 40px;
         font-size: 18px;
      }
      p{
         text-align: center;
         line-height: 40px;
      }
      div{
         position: absolute;
         bottom: 0;
         width: 100%;
         border-top: 1px solid #ccc;
         display: flex;
         // justify-content: space-between;
         span{
            flex: 1;
            text-align: center;
            line-height: 30px;
            border-right: 1px solid #ccc;
         }
         span:nth-child(2) {
            border: none;
         }
      }
   }
</style>
