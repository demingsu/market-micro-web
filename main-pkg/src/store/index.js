import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '123456'
    },
    getters: {
        getToken: state => state.token
    },
    mutations: {
        mutationToken(state, t) {
            console.log(t, '...setting...');
            state.token = t
        }
    }
})

export default store