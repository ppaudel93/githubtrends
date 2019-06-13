<template>
  <div class="cardholder" v-if="!this.$store.getters.showProgressSpinner">
  <div class="card" v-for="item in this.$store.getters.response" :key="item.id">
        <div>
          <span>{{$store.getters.response.indexOf(item)+1}}</span>
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
</template>


<script>
import {urlstart, urlend} from '../main.js'
export default {
  name: 'CardHolder',
}

</script>


<style scoped>
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
a {
  color: #42b983;
}
</style>
