import Vue from 'vue'
import MessageBox from './MessageBox'

// 暴露出一个接口,考虑到接口可能有很多,我们使用了闭包去解决
export var messageBox = (function() {


   // 调用之后返回的函数出去
   // 将配置参数opts传递进去
   return function(opts) {
      // 给我们定制的模板一些默认参数
      var default1 = {
         title: '',
         content: '',
         cancel: '',
         ok: '',
         handleCancel: null,
         handleOk: null
      }

      var MyComponent = Vue.extend(MessageBox)

      // 将外面的配置参数进行循环遍历并且覆盖
      for(var attr in opts) {
         default1[attr] = opts[attr];
      }
      
      var vm = new MyComponent({
         el: document.createElement('div'), // 有el字段就会渲染其,而不会再生成template
         data: {
            title: default1.title,
            content: default1.content,
            cancel: default1.cancel,
            ok: default1.ok
         },
         methods: {
            handleCancel() {
               default1.handleCancel && default1.handleCancel.call(this); // 要使得handleCancel拿到vm对象,所以我们使用bind改变this指向
               document.body.removeChild(vm.$el);
            },
            handleOk() {
               default1.handleOk && default1.handleOk.call(this);
               document.body.removeChild(vm.$el);
            }
         }
      });
      document.body.appendChild(vm.$el)
   }
})()