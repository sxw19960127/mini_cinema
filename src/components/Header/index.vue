// 头部组件

<template>
  <header id="header">
    <slot></slot>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "mini_cinema"
    }
  }
};
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  // height: 100%;
  color: #fff;
  background-color: #e54847;
  border-bottom: 1px solid #e54847;
  position: relative;
  h1 {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    line-height: 50px;
  }
}
</style>
