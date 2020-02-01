<template>
  <div>
     <div>个人中心：</div>
     <div>当前用户：{{ $store.state.user.name }} <a href="javascript:;" @touchstart="handleToLogin">退出</a></div>
     <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入后台管理系统</a></div>
     <div v-else>用户身份：普通会员</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'center',
   methods: {
      handleToLogin() {
         this.axios.get('/api2/users/logout').then(res => {
            var status = res.data.status
            if(status === 0) {
               localStorage.removeItem('name', res.data.data.username) // 将username进行本地存储
               localStorage.removeItem('isAdmin', res.data.data.isAdmin) // 将Admin也进行本地存储一下
               this.$store.commit('user/USER_NAME', {name: '' , isAdmin: false}) // 当我们退出的时候,将用户名置空
               this.$router.push('/mine/login')
            }
         })
      }
   },
   beforeRouteEnter(to, from, next) {
      axios.get('/api2/users/getUser').then(res => {
         var status = res.data.status
         if(status === 0) {
            next(vm => { // 官网说可以通过 vm 访问到组件实例
               // 将数据进行本地存储
               localStorage.setItem('name', res.data.data.username) // 将username进行本地存储
               localStorage.setItem('isAdmin', res.data.data.isAdmin) // 将Admin也进行本地存储一下
               vm.$store.commit('user/USER_NAME', { name: res.data.data.username,isAdmin: res.data.data.isAdmin }) // 第一个参数就是名字，第二个参数就是接口中写好的返回的数据
            })
         }else {
            next('/mine/login')
         }
      })
   }
}
</script>

<style>

</style>
