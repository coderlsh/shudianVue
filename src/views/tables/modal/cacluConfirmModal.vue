<template>
  <div class="modal-box">
    <div class="content">
      <div class="wraper">
        <div style="padding: 10px" v-show="safe1">导引绳牵牵引绳过程中，最大牵引力乘安全系数下限超过导引绳断破力，请重新选取导引绳！</div>
        <div style="padding: 10px" v-show="safe2">导引绳牵牵引绳过程中，最大牵引力超过牵引绳断破力，请重新选取牵引绳！</div>
        <div style="padding: 10px" v-show="safe3">牵引绳牵导线过程中，最大牵引力乘安全系数下限超过牵引绳断破力，请重新选取牵引绳！</div>
        <div style="padding: 10px" v-show="safe4">牵引绳牵导线过程中，最大牵引力超过导线断破力，请重新选取导线！</div>
        <div style="padding: 10px" v-show="!(safe1||safe2||safe3||safe4)">选取绳索符合安全要求</div>
      </div>
    </div>
    <button class="bottom left" @click="cancel">
      <slot name="left-item">取消</slot>
    </button>
    <button class="bottom right" @click="confirm" html-type="submit">
      <slot name="right-item">确定</slot>
    </button>
  </div>
</template>
  
<script>
export default {
    name: "modalBox",
    data() {
      return {
        
      }
    },
    computed: {
      safe1() {
        if((this.preMsg.breakingForce0 *1000) < (this.preMsg.safelimit0 * Number(this.Tmax1))){
          return true
        }else {
          return false
        }
      },

      safe2() {
        if((this.preMsg.breakingForce *1000) < (Number(this.Tmax1) / this.preMsg.n)){
          return true
        }else {
          return false
        }
      },

      safe3() {
        if((this.preMsg2.breakingForce0 *1000) < (this.preMsg2.safelimit0 * Number(this.Tmax2))){
          return true
        }else {
          return false
        }
      },

      safe4() {
        if((this.preMsg2.breakingForce *1000) < (Number(this.Tmax2) / this.preMsg2.n)){
          return true
        }else {
          return false
        }
      }
    },
    watch: {
      safe1(){
        this.$emit("safeWarning", (this.safe1 || this.safe2 || this.safe3 || this.safe4))
      }
    },
    props: {
      // safelimit: '',
      // breakingForce: '',
      Tmax1: '',
      Tmax2: '',
      preMsg: {},
      preMsg2: {}
    },
    methods: {
      cancel() {
        this.$emit("cancel")
        // console.log(this.boxType);
        
      },
      confirm() {
        this.$emit("confirm")
        // console.log(this.boxType);
      }
    }
  }
</script>
  
<style scoped>
  
  .modal-box {
    width: 550px;
    /* height: 165px; */
    background-color: rgba(0,110,107, .9);;
    border-radius: 8px;
    position: absolute;
    overflow: hidden;
    font-size: 18px;
    z-index: 100;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
  }
  
  .content {
    padding: 0;
    margin: 0;
    width: 100%;
    height: calc( 100% - 50px );
  }

  .ant-radio-wrapper {
    color: white;
    width: 4%;
  }
  
  .wraper {
    /* background-color: rgba(104, 143, 42, 0.966); */
    color: white;
    /* display: flex; */
    justify-content: center;
    padding-top: 2rem;
    position: relative;
    height: 100%;
  }

  /* .ant-radio-group {
    display: flex;
  }
   */
  .bottom {
    margin:0;
    padding: 0;
    border:none;
    /* position: absolute; */
    bottom: 0;
    height: 50px;
    width: 50%;
    line-height: 50px;
    text-align: center;
    color: white;
    font-family: inherit;
  }
  
  .bottom:hover {
    cursor: pointer;
  }
  
  .bottom:focus {
    outline: none;
    background-color:  rgba(0,110,107, .5);
  }

  .left {
    left: 0;
    background-color: rgba(0,110,107, .9);
  }
  
  .right {
    right: 0;
    background-color: rgba(0,110,107, .9);
  }
  
  </style>