<template>
    <div v-show="$store.state.showStep" class="extrac-wizard">
        <a-button @click="back" v-show="show1" type="primary" style="margin-left:10px;top: -2px">上一步</a-button>
        <a-button @click="goToNext" type="primary" style="margin-left:10px;top: -2px">下一步</a-button>
    </div>
</template>

<script>
  export default {
    props: {
      show1: true,

      from: '',
      next: '',
    },
    data () {
      return {

      }
    },
    components: {

    },
    methods: {
      back() {
        this.$router.replace('/mainScr/tables/' + this.from)
      },

      goToNext() {
        this.$router.replace('/mainScr/tables/' + this.next)
        
      }
    },
  }
</script>

<style scoped>
.extrac-wizard {
  position: absolute;
  right: 13rem;
  top: 1.4rem;
  z-index: 10;
}
 
</style>
