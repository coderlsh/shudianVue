<template>
  <div class="modal1">
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
      style="top: 500px;width: 610px;margin: 0 auto;"
      :bodyStyle="{ height: '650px',width: '610px'}"
      wrapClassName="modal"
      @cancel="handleCancle"
    >
      <div class="CurveContainer">
          <div class="mrb-10 p-50">
            导线根数：<a-input style="width: 30%" v-model="n"></a-input>
          </div>
          <a-card hoverable  title="导引绳牵牵引绳" style="width: 80%;margin: 0 auto;">
            <div class="mrb-10">
              张力场位置：
              <a-radio-group v-model="value1">
                <a-radio :value="1">
                  左
                </a-radio>
                <a-radio :value="2">
                  右
                </a-radio>
              </a-radio-group>
            </div>
            <div>
              牵引方式：
              <a-select default-value="1" style="width: 120px" @change="handleChange">
                <a-select-option value="1">
                  一牵一
                </a-select-option>
                <a-select-option value="2">
                  一牵二
                </a-select-option>
                <a-select-option value="3">
                  一牵三
                </a-select-option>
                <a-select-option value="4">
                  一牵四
                </a-select-option>
                <a-select-option value="6">
                  一牵六
                </a-select-option>
                <a-select-option value="8">
                  一牵八
                </a-select-option>
              </a-select>
            </div>
          </a-card>   
          <a-card hoverable  title="牵引绳牵导线" style="width: 80%;top: 20px;margin: 0 auto;">
            <div class="mrb-10">
              张力场位置：
              <a-radio-group v-model="value2">
                <a-radio :value="1">
                  左
                </a-radio>
                <a-radio :value="2">
                  右
                </a-radio>
              </a-radio-group>
            </div>
            <div>
              牵引方式：
              <a-select default-value="4" style="width: 120px" @change="handleChange2">
                <a-select-option value="1">
                  一牵一
                </a-select-option>
                <a-select-option value="2">
                  一牵二
                </a-select-option>
                <a-select-option value="3">
                  一牵三
                </a-select-option>
                <a-select-option value="4">
                  一牵四
                </a-select-option>
                <a-select-option value="6">
                  一牵六
                </a-select-option>
                <a-select-option value="8">
                  一牵八
                </a-select-option>
              </a-select>
            </div>
          </a-card> 
          <a-card hoverable  title="滑车参数" style="width: 80%;top: 40px;margin: 0 auto;">
            <div class="mrb-10">
              承载力（N）：<a-input style="width: 30%" v-model="bearingCapacity"></a-input>
            </div>
          </a-card>  
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

          n: 4,

          value1: 1,
          tracWay1: 1,

          value2: 1,
          tracWay2: 4,

          bearingCapacity: 49000
        }
    },
    watch: {
    },
    computed: {
      
    },
    created () {
        
    },
    methods: {

      handleChange(e) {
          
          this.tracWay1 = e
          console.log(e,this.tracWay1)
      },
      
      handleChange2(e) {
          
          this.tracWay2 = e
          console.log(e,this.tracWay1)
      },

      handleCancle(e) {
          let item = {
            n: this.n,

            value1: this.value1,
            tracWay1: this.tracWay1,

            value2: this.value2,
            tracWay2: this.tracWay2,

            bearingCapacity: this.bearingCapacity,

            closed: false
          }
          
          this.$emit('setModalVisible', item);
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
      width: 610px;
      height: 650px;
      margin: 0 auto;
    }
    .modal1 .ant-modal-body {
        overflow-y:auto;
    }
    /* 设置滚动条样式 */
    .modal1 .ant-modal-body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 4px;
        background-color: transparent;
    }

    .modal1 .ant-modal-body::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }

    .modal1 .ant-modal-body::-webkit-scrollbar-thumb {
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
    button.ant-modal-close,
    .ant-modal-close:focus, 
    .ant-modal-close:hover {
        color: rgb(255, 255, 255);
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

    /* 下拉选择框间隔 */
    .signal >>> .ant-select {
        margin-right: 15px;
    }

    /* 下拉箭头颜色 */
    .signal .ant-select-arrow {
    color: #D7DFE7;
    }

    /* 修改选择框样式 */
    .signal >>> .ant-select-selection {
    background-color: transparent;
    border: 1px solid #0D65CC;
    color: #D7DFE7;
    width: 130px;
    }

    /* 选择框中的标签样式 */
    .signal >>> .ant-select-selection--multiple .ant-select-selection__choice {
    background-color: rgba(13, 101, 204,0.7);
    border: none;
    color: #D7DFE7;
    }

    .topOfCurveContainer .titleOfCurve {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 50%);
    }
    .topOfCurveContainer .titletitleOfCurve span {
        width: 100%;
    }

    .topOfCurveContainer .selectSignal {
        position: absolute;
        right: 0;
        transform: translate(0, 50%);
        display: flex;
        margin-right: 25px;
    }

    .topOfCurveContainer .selectSignal .selectSignalItem {
        margin-right: 10px;
    }

    /* echarts容器格式 */
    .trendCurveChart {
        box-sizing: content-box;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 1rem;
        height: 89%;
        width: 100%;
    }
</style>