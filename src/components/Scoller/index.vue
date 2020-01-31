// 将其注册成为全局组件

<template>
  <div class="wrapper" ref="wrapper">
     <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
   name: 'Scroller',
   // 1.创建两个属性
   props: {
      handleToScroll: {
         type: Function,
         default: function() {}
      },
      handleToTouchEnd: {
         type: Function,
         default: function() {}
      }
   },
   mounted() {
      var scroll = new BScroll(this.$refs.wrapper, {
         tap: true,
         probeType: 1
      })

      this.scroll = scroll;

      // 2.调用上述定义的两个方法
      // 将上述两个方法回调出去
      scroll.on('scroll', (pos) => {
         this.handleToScroll(pos)
      });

      scroll.on('touchEnd', (pos) => {
         this.handleToTouchEnd(pos)
      })
   },
   methods: {
      // 只在y轴上进行跳转
      toScrollTop(y) {
         this.scroll.scrollTo(0,y)
      }
   }
}
</script>

<style lang="scss" scoped>
   .wrapper{
      height: 100%;
   }
</style>
