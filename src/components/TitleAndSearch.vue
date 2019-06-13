<template>
  <div class="inputholder">
    <h1>{{ msg }}</h1>
    <input @keypress="checkEnter" class="inputbox" @input="textChanged" name="languageInput" type='text' placeholder="Enter language name"/>
    <button class="button" @click="searchforLanguage">Go!</button>
    <h1 v-if="this.$store.getters.seen">Showing results for "{{this.$store.getters.languageTextView}}"</h1>
  </div>
</template>

<script>
import {urlstart, urlend} from '../main.js'
import {mapActions} from 'vuex'
  export default {
    name: 'TitleAndSearch',
    data() {
      return {
        msg: 'Welcome to Github Trending Viewer',
      }
    },
    methods: {
      ...mapActions([
        'getResponse'
      ]),
      searchforLanguage (){
        this.getResponse()

      },
      textChanged(event){
        this.$store.commit('changeLanguageInput', event.target.value)
      },
      checkEnter(event){
        if (event.keyCode == 13)
          this.searchforLanguage()
      }
    }
  }

</script>

<style>
  .inputholder{
    align-items: center;
  }
  .inputbox{
      padding: 10px;
      width: 50%;
      font-size: 16px;
    }
    .button{
      padding: 10px;
      height: inherit;
      width: auto;
      background: #0069ed;
      color: #ffffff;
      font-family: sans-serif;
      font-size: 1rem;
      text-align: center;
      cursor: pointer;
      text-align: center;
      transition: background 250ms ease-in-out,
                  transform 150ms ease;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .button:hover,
    .button:focus {
        background: #0053ba;
    }
    .button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }
    .button:active {
        transform: scale(0.99);
    }
    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h1, h2 {
      font-weight: normal;
    }
</style>
