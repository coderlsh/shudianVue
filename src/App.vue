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
    
    // var i = document.getElementsByTagName("meta");
    // if(window.screen.width < 2920){
    //   i[2]['content'] = 'width=1760, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0'
    // }

    // console.log('meta',i,window.screen.width)
    
    if(localStorage.getItem('extraCoord') == null){
      console.log('start localStorage extraCoord')
      localStorage.setItem('extraCoord', "[]");
    }
    if(localStorage.getItem('controlPoint') == null){
      console.log('start localStorage controlPoint')
      localStorage.setItem('controlPoint', "[]");
    }
    window.addEventListener('beforeunload',e => this.set() )
    //window.addEventListener('load', this.adaptation);
    //window.addEventListener('resize', this.adaptation);
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
    // adaptation () {
    //   var w = document.body.clientWidth;
    //   var h = document.body.clientHeight;
    //   let nw = 1920;
    //   let nh = 1080;
    //   var left, top, scale;
    //   if (w / h > nw / nh) {
    //     scale = 1;
    //     top = 0;
    //     left = (w - nw * scale) / 2;
    //   } else {
    //     scale = 1;
    //     left = 0;
    //     top = (h - nh * scale) / 2;
    //   }
    //   document.getElementById('app').setAttribute('style', 'transform: scale('+ scale +');left:'+left+'px;top:'+top+'px;');
    // }
  },
}
</script>

<style lang="less" scoped>
@import "assets/css/base.css";

#app {
  height: 100%;
}
</style>
