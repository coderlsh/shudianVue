<template>
  <div class="cross-calculate">
    <div class="title">输入</div>
    <a-card :bordered="false" style="width: 80%;margin: 0 auto;">
      <div>
        <div class="input-parameter">
          <div style="color: red;">输入参数</div>
          <a-button @click="getInputParam" type="primary" style="margin-left:10px;top: -2px">打开输入参数</a-button>
          <!-- <div><span>待放线规格</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>档距（m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>高差（m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>跨越物与承载索高侧悬点平距（m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>跨越物与承载索高侧悬点垂距（m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索直径（mm）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索破断力（N）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>有包裹承载索自重力（N/m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>无包裹承载索自重力W0(N/m)</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索封网始点（距高侧悬点）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索封网终点（距高侧悬点）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索弹性系数E(N/mm2)</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>子导线根数（根）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>待放线单位长度重量（N/m）</span><span class="input-container"><a-input style="width: 70%;height: 100%;margin-left: 12px" /></span></div> -->
        </div>
        <div class="input-parameter">
          <div style="color: red;">待调参数</div>
          <div><span>承载索封网栏棒间隔（m）</span><span class="input-container"><a-input v-model="interval" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>承载索封网栏棒每道重（N）</span><span class="input-container"><a-input v-model="gravity" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
        </div>
        <div class="input-param">
          <div style="color: red;">由输入获取得到的参数</div>
          <div><span>COSφ</span><span class="input-text">{{cos}}</span></div>
          <div><span>封网长度C(m)</span><span class="input-text">{{screenLength}}</span></div>
          <div><span>封网器具总重力G(N)</span><span class="input-text">{{screenTotalGravity}}</span></div>
          <div><span>单根承索上封顶网自重力(N/m)</span><span class="input-text">{{singleScreenGravity}}</span></div>
          <div><span>单根承索上导线自重力(N/m)</span><span class="input-text">{{singleRopeGravity}}</span></div>
          <div><span>封网上附加自重力W（N/m）</span><span class="input-text">{{additionalGravity}}</span></div>
          <div><span>封网始点受集中力（N）</span><span class="input-text">{{concentrateStartOfnetwork}}</span></div>
          <div><span>封网终点受集中力（N）</span><span class="input-text">{{concentrateEndOfnetwork}}</span></div>
          <div><span>承载索载有效横截面积S(mm2)</span><span class="input-text">{{effectiveCrossArea}}</span></div>
        </div>
      </div>
    </a-card>
    <div class="title">安装状态</div>
    <a-card :bordered="false" style="width: 80%;margin: 0 auto;">
      <div>
        <div class="installation-parameter">
          <div><span style="color: red;">安装初张力H1(N)</span><span class="installation-container"><a-input v-model="installationTension" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>计算档线长ＬAB</span><span class="installation-text">{{calculateLineLength}}</span></div>
          <div><span>中点弧垂f（m）</span><span class="installation-text">{{midpointSag}}</span></div>
          <div><span>跨越物对高侧承载索悬点 水平距b（m）</span><span style="right:16px" class="installation-text">{{highsideHorizontalDistance}}</span></div>
          <div><span>跨越物对高侧承载索悬点 垂距yb（m）</span><span style="right:16px" class="installation-text">{{highsideVerticalDistance}}</span></div>
          <div><span>跨越处线点 距高侧Y</span><span class="installation-text">{{highsideCrossingline}}</span></div>
          <div><span>线与跨越物 垂距裕度（m）</span><span class="installation-text">{{offsetMargin}}</span></div>
          <div><span>索安全系数 K</span><span class="installation-text">{{ropeSafetyFactor}}</span></div>
        </div>
        <div></div>
      </div>
    </a-card>
    <div class="title">封网状态</div>
    <a-card :bordered="false" style="width: 80%;margin: 0 auto;">
      <div>
        <div class="installation-parameter">
          <div><span style="color: red;">封网后张力H2(N)</span><span class="installation-container"><a-input v-model="afterSealingTension" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>状态式 A</span><span class="installation-text">{{sealStatefulA}}</span></div>
          <div><span>状态式 B</span><span class="installation-text">{{sealStatefulB}}</span></div>
          <div><span>承索增大系数 K2</span><span class="installation-text">{{ropeIncreaseFactorK2}}</span></div>
          <div><span>承索增大系数 K21</span><span class="installation-text">{{ropeIncreaseFactorK21}}</span></div>
          <div><span>承索增大系数 K22</span><span class="installation-text">{{ropeIncreaseFactorK22}}</span></div>
          <div><span>状态式 A-B=0</span><span class="installation-text">{{sealStatefulAsubB}}</span></div>
          <div><span>档内线长 L（m）</span><span class="installation-text">{{sealSpanLength}}</span></div>
          <div><span>中点弧垂 f（m）</span><span class="installation-text">{{sealMidpointSag}}</span></div>
          <div><span>跨越处线点 距高侧Y</span><span class="installation-text">{{sealHighsideCrossingline}}</span></div>
          <div><span>线与跨越物 垂距裕度（m）</span><span class="installation-text">{{sealOffsetMargin}}</span></div>
          <div><span>索安全系数 K</span><span class="installation-text">{{sealRopeSafetyFactor}}</span></div>
        </div>
        <div></div>
      </div>
    </a-card>
    <div class="title">事故状态</div>
    <a-card :bordered="false" style="width: 80%;margin: 0 auto;">
      <div>
        <div class="installation-parameter">
          <div><span style="color: red;">跑线后张力H2(N)</span><span class="installation-container"><a-input v-model="malfunctionTension" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>状态式 A</span><span class="installation-text">{{malfunctionStatefulA}}</span></div>
          <div><span>状态式 B</span><span class="installation-text">{{malfunctionStatefulB}}</span></div>
          <div><span>承索增大系数 K3+K4</span><span class="installation-text">{{ropeIncreaseFactorK34}}</span></div>
          <div><span>承索增大系数 K3</span><span class="installation-text">{{ropeIncreaseFactorK3}}</span></div>
          <div><span>承索增大系数 K4</span><span class="installation-text">{{ropeIncreaseFactorK4}}</span></div>
          <div><span>状态式 A-B=0</span><span class="installation-text">{{malfunctionStatefulAsubB}}</span></div>
          <div><span>档内线长 L（m）</span><span class="installation-text">{{malfunctionSpanLength}}</span></div>
          <div><span>中点弧垂 f（m）</span><span class="installation-text">{{malfunctionMidpointSag}}</span></div>
          <div><span>跨越处线点 距高侧Y</span><span class="installation-text">{{malfunctionHighsideCrossingline}}</span></div>
          <div><span>线与跨越物 垂距裕度（m）</span><span class="installation-text">{{malfunctionOffsetMargin}}</span></div>
          <div><span>索安全系数 K</span><span class="installation-text">{{malfunctionRopeSafetyFactor}}</span></div>
        </div>
        <div></div>
      </div>
    </a-card>
    <cross-calcu-modal :modalVisible="isShow"
                       @setModalVisible="setModalVisible">
    </cross-calcu-modal>
    <!-- <a-button type="primary" block>点击拾取第一点的坐标</a-button> -->
  </div>
