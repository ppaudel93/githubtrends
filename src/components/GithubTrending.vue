<template>
  <div>
  <div class="inputholder">
    <h1>{{ msg }}</h1>
    <input class="inputbox" v-model="languageInput" type='text' placeholder="Enter language name"/>
    <button class="button" @click="searchforLanguage">Go!</button>
    <h1 v-if="seen">Showing results for {{languageTextView}}</h1>
  </div>
  <div class="loader" v-if="!responseAcquired"/>
  <div class="cardholder">
    <div class="card" v-show="responseAcquired" v-for="item in response" :key="item.id">
          <div>
            <span>{{response.indexOf(item)+1}}</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <img class="image" :src="item.owner.avatar_url"/>
          </div>
          <div>
            <span>Stars: "{{item.stargazers_count}}"</span>
          </div>
          <a :href="item.html_url">
          <div>
            <span>Github: "{{item.svn_url}}"</span>
          </div>
          </a>
    </div>
  </div>
</div>
</template>

<script>
let urlstart = 'https://api.github.com/search/repositories?q=stars:%3E1+language:'
let urlend = '&sort=stars&order=desc&type=Repositories'
export default {
  name: 'GithubTrending',
  data () {
    return {
      msg: 'Welcome to Github Trends Viewer',
      seen: true,
      languageInput: '',
      response: [],
      languageTextView: '',
      responseAcquired: false
    }
  },
  created(){
    this.seen=false;
    console.log("testing")
    fetch(urlstart+"all"+urlend)
      .then(response => response.json())
      .then(json => {
        this.response.push(...json.items)
        this.responseAcquired=true
      })
      .then(()=>console.log(this.response))
  },
  methods: {
    searchforLanguage (){
      this.responseAcquired=false
      fetch(urlstart+this.languageInput+urlend)
        .then(response => response.json())
        .then(json=> {
          this.seen=true
          if (this.languageInput)
            this.seen = false
          this.languageTextView=this.languageInput
          this.response=json.items
          this.responseAcquired=true
        })
        .then (()=>console.log(this.response))
    }
  },
  watch: {
    languageInput: function(){
      console.log(this.languageInput)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputholder{
  align-items: center;
}
.card{
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-radius: 1px;
  border-color: black;
}
.image{
  width: 400px;
  height: 400px;
}
.cardholder{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.inputbox{
  padding: 10px;
  width: 50%;
  font-size: 16px;
}
.button{
  padding: 10px;
  height: inherit;
  width: 10%;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
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
.loader{
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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
a {
  color: #42b983;
}
</style>
