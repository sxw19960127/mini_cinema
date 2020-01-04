import VueRouter from 'vue-router'  
import Vue from 'vue'  

const Movie = () => import('@/views/Movie')  
const Cinema = () => import('@/views/Cinema')
const Mine = () => import('@/views/Mine')

Vue.use(VueRouter)

const router = new VueRouter({  
    routes: [
        {path: '/movie',component: Movie,
            children: [
                {path: 'city',component: () => import('@/components/City')},
                {path: 'nowPlaying',component: () => import('@/components/NowPlaying')},
                {path: 'comingSoon',component: () => import('@/components/ComingSoon')},
                {path: 'search',component: () => import('@/components/Search')},
                {path: '/movie',redirect: '/movie/nowPlaying'}
            ]
        },
  		{path: '/cinema',component: Cinema},
        {path: '/mine',component: Mine},
        {path: '/*',redirect: '/movie'} // 路由重定向,上述路由都不匹配的情况下
    ],
    mode: 'history'
})

export default router  
