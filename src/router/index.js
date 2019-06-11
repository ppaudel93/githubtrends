import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GithubTrending from '@/components/GithubTrending'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GithubTrending',
      component: GithubTrending
    }
  ]
})
