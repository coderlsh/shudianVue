<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <screen-head />
    <router-view/>
  </div>
</template>

<script>
import screenHead from 'components/screenhead/screenHead.vue'

export default {
  components: {
    screenHead
  },
  mounted() {
    if(localStorage.getItem('extraCoord') == null){
      console.log('start localStorage extraCoord')
      localStorage.setItem('extraCoord', "[]");
    }
    if(localStorage.getItem('controlPoint') == null){
      console.log('start localStorage controlPoint')
      localStorage.setItem('controlPoint', "[]");
    }
    window.addEventListener('beforeunload',e => this.set() )
  },
  methods: {
    set(){
      console.log('我是要调用的函数')
      let extraCoord = this.$store.state.extraCoord
      let controlPoint = this.$store.state.controlPoint
      if(extraCoord.length !== 0){
        localStorage.setItem('extraCoord', JSON.stringify(extraCoord));
      }
      if(controlPoint.length !== 0){
        localStorage.setItem('controlPoint', JSON.stringify(controlPoint));
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "assets/css/base.css";

#app {
  height: 100%;
}
</style>
