<template>
  <div class="head">
        <span class="head-logo">
          <img style="width:100%" src="../../assets/logo.jpg" alt="">
        </span>
        <span class="head-text">输电线路综合计算系统</span>
    </div>
</template>

<script>
  export default {
    name:"screenHead",
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped>
.head {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 10%;
    /* padding: 0.3rem 1rem; */
}

.head .head-logo {
    font-size: 4.2857rem;
    width: 154px;
    color: white;
}

.head .head-text {
    font-size: 1.4286rem;
    color: white;
}
 
</style>
