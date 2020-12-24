<template>
  <div class="cross-modal">
    <a-modal
    class="extr-modal"
      :footer="null"
      :visible="modalVisible"
      :confirmLoading="confirmLoading"
      :closable="true"
      :mask="false"
      :maskClosable="false"
      :z-index="1000"
      :width="1610"
      style="top: 500px;width: 430px;margin: 0 auto;"
      :bodyStyle="{ height: '430px',width: '1200px'}"
      wrapClassName="modal"
      @cancel="handleCancle"
    >
        <div class="CurveContainer">
          <div style="font-size: 20px;padding-bottom: 11px;
                      border-bottom: 1px solid;margin-bottom: 14px;">输入参数</div>
          <div class="input-parameter">
            <div><span>待放线规格</span><span class="input-container"><a-input v-model="wireSpecification"  style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>档距（m）</span><span class="input-container"><a-input v-model="span" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>高差（m）</span><span class="input-container"><a-input v-model="heightDiff" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>跨越物与承载索高侧悬点平距（m）</span><span class="input-container"><a-input v-model="toHighHorizontalDistance" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>跨越物与承载索高侧悬点垂距（m）</span><span class="input-container"><a-input v-model="toHighVerticalDistance" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>承载索直径（mm）</span><span class="input-container"><a-input v-model="cableDiameter" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>承载索破断力（N）</span><span class="input-container"><a-input v-model="cableBreakingForce" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>有包裹承载索自重力（N/m）</span><span class="input-container"><a-input v-model="loadedCableGravity" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>无包裹承载索自重力W0(N/m)</span><span class="input-container"><a-input v-model="noloadedCableGravity" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>承载索封网始点（距高侧悬点）</span><span class="input-container"><a-input v-model="cableStarting" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>承载索封网终点（距高侧悬点）</span><span class="input-container"><a-input v-model="cableEnding" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>承载索弹性系数E(N/mm2)</span><span class="input-container"><a-input v-model="elasticity" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>子导线根数（根）</span><span class="input-container"><a-input v-model="wireNum" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
            <div><span>待放线单位长度重量（N/m）</span><span class="input-container"><a-input v-model="wireGravity" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>

export default {
    props: {
      modalVisible:false
    },
    data () {
        return {
          confirmLoading: false,

          wireSpecification: '',
          span: '439',
          heightDiff: '10',
          toHighHorizontalDistance: '100',
          toHighVerticalDistance: '21.2',
          cableDiameter: '18',
          cableBreakingForce: '243000',
          loadedCableGravity: '3.49',
          noloadedCableGravity: '1.8228',
          cableStarting: '69.5',
          cableEnding: '130.5', 
          elasticity: '30500',
          wireNum: '4',
          wireGravity: '20.364',

          back: true
        }
    },
    watch: {
    },
    computed: {
      
    },
    created () {
        
    },
    methods: {
      numExam(e) {
        if(isNaN(Number(e.path[0].value))) {
          this.$message.warning('请输入数字！')
          this.back = false
        }else {
          this.back = true
        }
        // console.log(e,Number(e.data),Number(e.data) == NaN,isNaN(Number(e.data)),e.path[0].value)
      },

      handleCancle(e) {
        if(this.back) {
          let item = {
            wireSpecification: this.wireSpecification,
            span: this.span,
            heightDiff: this.heightDiff,
            toHighHorizontalDistance: this.toHighHorizontalDistance,
            toHighVerticalDistance: this.toHighVerticalDistance,
            cableDiameter: this.cableDiameter,
            cableBreakingForce: this.cableBreakingForce,
            loadedCableGravity: this.loadedCableGravity,
            noloadedCableGravity: this.noloadedCableGravity,
            cableStarting: this.cableStarting,
            cableEnding: this.cableEnding, 
            elasticity: this.elasticity,
            wireNum: this.wireNum,
            wireGravity: this.wireGravity,

            closed: false,
          }
          
          this.$emit('setModalVisible', item);
        }else {
          this.$message.warning('输入参数不合适！请修改')
        }
          
      },

    },
    mounted() {
     
    },
}
</script>

<style scoped>

    /* margin-right 20px */
    .mr-20{
        margin-right: 20px;
    }

    /* margin-right 10px */
    .mrb-10{
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .p-50 {
      padding-left: 50px;
    }

    .ml-156 {
      margin-left: 156px;
    }

    .extr-modal >>> .ant-modal-content {
      background-color: rgba(0,110,107, .9);
      box-shadow: 0 0 24px rgba(0,110,107, .8) inset;
      color:rgb(255, 255, 255);
      width: 1200px;
      height: 430px;
      margin: 0 auto;
    }
    .cross-modal .ant-modal-body {
        overflow-y:auto;
    }
    /* 设置滚动条样式 */
    .cross-modal .ant-modal-body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 4px;
        background-color: transparent;
    }

    .cross-modal .ant-modal-body::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }

    .cross-modal .ant-modal-body::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 4px;
        background-color: rgba(66, 75, 112, .4);
    }


    .detail {
        margin-left:338px;
        margin-top:-15px;
        height: 42px;
        width: 42px;
        position:fixed;
        cursor:pointer;
        transition: .6s;
    }
    .detail:hover {
        transform-origin: center;
        transform: scale(0.9, 0.9);
    }
    
    
    .CurveContainer {
        position: relative;
        height: 100%;
    }

    .topOfCurveContainer {
        position: relative;;
    }

    .signal {
        position: absolute;
    }

    .extr-modal >>> .ant-modal-close  {
      color: white;
    }

    .input-parameter {
      padding-top: 5px;
      display: flex;
      flex-wrap: wrap;
    }

    .input-parameter div {
      width: 50%;
      padding-bottom: 17px;
      position: relative;
      font-size: 18px;
    }

    .input-parameter div .input-container{
      position: absolute;
      /* height: 24px; */
      right: 47px;
      top: -2px;
    }
</style>