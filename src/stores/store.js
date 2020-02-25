import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      token:'',
      url:"http://127.0.0.1:3000"
    },
    mutations: {
      setToken (state,payload) {
          state.token = payload;
      },
      removeToken (state){
          state.token = '';
      }
    },
})