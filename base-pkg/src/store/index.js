import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: ''
    },
    getters: {
        getToken: state => state.token
    },
    mutations: {
        mutationToken(state, t) {
            state.token = t
        }
    }
})

export default store