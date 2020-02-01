import VueRouter from 'vue-router'
import Vue from 'vue'

const Movie = () => import('@/views/Movie')
const Cinema = () => import('@/views/Cinema')
const Mine = () => import('@/views/Mine')

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/movie',
            component: Movie,
            children: [{
                    path: 'city',
                    component: () => import('@/components/City')
                },
                {
                    path: 'nowPlaying',
                    component: () => import('@/components/NowPlaying')
                },
                {
                    path: 'comingSoon',
                    component: () => import('@/components/ComingSoon')
                },
                {
                    path: 'detail/:movieId',
                    components: {
                        default: () => import('@/components/NowPlaying'),
                        detail: () => import('@/views/Movie/detail')
                    }
                },
                {
                    path: 'search',
                    component: () => import('@/components/Search')
                },
                {
                    path: '/movie',
                    redirect: '/movie/nowPlaying'
                }
            ]
        },
        {
            path: '/cinema',
            component: Cinema
        },
        {
            path: '/admin',
            component: () => import('@/views/Admin'),
            children: [
                {
                    path: 'users',
                    component: () => import('@/views/Admin/users.vue')
                },
                {
                    path: 'movie',
                    component: () => import('@/views/Admin/movie.vue')
                },
                {
                    path: 'cinema',
                    component: () => import('@/views/Admin/cinema.vue')
                },
                {
                    path: '/admin', // 重定向
                    component: () => import('@/views/Admin/users.vue')
                }
            ]
        },
        {
            path: '/mine',
            component: Mine,
            children: [
                {
                    path: 'center',
                    component: () => import('@/views/Mine/center.vue')
                },
                {
                    path: 'login',
                    component: () => import('@/components/Login')
                },
                {
                    path: 'register',
                    component: () => import('@/components/Register')
                },
                {
                    path: 'findPassword',
                    component: () => import('@/components/FindPassword')
                },
                {
                    path: '/mine', // 重定向到center页面
                    redirect: 'center'
                }
            ]
        },
        {
            path: '/*',
            redirect: '/movie'
        } // 路由重定向,上述路由都不匹配的情况下
    ],
    mode: 'history',
    base: 'mini'
})

export default router