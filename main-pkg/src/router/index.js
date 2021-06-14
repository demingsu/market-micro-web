import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../views/login'
import Home from '../views/home'

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '', redirect: '/login'},
        {path: '/login', component: Login, meta: {isBlank: true}},
        {path: '/home', component: Home}
    ]
})

export default router