import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {

   },
   mutations: {

   },
   actions: {

   },
   getters: {

   },
   modules: {
      city,
      user
   }
})

export default store
