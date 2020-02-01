<template>
  <div class="password_body">
    <div class="password_email">
      邮箱：
      <input class="password_text" v-model="email" type="text" />
      <button @touchstart="handleToVerify">发送验证码</button>
    </div>
    <div>
      新密码：
      <input class="password_text" v-model="password" type="password" />
    </div>
    <div>
      验证码：
      <input class="password_text" v-model="verify" type="text" />
    </div>
    <div class="password_btn">
      <button @touchstart="handleToPassword">修改</button>
    </div>
    <div class="password_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS"; // 导入信息提示弹窗
export default {
  name: "findPassWord",
  data() {
    return {
      email: '',
      password: '',
      verify: ''
    }
  },
  methods: {
    handleToVerify() {
      // 验证码功能
      this.axios.get("/api2/users/verify?email=" + this.email).then(res => {
        var status = res.data.status;
        if (status === 0) {
          // 验证码发送成功,需要导入messageBox组件来做一个提示用户作用
          messageBox({
            title: "验证码",
            content: "验证码发送成功",
            ok: "确定"
          });
        } else {
          messageBox({
            title: "验证码",
            content: "验证码发送失败",
            ok: "确定"
          });
        }
      });
    },
    handleToPassword() {
      this.axios.post('/api2/users/findPassword', {
        email: this.email,
        password: this.password,
        verify: this.verify
      }).then(res => {
        var status = res.data.status;
        var This = this
        if(status === 0) {
          messageBox({
            title: '修改',
            content: '修改密码成功',
            ok: '确定',
            handleOk() {
              This.$router.push('/mine/login');
            }
          })
        }else {
          messageBox({
            title: '修改',
            content: '修改密码失败',
            ok: '确定'
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.password_body {
  .password_email {
    position: relative;
    button {
      position: absolute;
      right: 10px;
      top: 10px;
      height: 30px;
    }
  }
  width: 100%;
  .password_text {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
    outline: none;
    text-indent: 10px;
  }
  .password_btn {
    height: 50px;
    margin: 10px;
    button {
      width: 100%;
      height: 100%;
      background-color: #e54847;
      border-radius: 3px;
      border: none;
      display: block;
      color: white;
      font-size: 20px;
    }
  }
  .password_link {
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      margin: 0 5px;
      font-size: 12px;
      color: #e54847;
    }
  }
}
</style>