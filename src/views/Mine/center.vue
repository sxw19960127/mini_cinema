<template>
  <div>
     <div>个人中心：</div>
     <div>当前用户：{{ $store.state.user.name }} <a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
     <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入后台管理系统</a></div>
     <div v-else>用户身份：普通会员</div>
     <div>
        <input type="file" name="file" value="上传头像" @change="handleToUpload">
        <img style="width: 100px;height: 100px;border-radius: 50%;overflow: hidden;" :src="$store.state.user.userHead" alt="">
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS'
export default {
   name: 'center',
   methods: {
      handleToLogout() {
         this.axios.get('/api2/users/logout').then(res => {
            var status = res.data.status
            if(status === 0) {
               localStorage.removeItem('name') // 将username进行本地存储
               localStorage.removeItem('isAdmin') // 将Admin也进行本地存储一下
               this.$store.commit('user/USER_NAME', {name: '' , isAdmin: false, userHead: ''}) // 当我们退出的时候,将用户名置空
               this.$router.push('/mine/login')
            }
         })
      },
      handleToUpload(ev) {
         var file = ev.target.files[0];
         var param = new FormData();
         param.append('file', file, file.name) 
         var config = {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         };

         this.axios.post('/api2/users/uploadUserHead', param, config).then((res) => {
            var status = res.data.status;
            var This = this
            if( status === 0 ) {
               messageBox({
                  title: '信息',
                  content: '头像上传成功',
                  ok: '确定',
                  handleOk() {
                     This.$store.commit('user/USER_NAME', {
                        name: This.$store.state.user.name,
                        isAdmin: This.$store.state.user.isAdmin,
                        userHead: res.data.data.userHead + '?' + Math.random() // 怕浏览器有缓存,我们加上一个随机数
                     })
                  }
               })
            }else {
               messageBox({
                  title: '信息',
                  content: '上传头像失败',
                  ok: '确定'
               })
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
               vm.$store.commit('user/USER_NAME', { 
                  name: res.data.data.username,
                  isAdmin: res.data.data.isAdmin,
                  userHead: res.data.data.userHead
               }) // 第一个参数就是名字，第二个参数就是接口中写好的返回的数据
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
