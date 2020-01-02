import VueRouter from 'vue-router'  
import Vue from 'vue'  

const Movie = () => import('@/views/Movie')  
const Cinema = () => import('@/views/Cinema')
const Mine = () => import('@/views/Mine')

Vue.use(VueRouter)

const router = new VueRouter({  
    routes: [
    	{path: '/movie',component: Movie},
  		{path: '/cinema',component: Cinema},
  		{path: '/mine',component: Mine}
    ],
    mode: 'history'
})

export default router  
