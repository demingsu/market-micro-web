import { setPublicPath } from 'systemjs-webpack-interop'
import Vue from 'vue';
import router from './router'
import store from './store'
import Spa from 'single-spa-vue'
import App from './views'

setPublicPath('main', 2)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import './style/index.less'

const lifecycle = Spa({
    Vue,
    appOptions: {
        render: (h) => h(App),
        router,
        store
    }
})
  
export const bootstrap = lifecycle.bootstrap
export const mount = lifecycle.mount
export const unmount = lifecycle.unmount