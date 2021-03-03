<template>
  <div class="drawing-scaleSet">
    <wizard-step
      :show1=true
      from='tractorParam'
      next='extractCoordinate'
    ></wizard-step>
    <a-card title="确定横向比例" :bordered="false" style="width: 80%;top: 10px;margin: 0 auto;">
      <div class="clearfix">
        <a-button @click="getPoint(1)"  type="primary" block>点击拾取第一点的坐标</a-button>
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          图纸距离（横向）：
          <a-input v-model="drawingHorizontalDist" placeholder="Basic usage" style="width: 70%"/>
          (mm)
        </div>
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          图纸距离（纵向）：
          <a-input v-model="drawingLongitudinalDist" placeholder="Basic usage" style="width: 70%"/>
          (mm)
        </div>
        <a-button @click="getPoint(2)" style="top: 10px" type="primary" block>点击拾取第二点的坐标</a-button>
      </div>
    </a-card>
    <a-card title="实际距离" :bordered="false" style="width: 80%;top: 20px;margin: 0 auto;">
      <div class="clearfix">
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          实际距离（横向）：
          <a-input v-model="realHorizontalDist" placeholder="Basic usage" style="width: 70%"/>
          (m)
        </div>
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          实际距离（纵向）：
          <a-input v-model="realLongitudinalDist" placeholder="Basic usage" style="width: 70%"/>
          (m)
        </div>
      </div>
    </a-card>
    <a-card title="显示结果" :bordered="false" style="width: 80%;top: 30px;margin: 0 auto;">
      <div class="clearfix">
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          横向比例： {{horizontalRatio}}
          <!-- <a-input v-model="horizontalRatio" placeholder="Basic usage" style="width: 70%"/> -->
        </div>
        <div style="display: flex;justify-content: center;align-items: center;margin: 10px auto;width: 65%;">
          纵向比例： {{verticalRatio}}
          <!-- <a-input v-model="verticalRatio" placeholder="Basic usage" style="width: 70%"/> -->
        </div>
      </div>
    </a-card>
    <!-- <a-button type="primary" block>点击拾取第一点的坐标</a-button> -->
  </div>
</template>

<script>
import wizardStep from 'components/wizardStep/wizardStep.vue'

  export default {
    name:"drawingScaleSet",
    data () {
      return {
        point1: {},
        point2: {},

        realHorizontalDist: 800,
        realLongitudinalDist: 2.5,

        index: 1
      }
    },
    
    computed: {
      drawingHorizontalDist() {
        return this.$store.state.point1.x - this.$store.state.point2.x || 160
      },
      drawingLongitudinalDist() {
        return this.$store.state.point1.y - this.$store.state.point2.y || 5
      },
      verticalRatio() {
        if(this.realLongitudinalDist) {
          return this.realLongitudinalDist * 1000 / this.drawingLongitudinalDist || ''
        }else {
          return ''
        }
      },
      horizontalRatio() {

        if(this.realHorizontalDist) {
          return this.realHorizontalDist * 1000 / this.drawingHorizontalDist || ''
        }else {
          return ''
        }
      }
    },
    components: {
      wizardStep
    },
    mounted() {
      document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
    },
    methods: {
      getPoint(index) {
        this.$store.commit('visibleAble', false)
        this.index = index
        let timeId = setTimeout(() => {
          console.log('start')
          this.dosome()
          clearTimeout(timeId)
          console.log('ending')
        }, 300)


        // this.$store.commit('visibleAble', false)
        // console.log(Number(index))
        // document.getElementById("MxDrawXCtrl").DoCommand(Number(index));
      },

      dosome(){
        console.log('ining...')
        document.getElementById("MxDrawXCtrl").DoCommand(Number(this.index))
      },

      DoCommandEventFunc(iCmd){
            if (iCmd == 1) 
            {
            var mxOcx = document.all.item("MxDrawXCtrl");
                mxOcx.focus();
            var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点1:");
            //console.log(point1.x,point1.y)
            var point = {}
            point['x'] = point1.x
            point['y'] = point1.y
            this.$store.commit('changePoint1', point)
            this.$store.commit('visibleAble', true)
            }
            if(iCmd == 2) {
              var mxOcx = document.all.item("MxDrawXCtrl");
                  mxOcx.focus();
              var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
              //console.log(point1.x,point1.y)
              var point = {}
              point['x'] = point1.x
              point['y'] = point1.y
              this.$store.commit('changePoint2', point)
              this.$store.commit('visibleAble', true)
            }
            if(iCmd == 3) {
            var mxOcx = document.all.item("MxDrawXCtrl");
            mxOcx.SendStringToExecute("OpenDwg");
            } 
        },
    },
    beforeRouteLeave (to, from, next) {
        this.$store.commit('getRotio', { kx:this.horizontalRatio,ky:this.verticalRatio })
        next()
    },
  }
</script>

<style scoped>
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }


</style>
