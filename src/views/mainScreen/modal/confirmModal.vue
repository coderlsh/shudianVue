<template>
  <div class="modal-box">
    <div class="content">
      <div class="wraper">
        <div style="padding: 10px">打开了相同放线段的文件夹，是否恢复上一次退出时的选取坐标值和控制点</div>
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
    width: 370px;
    height: 165px;
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
    display: flex;
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
    position: absolute;
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