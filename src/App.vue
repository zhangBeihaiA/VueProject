<template>
  <div>
    <Header/>
      <router-view></router-view>
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Footer from './components/Footer'
import Header from './components/Header'


export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted(){
    //派发action
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