</template>

<script>
import crossCalcuModal from './modal/crossCalcuModal'

  export default {
    name:"drawingScaleSet",
    data () {
      return {
        isShow: true,

        interval: '',
        gravity: '',

        inputParam: {},

        installationTension: '',

        afterSealingTension: '', 

        malfunctionTension: '',

        cos: '--',
        screenLength: '--',
        screenTotalGravity: '--', 
        singleScreenGravity: '--',
        singleRopeGravity: '--',
        additionalGravity: '--',
        concentrateStartOfnetwork: '--',
        concentrateEndOfnetwork: '--',
        effectiveCrossArea: '--',

        calculateLineLength: '--',
        midpointSag: '--',
        highsideHorizontalDistance: '--',
        highsideVerticalDistance: '--',
        highsideCrossingline: '--',
        offsetMargin: '--',
        ropeSafetyFactor: '--',

        sealStatefulA: '--',
        sealStatefulB: '--',
        ropeIncreaseFactorK2: '--',
        ropeIncreaseFactorK21: '--',
        ropeIncreaseFactorK22: '--',
        sealStatefulAsubB: '--',
        sealSpanLength: '--',
        sealMidpointSag: '--',
        sealHighsideCrossingline: '--',
        sealOffsetMargin: '--',
        sealRopeSafetyFactor: '--',

        malfunctionStatefulA: '--',
        malfunctionStatefulB: '--',
        ropeIncreaseFactorK34: '--',
        ropeIncreaseFactorK3: '--',
        ropeIncreaseFactorK4: '--',
        malfunctionStatefulAsubB: '--',
        malfunctionSpanLength: '--',
        malfunctionMidpointSag: '--',
        malfunctionHighsideCrossingline: '--',
        malfunctionOffsetMargin: '--',
        malfunctionRopeSafetyFactor: '--',
      }
    },
    watch: {
      gravity() {
        if(this.gravity !== '' && isNaN(Number(this.gravity)) !== true) {
          if(this.gravity !== '0') {
            if(this.screenLength !== '--') {
              this.screenTotalGravity = ((this.screenLength / 2.5 + 1) * this.gravity).toFixed(2)
              this.singleScreenGravity = (this.screenTotalGravity / (2 * this.screenLength)).toFixed(3)
              if(this.singleRopeGravity !== '--') {
                this.additionalGravity = (Number(this.singleScreenGravity) + Number(this.singleRopeGravity)).toFixed(3)
              }
            }
          }
          // console.log(this.gravity)
        }else if (this.gravity == '') {
          this.screenTotalGravity = '--'
          this.singleScreenGravity = '--'
          this.additionalGravity = '--'
        }
        this.getSealStatusParam()
        this.getMalfunctionStatusParam()
        //console.log(this.gravity,'111')
      },

      installationTension() {
        this.getInstallationStatusParam()
      },

      afterSealingTension() {
        this.getSealStatusParam()
      },

      malfunctionTension() {
        this.getMalfunctionStatusParam()
      }
    },
    components: {
      crossCalcuModal
    },
    mounted() {
      
    },
    methods: {

      getInputParam() {
        this.isShow = true
      },

      setModalVisible(item) {
        if (!item.closed) {
          this.isShow = false
          this.inputParam = item
          this.perParam()
          // console.log(JSON.stringify(this.inputParam !== '{}'))
        }
      },

      perParam() {
        //console.log(this.inputParam !== '{}')
        if(JSON.stringify(this.inputParam !== '{}')){
          if(this.inputParam.span !== '' && this.inputParam.heightDiff !== ''){
            this.cos = Math.cos(Math.atan(this.inputParam.heightDiff / this.inputParam.span)).toFixed(9)
          }
          if(this.inputParam.cableStarting !== '' && this.inputParam.cableEnding !== ''){
            this.screenLength = Math.abs(this.inputParam.cableStarting - this.inputParam.cableEnding).toFixed(2)
          }
          if(this.inputParam.wireNum !== '' && this.inputParam.wireGravity !== ''){
            this.singleRopeGravity = ((this.inputParam.wireNum * this.inputParam.wireGravity) / 2).toFixed(3)
            if(this.inputParam.cableStarting !== '') {
              this.concentrateStartOfnetwork = (this.inputParam.cableStarting * this.inputParam.wireNum * 
              this.inputParam.wireGravity * 0.2).toFixed(2)
            }
            if(this.inputParam.cableEnding !== '' && this.inputParam.span !== '') {
              this.concentrateEndOfnetwork = ((this.inputParam.span - this.inputParam.cableEnding) * this.inputParam.wireNum * 
              this.inputParam.wireGravity * 0.2).toFixed(2)
            }
            if(this.inputParam.noloadedCableGravity !== '') {
              this.effectiveCrossArea = ((this.inputParam.noloadedCableGravity * 1000) / (9.8 * 0.97)).toFixed(2)
            }
          }
          // if(isNaN(Number(this.gravity)) !== true){
          //   this.screenTotalGravity = ((this.screenLength / 2.5 + 1) / this.gravity).toFixed(2)
          // }
        }
      },

      getInstallationStatusParam() {
        // 跨越物对高侧承载索悬点 水平距b（m）
        if(this.inputParam.toHighHorizontalDistance !== ''){
          this.highsideHorizontalDistance = this.inputParam.toHighHorizontalDistance
        }else {
          this.highsideHorizontalDistance = '--'
        }
        // 跨越物对高侧承载索悬点 垂距yb（m）
        if(this.inputParam.toHighVerticalDistance !== ''){
          this.highsideVerticalDistance = this.inputParam.toHighVerticalDistance
        }else {
          this.highsideVerticalDistance = '--'
        }

        if(this.installationTension !== '' && isNaN(Number(this.installationTension)) !== true) {
          if(this.installationTension !== '0') {
            if(this.inputParam.span !== '' && this.inputParam.loadedCableGravity !== '' && this.cos !== '--') {
              // 计算档线长ＬAB、中点弧垂f（m）
              this.midpointSag = ((this.inputParam.span * this.inputParam.span * this.inputParam.loadedCableGravity) / 
                (8 * this.installationTension * this.cos)).toFixed(2)

              this.calculateLineLength = (this.inputParam.span / this.cos + (8 * this.midpointSag * 
                this.midpointSag * this.cos * this.cos * this.cos) / (3 * this.inputParam.span)).toFixed(3)
              // 跨越处线点 距高侧Y 、 线与跨越物 垂距裕度（m）
              if(this.inputParam.heightDiff !== '' && this.inputParam.toHighHorizontalDistance !== '') {
                this.highsideCrossingline = ((this.inputParam.span * this.inputParam.loadedCableGravity / 
                  (2 * this.installationTension * this.cos) + this.inputParam.heightDiff / this.inputParam.span) * 
                  this.inputParam.toHighHorizontalDistance - this.inputParam.loadedCableGravity * this.inputParam.toHighHorizontalDistance * 
                  this.inputParam.toHighHorizontalDistance / (2 * this.installationTension * this.cos)).toFixed(2)
                if (this.inputParam.toHighVerticalDistance !== '' ) {
                  this.offsetMargin = (this.inputParam.toHighVerticalDistance - this.highsideCrossingline).toFixed(2)
                }
              }
            }

            // 索安全系数 K
            if(this.inputParam.cableBreakingForce !== '') {
              this.ropeSafetyFactor = (this.inputParam.cableBreakingForce / this.installationTension).toFixed(1)
            }
          }
          // console.log(this.gravity)
        }else if (this.installationTension == '') {
          this.midpointSag = '--'
          this.calculateLineLength = '--'
          this.highsideCrossingline = '--'
          this.offsetMargin = '--'
          this.ropeSafetyFactor = '--'
        }

        
      },

      getSealStatusParam() {
        if(this.afterSealingTension !== '' && isNaN(Number(this.afterSealingTension)) !== true) {
          if(this.afterSealingTension !== '0') {
            // 状态式 A
            if(parseFloat(this.installationTension).toString() !== "NaN" && this.inputParam.span !== '' &&
              this.inputParam.loadedCableGravity !== '' && this.inputParam.elasticity !== '' && 
              this.cos !== '--' && this.effectiveCrossArea !== '--') {
                this.sealStatefulA = (this.installationTension - this.inputParam.span * this.inputParam.span * 
                  this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity * this.inputParam.elasticity * 
                  this.effectiveCrossArea * Math.pow(this.cos, 3) / (24 * 
                  this.installationTension * this.installationTension)).toFixed(3)
            }
            // 承索增大系数 K21 、承索增大系数 K22 、承索增大系数 K2 、档内线长 L（m）、中点弧垂 f（m）
            if(this.inputParam.span !== '' && this.inputParam.loadedCableGravity !== '' && 
              this.inputParam.cableEnding !== '' && this.singleScreenGravity !== '--' && 
              this.inputParam.cableStarting !== '' && this.cos !== '--') {
                let x1 = this.singleScreenGravity / this.inputParam.loadedCableGravity
                let x2 = this.inputParam.cableEnding / this.inputParam.span 
                let x3 = this.inputParam.cableStarting / this.inputParam.span 
                this.ropeIncreaseFactorK22 = (1 + 6 * x1 * x2 * x2 + 4 * (x1 * x1 - x1) * Math.pow(x2, 3) - 
                3 * x1 * x1 * Math.pow(x2, 4)).toFixed(5)
                this.ropeIncreaseFactorK21 = (1 + 6 * x1 * x3 * x3 + 4 * (x1 * x1 - x1) * Math.pow(x3, 3) - 
                3 * x1 * x1 * Math.pow(x3, 4)).toFixed(5)
                this.ropeIncreaseFactorK2 = this.ropeIncreaseFactorK22 - this.ropeIncreaseFactorK21
                this.sealSpanLength = (this.inputParam.span / this.cos + Math.pow(this.inputParam.span, 3) * 
                  Math.pow(this.inputParam.loadedCableGravity, 2) * this.cos * this.ropeIncreaseFactorK2 / 
                  (24 * this.afterSealingTension * this.afterSealingTension)).toFixed(2)
                this.sealMidpointSag = Math.sqrt(3 * (this.sealSpanLength - this.inputParam.span / this.cos) * 
                  this.inputParam.span / (8 * Math.pow(this.cos, 3))).toFixed(2)
                // 线与跨越物 垂距裕度（m）、跨越处线点 距高侧Y
                if(this.inputParam.heightDiff !== '' && this.inputParam.toHighHorizontalDistance !== '' && 
                  this.inputParam.toHighVerticalDistance !== '') {
                    this.sealHighsideCrossingline = ((4 * this.sealMidpointSag / this.inputParam.span + 
                      this.inputParam.heightDiff / this.inputParam.span ) * this.inputParam.toHighHorizontalDistance
                      - 4 * this.sealMidpointSag * Math.pow(this.inputParam.toHighHorizontalDistance, 2) /
                      Math.pow(this.inputParam.span, 2)).toFixed(2)
                    this.sealOffsetMargin = (this.inputParam.toHighVerticalDistance - this.sealHighsideCrossingline).toFixed(2)
                }   
                // 状态式 B 
                if(this.inputParam.elasticity !== '' && this.effectiveCrossArea !== '--') {
                  this.sealStatefulB = (this.afterSealingTension - this.inputParam.span * this.inputParam.span * 
                    this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity * this.inputParam.elasticity * 
                    this.effectiveCrossArea * Math.pow(this.cos, 3) * this.ropeIncreaseFactorK2/ (24 * 
                    this.afterSealingTension * this.afterSealingTension)).toFixed(3)
                }
            }
            // 状态式 A-B=0
            if(parseFloat(this.sealStatefulA).toString() !== "NaN" && parseFloat(this.sealStatefulB).toString() !== "NaN") {
              this.sealStatefulAsubB = (this.sealStatefulA - this.sealStatefulB).toFixed(2)
            }
            // 索安全系数 K 
            if(this.inputParam.cableBreakingForce !== '') {
              this.sealRopeSafetyFactor = (this.inputParam.cableBreakingForce / this.afterSealingTension).toFixed(2)
            }
          }
          // console.log(this.gravity)
        }else if (this.installationTension == '') {
          this.sealStatefulA = '--'
          this.ropeIncreaseFactorK22 = '--'
          this.ropeIncreaseFactorK21 = '--'
          this.ropeIncreaseFactorK2 = '--'
          this.sealSpanLength = '--'
          this.sealMidpointSag = '--'
          this.sealHighsideCrossingline = '--'
          this.sealOffsetMargin = '--'
          this.sealStatefulB = '--'
          this.sealStatefulAsubB = '--'
          this.sealRopeSafetyFactor = '--'
        }
      },
      
      getMalfunctionStatusParam() {
        if(this.malfunctionTension !== '' && isNaN(Number(this.malfunctionTension)) !== true) {
          if(this.malfunctionTension !== '0') {
            // 状态式 A
            if(parseFloat(this.installationTension).toString() !== "NaN" && this.inputParam.span !== '' &&
              this.inputParam.loadedCableGravity !== '' && this.inputParam.elasticity !== '' && 
              this.cos !== '--' && this.effectiveCrossArea !== '--') {
                this.malfunctionStatefulA = (this.installationTension - this.inputParam.span * this.inputParam.span * 
                  this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity * this.inputParam.elasticity * 
                  this.effectiveCrossArea * Math.pow(this.cos, 3) / (24 * 
                  this.installationTension * this.installationTension)).toFixed(3)
            }
            // 承索增大系数 K3 、承索增大系数 K4 、承索增大系数 K3 + K4 
            if(this.inputParam.span !== '' && this.inputParam.loadedCableGravity !== '' && 
              this.inputParam.cableEnding !== '' && this.additionalGravity !== '--' && 
              this.inputParam.cableStarting !== '' && this.cos !== '--' && this.concentrateStartOfnetwork !== '--'
              && this.concentrateEndOfnetwork !== '--') {
                let x1 = this.additionalGravity / this.inputParam.loadedCableGravity
                let x2 = this.inputParam.cableEnding / this.inputParam.span 
                let x3 = this.inputParam.cableStarting / this.inputParam.span 
                let K31 = 1 + 6 * x1 * x2 * x2 + 4 * (x1 * x1 - x1) * Math.pow(x2, 3) - 
                  3 * x1 * x1 * Math.pow(x2, 4)
                let K32 = 1 + 6 * x1 * x3 * x3 + 4 * (x1 * x1 - x1) * Math.pow(x3, 3) - 
                  3 * x1 * x1 * Math.pow(x3, 4)
                let K41 = 1 + 12 * this.inputParam.cableStarting * this.concentrateStartOfnetwork / (this.inputParam.span * 
                  this.inputParam.span * this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity) * (Number(this.inputParam.loadedCableGravity) + 
                  this.concentrateStartOfnetwork / this.inputParam.span) * (1 - x3)
                let K42 = 1 + 12 * this.inputParam.cableEnding * this.concentrateEndOfnetwork / (this.inputParam.span * 
                  this.inputParam.span * this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity) * (Number(this.inputParam.loadedCableGravity) + 
                  this.concentrateEndOfnetwork / this.inputParam.span) * (1 - x2)
                
                this.ropeIncreaseFactorK3 = (K31 - K32).toFixed(5)
                this.ropeIncreaseFactorK4 = (Number(K41) + Number(K42)).toFixed(5)
                this.ropeIncreaseFactorK34 = (Number(this.ropeIncreaseFactorK3) + Number(this.ropeIncreaseFactorK4)).toFixed(5)
                
                
                  
                // 状态式 B 
                if(this.inputParam.elasticity !== '' && this.effectiveCrossArea !== '--') {
                  this.malfunctionStatefulB = (this.malfunctionTension - this.inputParam.span * this.inputParam.span * 
                    this.inputParam.loadedCableGravity * this.inputParam.loadedCableGravity * this.inputParam.elasticity * 
                    this.effectiveCrossArea * Math.pow(this.cos, 3) * this.ropeIncreaseFactorK34/ (24 * 
                    this.malfunctionTension * this.malfunctionTension)).toFixed(3)
                  // 档内线长 L（m）、中点弧垂 f（m）
                  if(this.calculateLineLength !== '--' ) {
                    this.malfunctionSpanLength = (this.malfunctionTension / this.effectiveCrossArea *
                      this.inputParam.span / this.inputParam.elasticity + Number(this.calculateLineLength)).toFixed(2)
                    this.malfunctionMidpointSag = Math.sqrt(3 * (this.malfunctionSpanLength - this.inputParam.span / this.cos) * 
                      this.inputParam.span / (8 * Math.pow(this.cos, 3))).toFixed(2)
                    
                    // 线与跨越物 垂距裕度（m）、跨越处线点 距高侧Y
                    if(this.inputParam.heightDiff !== '' && this.inputParam.toHighHorizontalDistance !== '' && 
                      this.inputParam.toHighVerticalDistance !== '') {
                        this.malfunctionHighsideCrossingline = ((4 * this.malfunctionMidpointSag / this.inputParam.span + 
                          this.inputParam.heightDiff / this.inputParam.span ) * this.inputParam.toHighHorizontalDistance
                          - 4 * this.malfunctionMidpointSag * Math.pow(this.inputParam.toHighHorizontalDistance, 2) /
                          Math.pow(this.inputParam.span, 2)).toFixed(2)
                        this.malfunctionOffsetMargin = (this.inputParam.toHighVerticalDistance - this.malfunctionHighsideCrossingline).toFixed(2)
      
                    } 
                  }
                }
            }
            // 状态式 A-B=0
            if(parseFloat(this.malfunctionStatefulA).toString() !== "NaN" && parseFloat(this.malfunctionStatefulB).toString() !== "NaN") {
              this.malfunctionStatefulAsubB = (this.malfunctionStatefulA - this.malfunctionStatefulB).toFixed(2)
            }
            // 索安全系数 K 
            if(this.inputParam.cableBreakingForce !== '') {
              this.malfunctionRopeSafetyFactor = (this.inputParam.cableBreakingForce / this.malfunctionTension).toFixed(2)
            }
          }
          // console.log(this.gravity)
        }else if (this.installationTension == '') {
          this.malfunctionStatefulA = '--'
          this.malfunctionStatefulB = '--'
          this.ropeIncreaseFactorK34 = '--'
          this.ropeIncreaseFactorK3 = '--'
          this.ropeIncreaseFactorK4 = '--'
          this.malfunctionStatefulAsubB = '--'
          this.malfunctionSpanLength = '--'
          this.malfunctionMidpointSag = '--'
          this.malfunctionHighsideCrossingline = '--'
          this.malfunctionOffsetMargin = '--'
          this.malfunctionRopeSafetyFactor = '--'
        }
      },
      
      numExam(e) {
        if(isNaN(Number(e.path[0].value))) {
          this.$message.warning('请输入数字！')
          // console.log(isNaN(Number(this.gravity)),Number(this.gravity),isNaN(this.gravity))
        }
        // console.log(e,Number(e.data),Number(e.data) == NaN,isNaN(Number(e.data)),e.path[0].value)
      },
    },

  }
</script>

<style scoped>
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }

.title {
  color: white;
  font-size: medium;
  padding: 0.2rem 11.1rem;
}

.input-parameter {
  padding-top: 5px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.input-parameter div {
  width: 33%;
  padding-bottom: 10px;
  position: relative;
}

.input-parameter div .input-container{
  position: absolute;
  height: 24px;
  right: 22px;
  top: -3px;
}

.input-param {
  padding-top: 5px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.input-param div {
  width: 25%;
  padding-bottom: 10px;
  position: relative;
}

.input-param div .input-text{
  position: absolute;
  height: 24px;
  right: 47px;
  top: 1px;
}

.installation-parameter {
  padding-top: 5px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.installation-parameter div {
  width: 25%;
  padding-bottom: 10px;
  position: relative;
}

.installation-parameter div .installation-container{
  position: absolute;
  height: 24px;
  right: -3px;
  top: -3px;
}

.installation-parameter div .installation-text {
  position: absolute;
  height: 24px;
  right: 47px;
  top: 1px;
}
</style>
