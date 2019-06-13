import Vue from 'vue'
import Vuex from 'vuex'
import {urlstart, urlend} from '../main.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    languageInput: '',
    showProgressSpinner: true,
    response: [],
    languageTextView: '',
    seen: false
  },
  mutations: {
    changeLanguageInput(state, languageInput){
      state.languageInput = languageInput
    },
    changeProgressSpinner(state, showProgressSpinner){
      state.showProgressSpinner = showProgressSpinner
    },
    changeResponse(state, response){
      state.response = response
    },
    changeLanguageTextView(state, languageTextView){
      state.languageTextView = languageTextView
    },
    changeSeen(state, seen){
      state.seen = seen
    },
  },
  getters: {
    languageInput: state => state.languageInput,
    showProgressSpinner: state => state.showProgressSpinner,
    response: state => state.response,
    languageTextView: state => state.languageTextView,
    seen: state => state.seen
  },
  actions: {
    getResponse({commit, getters}) {
      var language = "all"
      if (getters.languageInput)
        language = getters.languageInput
      commit("changeProgressSpinner", true)
      commit("changeSeen", false)
      fetch(urlstart+language+urlend)
        .then(response => response.json())
        .then(json => {
          if (getters.languageInput)
            commit("changeSeen", true)
          commit("changeLanguageTextView", getters.languageInput)
          commit("changeResponse", json.items)
          commit("changeProgressSpinner", false)
        })
    }
  }
})
