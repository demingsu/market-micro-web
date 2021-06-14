import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Supplier from '../views/supplier'

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/base/user', component: Supplier}
    ]
})

export default router