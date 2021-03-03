<template>
  <div id="containBox" ref="containBox" class="container">
      <div class="left"></div>
      <div class="center">
        <a-tabs class="table-container" default-active-key="1" style="top: 20px;margin: 0 auto;">
            <a-tab-pane key="1" tab="导引绳牵牵引绳">
                <div class="export-msg">张力场位于{{tracPosition1}}侧，张力机出口张力为：{{exportT1}} N，
                    控制档档号为：{{firstGear}}，
                    牵引机最大牵引力为：{{Tmax1}} N
                    <a-button @click="drawLine" :disabled="drawFlag" type="primary" style="margin-left:10px;top: -2px">查看绘图</a-button>
                    <a-button @click="reDraw" type="primary" style="margin-left:10px;top: -2px">重新绘图</a-button>
                </div>
                <a-table class="table1" :columns="columns1" 
                    :scroll="{ x: 1300 }"    
                    :data-source="data1">
                </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="牵引绳牵导线" force-render>
                <div class="export-msg">张力场位于{{tracPosition2}}侧，张力机出口张力为：{{exportT2}} N，
                    控制档档号为：{{secondGear}}，
                    牵引机最大牵引力为：{{Tmax2}} N
                    <a-button @click="drawLine" :disabled="drawFlag" type="primary" style="margin-left:20px;top: -2px">查看绘图</a-button>
                    <a-button @click="reDraw" type="primary" style="margin-left:10px;top: -2px">重新绘图</a-button>
                </div>
                <a-table class="table1" :columns="columns2" 
                    :scroll="{ x: 1300 }"    
                    :data-source="data2">
                </a-table>
            </a-tab-pane>
        </a-tabs>
      </div>
      <div class="right"></div>
      
      
      <extract-calculate-modal :modalVisible="isShow1"
                               @setModalVisible="setModalVisible">
      </extract-calculate-modal>
      <caclu-confirm-modal :Tmax1='Tmax1'
                           :Tmax2='Tmax2'
                           :preMsg='preMsg'
                           :preMsg2='preMsg2'
                           v-show="showSafeWarning"
                           @cancel="cancel" 
                           @confirm="confirm"
                           @safeWarning="safeWarning">
      </caclu-confirm-modal>
  </div>
</template>

<script>
//import { pretreat } from 'common/stretchCalculation.js'

import extractCalculateModal from './modal/extractCalculateModal'
import cacluConfirmModal from './modal/cacluConfirmModal'

const columns1 = [
  {
    title: '塔杆号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '牵引绳到达此杆时牵引机牵引力',
    dataIndex: 'traction',
    key: 'traction',
  },
  {
    title: '牵引绳水平张力',
    dataIndex: 'leashedHorizontalTension',
    key: 'leashedHorizontalTension',
   
  },
  {
    title: '牵引绳到达此杆前一杆时，此杆张力侧水平张力',
    dataIndex: 'leashHorizontalTensionBefore',
    key: 'leashHorizontalTensionBefore',

  },
  {
    title: '牵引绳到达此杆前一杆时，此杆牵引侧水平张力',
    dataIndex: 'leashHorizontalTensionAfter',
    key: 'leashHorizontalTensionAfter',

  },
  {
    title: '牵引绳线长',
    dataIndex: 'leashedlineLength',
    key: 'leashedlineLength',

  },
  {
    title: '牵引绳包络角',
    dataIndex: 'leashedenvelopeAngle',
    key: 'leashedenvelopeAngle',

  },
  {
    title: '滑车承载（牵引绳上扬力）',
    dataIndex: 'bearer',
    key: 'bearer',

  },
//   {
//     title: '牵引绳垂直档距',
//     dataIndex: 'leashedoffset',
//     key: 'leashedoffset',
 
//   },
  {
    title: '牵引绳经过时挂双滑车',
    dataIndex: 'doublePulley',
    key: 'doublePulley',

  },
  {
    title: '牵引绳上扬',
    dataIndex: 'leashedRise',
    key: 'leashedRise',

  },
  {
    title: '导引绳包络角',
    dataIndex: 'leashEnvelopeAngle',
    key: 'leashEnvelopeAngle',

  },
  {
    title: '导引绳上扬力',
    dataIndex: 'leashRisePower',
    key: 'leashRisePower',

  },
  {
    title: '导引绳经过时挂双滑车',
    dataIndex: 'leashDoublePulley',
    key: 'leashDoublePulley',

  },
  {
    title: '导引绳上扬',
    dataIndex: 'leashRise',
    key: 'leashRise',

  },
];

const columns2 = [
  {
    title: '塔杆号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '走板到达此杆时牵引机牵引力',
    dataIndex: 'traction',
    key: 'traction',
  },
  {
    title: '导线水平张力',
    dataIndex: 'leashedHorizontalTension',
    key: 'leashedHorizontalTension',
   
  },
  {
    title: '走板到达此杆前一杆时，此杆张力侧水平张力',
    dataIndex: 'leashHorizontalTensionBefore',
    key: 'leashHorizontalTensionBefore',

  },
  {
    title: '走板到达此杆前一杆时，此杆牵引侧水平张力',
    dataIndex: 'leashHorizontalTensionAfter',
    key: 'leashHorizontalTensionAfter',

  },
  {
    title: '导线线长',
    dataIndex: 'leashedlineLength',
    key: 'leashedlineLength',

  },
  {
    title: '导线包络角',
    dataIndex: 'leashedenvelopeAngle',
    key: 'leashedenvelopeAngle',

  },
  {
    title: '滑车承载（导线上扬力）',
    dataIndex: 'bearer',
    key: 'bearer',

  },
  {
    title: '导线垂直档距',
    dataIndex: 'leashedoffset',
    key: 'leashedoffset',
 
  },
  {
    title: '导线经过时挂双滑车',
    dataIndex: 'doublePulley',
    key: 'doublePulley',

  },
  {
    title: '导线上扬',
    dataIndex: 'leashedRise',
    key: 'leashedRise',

  },
  {
    title: '牵引线包络角',
    dataIndex: 'leashEnvelopeAngle',
    key: 'leashEnvelopeAngle',

  },
  {
    title: '牵引线上扬力',
    dataIndex: 'leashRisePower',
    key: 'leashRisePower',
  },
  {
    title: '牵引线经过时挂双滑车',
    dataIndex: 'leashDoublePulley',
    key: 'leashDoublePulley',

  },
  {
    title: '牵引线上扬',
    dataIndex: 'leashRise',
    key: 'leashRise',

  },
];


  export default {
    name:"stretCalculation",
    
    data () {
      return {
          isShow1: true,

          showSafeWarning: false,

          columns1,
          columns2,
          data1: [],
          data2: [],

          k_x: 5000,
          K_y: 500,

          Q: 49000,

          preMsg: {
              landh: [],
              realXandY: [],
              angle: [],
              rotateNum: [],
              leashCoefficient: [],
              leashedCoefficient: [],
              w0: 19.67982,
              ϵ0: 1.015,
              w: 16.8854,
              ϵ: 1.015,
              n:4,
              breakingForce: 1,
              safelimit: 3,
              breakingForce0: 360,
              safelimit0: 100,
          },

          preMsg2: {
              landh: [],
              realXandY: [],
              angle: [],
              rotateNum: [],
              leashCoefficient: [],
              leashedCoefficient: [],
              w0: 19.67982,
              ϵ0: 1.015,
              w: 16.8854,
              ϵ: 1.015,
              n:4,
              breakingForce: 1,
              safelimit: 3,
              breakingForce0: 360,
              safelimit0: 300,
          },

          position1: '左',
          gear1: 0,

          maxExportTension1: 0,
          towerAxialTension1: [],
          leashedHorizontalTension1: [],
          arriveTension1: [],
          bearer1: [],
          


          tractionList1: [],

          leashedoffset1: [],
          leashedenvelopeAngle1: [],
          leashedlineLength1: [],
          doublePulley1: [],
          leashedRise1: [],

          leashHorizontalTension1: [],
          leashEnvelopeAngle1: [],
          leashOffset1: [],
          leashDoublePulley1: [],
          leashRise1: [],
          leashRisePower1: [],

          realList1: [],
          realList12: [],

          position2: '左',
          gear2: 0,

          maxExportTension2: 0,
          towerAxialTension2: [],
          leashedHorizontalTension2: [],
          arriveTension2: [],
          bearer2: [],

          tractionList2: [],

          leashedoffset2: [],
          leashedenvelopeAngle2: [],
          leashedlineLength2: [],
          doublePulley2: [],
          leashedRise2: [],

          leashHorizontalTension2: [],
          leashEnvelopeAngle2: [],
          leashOffset2: [],
          leashDoublePulley2: [],
          leashRise2: [],
          leashRisePower2: [],

          realList2: [],
          realList22: [],

          repaint: false,

          drawFlag: false
      }
    },
    created() {
        if(JSON.stringify(this.$store.state.wire) !== '{}') {
            this.preMsg.w0 = Number(this.$store.state.leash[0].massPerMeter) * 9.8
            this.preMsg.ϵ0 = Number(this.$store.state.leash[0].frictionCoefficient)
            this.preMsg.breakingForce0 = Number(this.$store.state.leash[0].breakingForce)
            this.preMsg.safelimit0 = Number(this.$store.state.leash[0].safeLowerLimit)
            this.preMsg.w = Number(this.$store.state.leash[1].massPerMeter) * 9.8
            this.preMsg.ϵ = Number(this.$store.state.leash[1].frictionCoefficient)
            this.preMsg.breakingForce = Number(this.$store.state.leash[1].breakingForce)
            this.preMsg.safelimit = Number(this.$store.state.leash[1].safeLowerLimit)
            this.preMsg2.w0 = Number(this.$store.state.leash[1].massPerMeter) * 9.8
            this.preMsg2.ϵ0 = Number(this.$store.state.leash[1].frictionCoefficient)
            this.preMsg2.breakingForce0 = Number(this.$store.state.leash[1].breakingForce)
            this.preMsg2.safelimit0 = Number(this.$store.state.leash[1].safeLowerLimit)
            this.preMsg2.w = Number(this.$store.state.wire.massPerMeter) * 9.8
            this.preMsg2.ϵ = Number(this.$store.state.wire.frictionCoefficient)
            this.preMsg2.breakingForce = Number(this.$store.state.wire.breakingForce)
            this.preMsg2.safelimit = Number(this.$store.state.wire.safeLowerLimit)
        }
        if(this.$store.state.kx !== 0 && this.$store.state.ky !== 0){
            this.k_x = this.$store.state.kx
            this.K_y = this.$store.state.ky
        }
        if (this.$store.state.changed) {
            this.isShow1 = true
        }else {
            this.isShow1 = false
        }
        this.$store.commit('getColumsName', {name: 'colums1', colums: columns1})
        this.$store.commit('getColumsName', {name: 'colums2', colums: columns2})
        // console.log(this.$store.state)
    },
    computed: {
        tracPosition1() {
            if(JSON.stringify(this.$store.state.otherTracMsg1) !== '{}') {
                return this.$store.state.otherTracMsg1.position
            }else {
                return '-'
            }
        },

        tracPosition2() {
            if(JSON.stringify(this.$store.state.otherTracMsg2) !== '{}') {
                return this.$store.state.otherTracMsg2.position
            }else {
                return '-'
            }
        },

        exportT1() {
            if(JSON.stringify(this.$store.state.otherTracMsg1) !== '{}') {
                return this.$store.state.otherTracMsg1.maxExportTension.toFixed(2)
            }else {
                return '-'
            }
        },

        exportT2() {
            if(JSON.stringify(this.$store.state.otherTracMsg2) !== '{}') {
                return this.$store.state.otherTracMsg2.maxExportTension.toFixed(2)
            }else {
                return '-'
            }
        },

        firstGear() {
            if(JSON.stringify(this.$store.state.otherTracMsg1) !== '{}') {
                return this.$store.state.otherTracMsg1.gear
            }else {
                return '-'
            }
        },

        secondGear() {
            if(JSON.stringify(this.$store.state.otherTracMsg2) !== '{}') {
                return this.$store.state.otherTracMsg2.gear
            }else {
                return '-'
            }
        },

        Tmax1() {
            if(JSON.stringify(this.$store.state.otherTracMsg1) !== '{}') {
                return this.$store.state.otherTracMsg1.Tmax.toFixed(2)
            }else {
                return '-'
            }
        },

        Tmax2() {
            if(JSON.stringify(this.$store.state.otherTracMsg2) !== '{}') {
                return this.$store.state.otherTracMsg2.Tmax.toFixed(2)
            }else {
                return '-'
            }
        },

        
    },
    components: {
        extractCalculateModal,
        cacluConfirmModal
    },
    mounted() {
        // this.pretreat()
        // this.getAngleAndCoefficient()
        // this.getControlTensionAndExportTension()
        // this.getAllLeashedHorizontalTension()
        // this.getExportTraction()
        // this.getEnvelopeAngleAndLineLengthAndOffset()
        // this.getAllLeashHorizontalTension()
        // //this.getXArray()
        // this.getXAndY()
        let elementResizeDetectorMaker = require("element-resize-detector");
        //监听元素变化
        let erd = elementResizeDetectorMaker();
        let that = this;
        erd.listenTo(document.getElementById("containBox"), function (element) {
            that.$nextTick(function () {
                //使echarts尺寸重置
                let containHeight = this.$refs.containBox.offsetWidth
                let changeWidth = document.getElementsByClassName("center")[0].offsetWidth
                let changeNum = containHeight / changeWidth
                if(changeNum >= 1){
                    document.getElementsByClassName("center")[0].style.zoom = 1
                }else{
                    document.getElementsByClassName("center")[0].style.zoom = containHeight / changeWidth
                }
                // console.log('width',containHeight,changeWidth)
            })
        })

        document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
        if(this.$store.state.showStep == true) {
          this.$store.commit('showWizardStep', false)
          this.$message.success('向导结束')
        }
        if (this.$store.state.tableData1.length !== 0) {
            this.data1 = this.$store.state.tableData1
        }
        if (this.$store.state.tableData2.length !== 0) {
            this.data2 = this.$store.state.tableData2
        }

        this.repaint = this.$store.state.repaint
    },
    
    methods: {

        setModalVisible(item) {
            if (!item.closed) {
                
                this.isShow1 = false
                this.showSafeWarning = true
                this.drawFlag = false
                this.preMsg.n = item.tracWay1
                this.preMsg2.n = item.tracWay2
                this.position1 = item.value1 == 2 ? '右' : '左'
                this.position2 = item.value2 == 2 ? '右' : '左'
                this.Q = item.bearingCapacity
                this.$store.commit('changItem', false)
                this.pretreat(this.preMsg, item.value1)
                this.pretreat(this.preMsg2, item.value2)
                this.getAngleAndCoefficient(this.preMsg)
                this.getAngleAndCoefficient(this.preMsg2)
                this.getAllRelatedData1(item.value1)
                this.getAllRelatedData2(item.value2)
                this.getTableData1(item.value1)
                this.getTableData2(item.value2)
                //console.log('1',this.preMsg,'2', this.preMsg2)
            }
        },

        getAllRelatedData1(position) {
            //this.maxExportTension1 = Number(this.getControlTensionAndExportTension(this.preMsg)) 
            let [maxExportTension, gear] = this.getControlTensionAndExportTension(this.preMsg)
            this.maxExportTension1 = maxExportTension
            this.gear1 = gear
            let [towerAxialTension, 
                 leashedHorizontalTension, 
                 arriveTension] = this.getAllLeashedHorizontalTension(this.preMsg, this.maxExportTension1 + 1)
            this.towerAxialTension1 = towerAxialTension
            this.leashedHorizontalTension1 = leashedHorizontalTension
            this.arriveTension1 = arriveTension
            // console.log(this.towerAxialTension1,this.leashedHorizontalTension1,this.arriveTension1)
            this.tractionList1 = this.getExportTraction(this.preMsg, this.towerAxialTension1, this.arriveTension1)
            let [leashedlineLength, 
                 leashedoffset, 
                 leashedenvelopeAngle,
                 bearer,
                 doublePulley,
                 leashedRise] = this.getEnvelopeAngleAndLineLengthAndOffset(this.preMsg, this.leashedHorizontalTension1)
            this.leashedlineLength1 = leashedlineLength
            this.leashedoffset1 = leashedoffset
            this.leashedenvelopeAngle1 = leashedenvelopeAngle
            this.bearer1 = bearer
            this.doublePulley1 = doublePulley
            this.leashedRise1 = leashedRise
            let [leashHorizontalTension, 
                 leashEnvelopeAngle, 
                 leashOffset,
                 leashDoublePulley, 
                 leashRise,
                 leashRisePower
                 ] = this.getAllLeashHorizontalTension(this.preMsg, this.towerAxialTension1)
            this.leashHorizontalTension1 = leashHorizontalTension
            this.leashEnvelopeAngle1 = leashEnvelopeAngle
            this.leashOffset1 = leashOffset
            this.leashDoublePulley1 = leashDoublePulley
            this.leashRise1 = leashRise
            this.leashRisePower1 = leashRisePower
            let [realList, 
                 realList2] = this.getXAndY(this.preMsg, this.leashedHorizontalTension1,this.leashHorizontalTension1, position)
            this.realList1 = realList
            this.realList12 = realList2
        },

        getAllRelatedData2(position) {
            //this.maxExportTension1 = Number(this.getControlTensionAndExportTension(this.preMsg)) 
            let [maxExportTension, gear] = this.getControlTensionAndExportTension(this.preMsg2)
            this.maxExportTension2 = maxExportTension
            this.gear2 = gear
            let [towerAxialTension, 
                 leashedHorizontalTension, 
                 arriveTension] = this.getAllLeashedHorizontalTension(this.preMsg2, this.maxExportTension2 + 1)
            this.towerAxialTension2 = towerAxialTension
            this.leashedHorizontalTension2 = leashedHorizontalTension
            this.arriveTension2 = arriveTension
            // console.log(this.towerAxialTension1,this.leashedHorizontalTension1,this.arriveTension1)
            this.tractionList2 = this.getExportTraction(this.preMsg2, this.towerAxialTension2, this.arriveTension2)
            let [leashedlineLength, 
                 leashedoffset, 
                 leashedenvelopeAngle,
                 bearer,
                 doublePulley,
                 leashedRise] = this.getEnvelopeAngleAndLineLengthAndOffset(this.preMsg2, this.leashedHorizontalTension2)
            this.leashedlineLength2 = leashedlineLength
            this.leashedoffset2 = leashedoffset
            this.leashedenvelopeAngle2 = leashedenvelopeAngle
            this.bearer2 = bearer
            this.doublePulley2 = doublePulley
            this.leashedRise2 = leashedRise
            let [leashHorizontalTension, 
                 leashEnvelopeAngle, 
                 leashOffset,
                 leashDoublePulley, 
                 leashRise,
                 leashRisePower
                 ] = this.getAllLeashHorizontalTension(this.preMsg2, this.towerAxialTension2)
            this.leashHorizontalTension2 = leashHorizontalTension
            this.leashEnvelopeAngle2 = leashEnvelopeAngle
            this.leashOffset2 = leashOffset
            this.leashDoublePulley2 = leashDoublePulley
            this.leashRise2 = leashRise
            this.leashRisePower2 = leashRisePower
            let [realList, 
                 realList2] = this.getXAndY(this.preMsg2, this.leashedHorizontalTension2,this.leashHorizontalTension2, position)
            this.realList2 = realList
            this.realList22 = realList2
        },


        pretreat(preMsg,position) {
            let extraCoord = JSON.parse(JSON.stringify(this.$store.state.extraCoord))
            let controlPoint = JSON.parse(JSON.stringify(this.$store.state.controlPoint))
            if(extraCoord.length != 0){
                for(let i = 0; i < extraCoord.length - 1; i++) {
                    if(extraCoord[i].coordinatePosition == "右" && extraCoord[i+1].coordinatePosition == "左") {
                        if(extraCoord[i].name == extraCoord[i + 1].name ) {
                            let exchang = extraCoord[i]
                            extraCoord[i] = extraCoord[i+1]
                            extraCoord[i + 1] = exchang
                            console.log('extraCoord',extraCoord)
                        }
                    }
                }
            }
            
            if(position == 2) {
                extraCoord = extraCoord.map(function(element){
                 element.xCoordinate = 0 - element.xCoordinate
                 element.yCoordinate = Number(element.yCoordinate)
                 return element;
                })
                controlPoint = controlPoint.map(function(element){
                 element.xCoordinate = 0 - element.xCoordinate
                 element.yCoordinate = Number(element.yCoordinate)
                 return element;
                })
                extraCoord.reverse()
                console.log('extraCoord now',extraCoord)
            }
            
            if(extraCoord.length != 0) {
                let landhList = []
                let realXandYList = []
                let rotateNumList = []
                let key = Object.keys(preMsg)
                let controlKey = key.filter(i => {
                    return !isNaN(Number(i))})
                    .forEach(item => {this.$delete(preMsg, item)})
                let index = 0
                for(let i = 0; i < extraCoord.length - 1; i++) {
                    if(extraCoord[i].coordinatePosition !== "中" && extraCoord[i+1].coordinatePosition !== "中") {
                        index = index + 1
                        continue
                    }else{
                        let l = (extraCoord[i+1].xCoordinate -
                        extraCoord[i].xCoordinate) * this.k_x / 1000
                        let h = (extraCoord[i+1].yCoordinate -
                        extraCoord[i].yCoordinate) * this.K_y / 1000
                        let landh = {
                            l: l.toFixed(2),
                            h: h.toFixed(2)
                        }
                        let realXandY = {
                            x:extraCoord[i].xCoordinate,
                            y:extraCoord[i].yCoordinate
                        }
                        landhList.push(landh)
                        realXandYList.push(realXandY)
                        rotateNumList.push(extraCoord[i].rotationNum / 180 * Math.PI)
                        
                        //console.log(l.toFixed(2), h,h.toFixed(2))
                    }
                    if(controlPoint.length != 0) {
                        for(let j = 0 ; j < controlPoint.length; j++) {
                            if(controlPoint[j].xCoordinate >= extraCoord[i].xCoordinate
                            && controlPoint[j].xCoordinate < extraCoord[i + 1].xCoordinate && 
                            extraCoord[i + 1].name !== extraCoord[i].name) {
                                let X = (extraCoord[i+1].xCoordinate -
                                controlPoint[j].xCoordinate) * this.k_x / 1000 
                                let Yy = (extraCoord[i+1].yCoordinate -
                                controlPoint[j].yCoordinate) * this.K_y / 1000
                                - Number(controlPoint[j].controlDist)
                                //console.log(X,Yy)
                                preMsg[i - index] = {
                                    X: X.toFixed(2),
                                    Yy: Yy.toFixed(2),
                                    name: extraCoord[i].name + '-' + extraCoord[i + 1].name
                                }
                            }
                        }
                    }                    
                    //console.log(perMsg, extraCoord[i+1])
                }
                console.log("perMsg",preMsg)
                preMsg.rotateNum = rotateNumList
                preMsg.landh = landhList
                preMsg.realXandY = realXandYList
            }

        },

        getAngleAndCoefficient(preMsg) {
            if(preMsg.landh.length != 0) {
                let n = preMsg.landh.length
                let angleList = []
                let leashedCoefficientList = []
                let leashCoefficientList = []
                for(let i = 0; i < preMsg.landh.length; i++) {
                    let cos = Math.cos(Math.atan(preMsg.landh[i].h / preMsg.landh[i].l))
                    let leashedCoefficient = preMsg.w * preMsg.landh[i].h * Math.pow(preMsg.ϵ, -i) / cos
                    let leashCoefficient = preMsg.w0 * preMsg.landh[i].h * Math.pow(preMsg.ϵ0, n - i - 1) / cos
                    angleList.push(cos)
                    leashedCoefficientList.push(leashedCoefficient)
                    leashCoefficientList.push(leashCoefficient)
                }
                preMsg.angle = angleList
                preMsg.leashedCoefficient = leashedCoefficientList
                preMsg.leashCoefficient = leashCoefficientList
                console.log('angle and coefficient:',preMsg)
            }
        },

        getControlTensionAndExportTension(preMsg) {
            let key = Object.keys(preMsg)
            let controlKey = key.filter(i => {
                return !isNaN(Number(i))})
            let finalExportTension = 0
            let gear = 0
            console.log('key',controlKey,key)
            for(let i = 0; i < controlKey.length; i++) {
                console.log('i',i)
                let l = preMsg.landh[controlKey[i]].l
                let h = preMsg.landh[controlKey[i]].h
                let w = preMsg.w
                let ϵ = preMsg.ϵ
                let X = preMsg[controlKey[i]].X
                let Yy = preMsg[controlKey[i]].Yy
                let cosi = preMsg.angle[controlKey[i]]
                let horizontalTension = w * (l - X) * X / (2 * cosi * (Yy - h * X / l))
                let offset = l * l * w / ( 8 * horizontalTension * cosi ) * 
                Math.pow((1 + 2 * horizontalTension * cosi * h / (l * l * w)), 2)
                let exportTension = (horizontalTension + w * offset - w * h) * Math.pow(ϵ, -controlKey[i]) - 
                eval(preMsg.leashedCoefficient.slice(0, Number(controlKey[i])).join("+"))
                if(exportTension > finalExportTension) {
                    finalExportTension = exportTension
                    gear = controlKey[i]
                }
                console.log('controlKey[i]:',offset, exportTension, horizontalTension)
            }
            return [finalExportTension, gear]
        },

        getAllLeashedHorizontalTension(preMsg, maxExportTension) {
            let n = preMsg.n
            let Tmax = maxExportTension
            //let Tmax = 14916
            let T = 0
            let Hlist = []
            let Tlist = []
            let w = preMsg.w
            let ϵ = preMsg.ϵ
            for(let i = 0; i < preMsg.landh.length; i++) {
                let h = preMsg.landh[i].h
                let l = preMsg.landh[i].l
                let cos = preMsg.angle[i]
                if(i == 0) {
                  T = Tmax * n
                  //console.log('T:',T)
                  let H = ((Tmax + w * h / (2 * cos)) + 
                  Math.sqrt(Math.pow((Tmax + w * h / (2 * cos)),2) - l * l * w * w * (1 + h * h /(2 * l * l)) /(2 *cos))) /
                  (2 * (1 + h * h /( 2 * l * l)))
                  Hlist.push(H)
                  Tlist.push(T)
                  //console.log(T,H)
                }else {
                  let lasth = preMsg.landh[i-1].h
                  let lastcos = preMsg.angle[i-1]
                  T = (T + n * w * lasth / lastcos) * ϵ
                  let H = ((T / n + w * h / (2 * cos)) + 
                  Math.sqrt(Math.pow((T / n + w * h / (2 * cos)),2) - l * l * w * w * (1 + h * h /(2 * l * l)) /(2 *cos))) /
                  (2 * (1 + h * h /( 2 * l * l)))
                  console.log('sqrt:',Math.pow((T / n + w * h / (2 * cos)),2) - l * l * w * w * (1 + h * h /(2 * l * l)) /(2 *cos))
                  Hlist.push(H)
                  Tlist.push(T)
                  //console.log(T,H)
                }
            }
            if(preMsg.landh.length !== 0) {
                let arriveTension = T + n * w * preMsg.landh[preMsg.landh.length - 1].h / 
                preMsg.angle[preMsg.angle.length - 1]
                // dataList.towerAxialTension = Tlist
                // dataList.leashedHorizontalTension = Hlist
                // dataList.arriveTension = arriveTension
                console.log([Tlist, Hlist, arriveTension])
                return [Tlist, Hlist, arriveTension]
                //console.log('H' , Hlist , arriveTension)
            }
            
        },

        getExportTraction(preMsg, towerAxialTension, arriveTension) {
            let ϵ0 = preMsg.ϵ0
            let n = towerAxialTension.length - 1
            let tractionList = []
            for(let i = 0; i < towerAxialTension.length; i++) {
                let Traction = towerAxialTension[i] * Math.pow(ϵ0,(n-i)) + 
                eval(preMsg.leashCoefficient.slice(i,n + 2).join("+"))
                tractionList.push(Traction)
            }
            tractionList.push(arriveTension)
            console.log('tractionList:',tractionList)
            return tractionList
        },

        getEnvelopeAngleAndLineLengthAndOffset(preMsg, leashedHorizontalTension) {
            let w = preMsg.w
            let leashedlineLength = []
            let leashedoffset = []
            let leashedenvelopeAngle = []
            let bearer = []
            let doublePulley = []
            let leashedRise = []
            //let leashedRisePower = []
            for(let i = 0; i < leashedHorizontalTension.length; i++) {
                let afterL = preMsg.landh[i].l
                let afterH = preMsg.landh[i].h
                let cos2 = preMsg.angle[i]
                let H2 = leashedHorizontalTension[i]
                if(i == 0) {
                    let lineLength = afterL / cos2 + w * w * Math.pow(afterL, 3) * cos2 / (24 * H2 * H2)
                    leashedlineLength.push(lineLength)
                }else{
                    
                    let beforL = preMsg.landh[i-1].l
                    let beforH = preMsg.landh[i-1].h
                    let cos1 = preMsg.angle[i-1]
                    let H1 = leashedHorizontalTension[i-1]
                    let a = preMsg.rotateNum[i] / 2
                    
                    let beforAngle = Math.atan(w * beforL / (2 * H1 * cos1) + beforH / beforL)
                    let afterAngle = Math.atan(w * afterL / (2 * H2 * cos2) - afterH / afterL)
                    
                    let envelopeAngle = {envelopeAngle:(Math.acos(Math.cos(beforAngle + afterAngle) - 
                    2 * Math.cos(beforAngle) * Math.cos(afterAngle) * Math.pow(Math.sin(a), 2))) * 180 / Math.PI}
                    let offset = { offset:0.5 * (beforL / cos1 + afterL / cos2) + 
                    (H1 * beforH / beforL - H2 * afterH / afterL) / w}
                    
                    //console.log('angle',beforAngle,afterAngle,envelopeAngle,w * afterL / (2 * H2 * cos2) - afterH / afterL, w * afterL , (2 * H2 * cos2) , afterH / afterL)
                    // let leashedRisePowerItem = offset.offset 
                    let lineLength = afterL / cos2 + w * w * Math.pow(afterL, 3) * cos2 / (24 * H2 * H2)
                    leashedlineLength.push(lineLength)
                    leashedoffset[i] = offset
                    leashedenvelopeAngle[i] = envelopeAngle
                    bearer[i] = offset.offset * w * preMsg.n
                    if(bearer[i] > this.Q || leashedenvelopeAngle[i].envelopeAngle > 30) {
                        doublePulley[i] = '是'
                    }else {
                        doublePulley[i] = '-'
                    }
                    if(offset.offset < 0) {
                        leashedRise[i] = '上扬'
                    }else {
                        leashedRise[i] = '-'
                    }
                }
               
               
                
            }
            console.log('from H',[leashedlineLength, leashedoffset, leashedenvelopeAngle])
            return [leashedlineLength, leashedoffset, leashedenvelopeAngle, bearer, doublePulley, leashedRise]
        },

        getAllLeashHorizontalTension(preMsg, towerAxialTension) {
            let w0 = preMsg.w0
            let ϵ0 = preMsg.ϵ0
            let leashHorizontalTension = []
            let leashEnvelopeAngle = []
            let leashOffset = []
            let leashDoublePulley = []
            let leashRise = []
            let leashRisePower = []
            for(let i = 1; i < towerAxialTension.length; i++) {
                let l1 = preMsg.landh[i-1].l
                let h1 = preMsg.landh[i-1].h
                let cos1 = preMsg.angle[i-1]
                let T1 = towerAxialTension[i-1]
                let l2 = preMsg.landh[i].l
                let h2 = preMsg.landh[i].h
                let cos2 = preMsg.angle[i]
                let T2 = towerAxialTension[i]
                let a = preMsg.rotateNum[i] / 2
                let Traction1 = T1 + w0 * h1 / (2 * cos1)
                let Traction2 = (T1 + w0 * h1 /  cos1) * ϵ0 + w0 * h2 / (2 * cos2)
                let horizontalTension1 = (Traction1 + 
                  Math.sqrt(Math.pow(Traction1,2) - l1 * l1 * w0 * w0 * (1 + h1 * h1 /(2 * l1 * l1)) /(2 *cos1))) /
                  (2 * (1 + h1 * h1 /( 2 * l1 * l1)))
                let horizontalTension2 = (Traction2 + 
                  Math.sqrt(Math.pow(Traction2,2) - l2 * l2 * w0 * w0 * (1 + h2 * h2 /(2 * l2 * l2)) /(2 *cos2))) /
                  (2 * (1 + h2 * h2 /( 2 * l2 * l2)))
                leashHorizontalTension[i] = {
                    before: horizontalTension1,
                    after: horizontalTension2
                }
                if(i == towerAxialTension.length - 1) {
                    let lastTraction = T2 + w0 * h2 / (2 * cos2)
                    let lastHorizontalTension1 = (lastTraction + 
                        Math.sqrt(Math.pow(lastTraction,2) - l2 * l2 * w0 * w0 * (1 + h2 * h2 /(2 * l2 * l2)) /(2 *cos2))) /
                        (2 * (1 + h2 * h2 /( 2 * l2 * l2)))
                    leashHorizontalTension[i + 1] = {
                        before: lastHorizontalTension1,
                        after:0 
                    }
                }

                let beforAngle = Math.atan(w0 * l1 / (2 * horizontalTension1 * cos1) + h1 / l1)
                let afterAngle = Math.atan(w0 * l2 / (2 * horizontalTension2 * cos2) - h2 / l2)
                let envelopeAngle = {envelopeAngle:(Math.acos(Math.cos(beforAngle + afterAngle) - 
                    2 * Math.cos(beforAngle) * Math.cos(afterAngle) * Math.pow(Math.sin(a), 2))) * 180 / Math.PI}
                leashEnvelopeAngle[i] = envelopeAngle
                if(leashEnvelopeAngle[i].envelopeAngle > 30) {
                    leashDoublePulley[i] = '是'
                }else {
                    leashDoublePulley[i] = '-'
                }
                
                let offset = { offset:0.5 * (l1 / cos1 + l2 / cos2) + 
                    (horizontalTension1 * h1 / l1 - horizontalTension2 * h2 / l2) / w0}
                leashOffset[i] = offset
                let leashRisePowerItem = offset.offset * w0
                leashRisePower[i] = leashRisePowerItem
                if(offset.offset < 0) {
                    leashRise[i] = '上扬'
                }else {
                    leashRise[i] = '-'
                }
                
            }

            console.log('leashHorizontalTension',leashOffset,leashEnvelopeAngle,leashHorizontalTension)

            return [leashHorizontalTension, leashEnvelopeAngle, leashOffset, leashDoublePulley, leashRise, leashRisePower]
        },

        setArr(num, length) {
            const remainVal = num % length;
            const quotientVal = ~~(num / length);
            var arr = [];
            let lasti = 0
            for (let i = 0; i < length; i++) {
                if(i < remainVal - 1) { 
                    arr.push((quotientVal + 1) * (i + 1))
                    lasti = i 
                }else if(i < length - 1 ){ 
                    arr.push((quotientVal + 1) * (lasti + 1) + quotientVal * (i - lasti));
                }else {
                    arr.push(Number(num)) 
                }
                // i < remainVal ? arr.push((quotientVal + 1) * (i + 1)) : 
                // arr.push(quotientVal);
            }
            return arr;
        },

        getXArray(preMsg) { 
           for(let i = 0; i < preMsg.landh.length; i++) {
               let l = preMsg.landh[i].l
               let XArray = this.setArr(l, 20)
               console.log('Xarray:',l,XArray )
           }
        },

        getXAndY(preMsg,leashedHorizontalTension, leashHorizontalTension, position) {
            let w0 = preMsg.w0
            let w = preMsg.w
            console.log('test', leashHorizontalTension ,leashHorizontalTension.length)
            let realDataList = []
            let realDataList2 = []
            for(let i = 0; i < preMsg.landh.length; i++) {
               let l = preMsg.landh[i].l
               let h = preMsg.landh[i].h
               let H = leashedHorizontalTension[i]
               let H2 = leashHorizontalTension[i + 1].before
               //console.log(leashHorizontalTension[i])
               let cos = preMsg.angle[i]
               let f = l * l * w / (8 * H * cos)
               //console.log('f',f,H)
               let f2 = l * l * w0 / (8 * H2 * cos)
               let XArray = this.setArr(l, 20)
               let realList = []
               realList.push({
                   x: position == 2 ? -preMsg.realXandY[i].x : preMsg.realXandY[i].x,
                   y: preMsg.realXandY[i].y
               })
               let realList2 = []
               realList2.push({
                   x: position == 2 ? -preMsg.realXandY[i].x : preMsg.realXandY[i].x,
                   y: preMsg.realXandY[i].y
               })
               let a = (4 * f - h) / l
               let b = 4 * f / (l * l)
               let a2 = (4 * f2 - h) / l
               let b2 = 4 * f2/ (l * l)
               XArray.forEach(item => {
                   let y = a * item - b * item * item
                   let y2 = a2 * item - b2 * item * item
                   //console.log('y',y,'y2',y2)
                   let realY = preMsg.realXandY[i].y - 1000 * y / this.K_y
                   let realX = preMsg.realXandY[i].x - 0 + 1000 * item / Number(this.k_x)
                   let realY2 = preMsg.realXandY[i].y - 1000 * y2 / this.K_y
                   if(isNaN(realX) || isNaN(realY) || isNaN(realY2)){
                       this.drawFlag = true
                   }
                   //console.log('xy',realX, preMsg.realXandY[i].x,position)
                   if(position == 2) {
                        realList.push({
                            x: -realX,
                            y: realY
                        })
                        realList2.push({
                            x: -realX,
                            y: realY2
                        })
                   }else {
                        realList.push({
                            x: realX,
                            y: realY
                        })
                        realList2.push({
                            x: realX,
                            y: realY2
                        })
                   }
                   
                   

               })
               realDataList.push(realList)
               realDataList2.push(realList2)
            }
            if(this.drawFlag){
                this.$message.error("存在NaN值，计算不合理，请重新选取控制点或放线方向")
            }    
            
            console.log('Xarray:',realDataList2,realDataList)
            //document.getElementById("MxDrawXCtrl").DoCommand(600);
            return [realDataList, realDataList2]
        },

        getTableData1(position) {
            let extraCoord = JSON.parse(JSON.stringify(this.$store.state.extraCoord))
            if(position == 2) {
                extraCoord.reverse()
                console.log(extraCoord)
            }
            if(extraCoord.length != 0) {
                let j = 0
                let dataList = []
                for(let i = 0; i < extraCoord.length - 1; i++) {
                    let dataItem = {
                        name: '-',
                        traction: '-',
                        leashedHorizontalTension: '-',
                        leashHorizontalTensionBefore: '-',
                        leashHorizontalTensionAfter: '-',
                        leashedlineLength: '-',
                        leashedenvelopeAngle: '-',
                        bearer: '-',
                        leashedoffset: '-',
                        doublePulley: '-',
                        leashedRise: '-',
                        leashEnvelopeAngle: '-',
                        leashRisePower: '-',
                        leashDoublePulley: '-',
                        leashRise: '-'
                    }
                    if(extraCoord[i].coordinatePosition !== "中" && extraCoord[i+1].coordinatePosition !== "中") {
                        continue
                    }else {
                        dataItem['name'] = extraCoord[i].name + '--' + extraCoord[i+1].name
                        dataItem['traction'] = this.tractionList1[j].toFixed(2)
                        dataItem['leashedHorizontalTension'] = this.leashedHorizontalTension1[j].toFixed(2)
                        dataItem['leashedlineLength'] = this.leashedlineLength1[j].toFixed(2)
                        if(i != 0){
                            dataItem['leashHorizontalTensionBefore'] = this.leashHorizontalTension1[j].before.toFixed(2)
                            dataItem['leashHorizontalTensionAfter'] = this.leashHorizontalTension1[j].after.toFixed(2)
                            dataItem['leashedenvelopeAngle'] = this.leashedenvelopeAngle1[j].envelopeAngle.toFixed(2)
                            dataItem['bearer'] = this.bearer1[j].toFixed(2)
                            dataItem['leashedoffset'] = this.leashedoffset1[j].offset.toFixed(2)
                            dataItem['doublePulley'] = this.doublePulley1[j]
                            dataItem['leashedRise'] = this.leashedRise1[j]
                            dataItem['leashEnvelopeAngle'] =  this.leashEnvelopeAngle1[j].envelopeAngle.toFixed(2)
                            dataItem['leashRisePower'] = this.leashRisePower1[j].toFixed(2)
                            dataItem['leashDoublePulley'] = this.leashDoublePulley1[j]
                            dataItem['leashRise'] = this.leashRise1[j]
                        }
                        j = j + 1
                        //console.log(i,dataItem)
                        dataList.push(dataItem)
                    }
                    if(i == extraCoord.length - 2) {
                        //console.log('in last one')
                        let lastItem = {
                            name: '-',
                            traction: '-',
                            leashedHorizontalTension: '-',
                            leashHorizontalTensionBefore: '-',
                            leashHorizontalTensionAfter: '-',
                            leashedlineLength: '-',
                            leashedenvelopeAngle: '-',
                            bearer: '-',
                            leashedoffset: '-',
                            doublePulley: '-',
                            leashedRise: '-',
                            leashEnvelopeAngle: '-',
                            leashRisePower: '-',
                            leashDoublePulley: '-',
                            leashRise: '-'
                        }
                        lastItem['name'] =  extraCoord[i + 1].name 
                        lastItem['traction'] = this.tractionList1[j].toFixed(2)
                        lastItem['leashHorizontalTensionBefore'] = this.leashHorizontalTension1[j].before.toFixed(2)
                        //console.log('last',lastItem)
                        dataList.push(lastItem)
                    }

                       
                        
                        
                       
                        //console.log(l.toFixed(2), h,h.toFixed(2))

                    
                }
                if(position == 2) {
                    dataList.reverse()
                }
                this.data1 = dataList
                this.$store.commit('getTableData1', this.data1)
                this.$store.commit('getotherTracMsg1', {
                    position: this.position1,
                    maxExportTension: this.maxExportTension1,
                    gear: this.preMsg[this.gear1].name,
                    Tmax: Math.max(...this.tractionList1)
                })
                //console.log(preMsg)
            }

        },
        
        getTableData2(position) {
            let extraCoord = JSON.parse(JSON.stringify(this.$store.state.extraCoord))
            if(position == 2) {
                extraCoord.reverse()
                console.log(extraCoord)
            }
            if(extraCoord.length != 0) {
                let j = 0
                let dataList = []
                for(let i = 0; i < extraCoord.length - 1; i++) {
                    let dataItem = {
                        name: '-',
                        traction: '-',
                        leashedHorizontalTension: '-',
                        leashHorizontalTensionBefore: '-',
                        leashHorizontalTensionAfter: '-',
                        leashedlineLength: '-',
                        leashedenvelopeAngle: '-',
                        bearer: '-',
                        leashedoffset: '-',
                        doublePulley: '-',
                        leashedRise: '-',
                        leashEnvelopeAngle: '-',
                        leashRisePower: '-',
                        leashDoublePulley: '-',
                        leashRise: '-'
                    }
                    if(extraCoord[i].coordinatePosition !== "中" && extraCoord[i+1].coordinatePosition !== "中") {
                        continue
                    }else {
                        dataItem['name'] = extraCoord[i].name + '--' + extraCoord[i+1].name
                        dataItem['traction'] = this.tractionList2[j].toFixed(2)
                        dataItem['leashedHorizontalTension'] = this.leashedHorizontalTension2[j].toFixed(2)
                        dataItem['leashedlineLength'] = this.leashedlineLength2[j].toFixed(2)
                        if(i != 0){
                            dataItem['leashHorizontalTensionBefore'] = this.leashHorizontalTension2[j].before.toFixed(2)
                            dataItem['leashHorizontalTensionAfter'] = this.leashHorizontalTension2[j].after.toFixed(2)
                            dataItem['leashedenvelopeAngle'] = this.leashedenvelopeAngle2[j].envelopeAngle.toFixed(2)
                            dataItem['bearer'] = this.bearer2[j].toFixed(2)
                            dataItem['leashedoffset'] = this.leashedoffset2[j].offset.toFixed(2)
                            dataItem['doublePulley'] = this.doublePulley2[j]
                            dataItem['leashedRise'] = this.leashedRise2[j]
                            dataItem['leashEnvelopeAngle'] =  this.leashEnvelopeAngle2[j].envelopeAngle.toFixed(2)
                            dataItem['leashRisePower'] = this.leashRisePower2[j].toFixed(2)
                            dataItem['leashDoublePulley'] = this.leashDoublePulley2[j]
                            dataItem['leashRise'] = this.leashRise2[j]
                        }
                        //console.log(dataItem)
                        j = j + 1
                        dataList.push(dataItem)
                    }
                    if(i == extraCoord.length - 2) {
                        let lastItem = {
                            name: '-',
                            traction: '-',
                            leashedHorizontalTension: '-',
                            leashHorizontalTensionBefore: '-',
                            leashHorizontalTensionAfter: '-',
                            leashedlineLength: '-',
                            leashedenvelopeAngle: '-',
                            bearer: '-',
                            leashedoffset: '-',
                            doublePulley: '-',
                            leashedRise: '-',
                            leashEnvelopeAngle: '-',
                            leashRisePower: '-',
                            leashDoublePulley: '-',
                            leashRise: '-'
                        }
                        lastItem['name'] =  extraCoord[i + 1].name 
                        lastItem['traction'] = this.tractionList2[j].toFixed(2)
                        lastItem['leashHorizontalTensionBefore'] = this.leashHorizontalTension2[j].before.toFixed(2)
                        console.log(lastItem)
                        dataList.push(lastItem)
                    }
                }
                if(position == 2) {
                    dataList.reverse()
                }
                this.data2 = dataList
                this.$store.commit('getTableData2', this.data2)
                this.$store.commit('getotherTracMsg2', {
                    position: this.position2,
                    maxExportTension: this.maxExportTension2,
                    gear: this.preMsg2[this.gear2].name,
                    Tmax: Math.max(...this.tractionList2)
                })
                //console.log(preMsg)
            }

        },
        
        drawLine() {
            //console.log('draw')
            if(!this.repaint) {
                this.repaint = !this.repaint
                document.getElementById("MxDrawXCtrl").ImplementCustomEvent = this.CustomEvent1;
                document.getElementById("MxDrawXCtrl").DoCommand(607)
                // this.$store.commit('visibleAble', false)
                // this.$store.commit('getRepaint', this.repaint)
                setTimeout(() => {
                    console.log('start')
                     this.$store.commit('visibleAble', false)
                    this.$store.commit('getRepaint', this.repaint)
                    console.log('ending')
                }, 300)
            }else {
                this.$store.commit('visibleAble', false)
            }
            
            //document.getElementById("MxDrawXCtrl").DoCommand(602)
        },

        // dosome(){
        //     console.log('ining...')
        //     document.getElementById("MxDrawXCtrl").DoCommand(Number(this.index))
        // },

        reDraw() {
            this.isShow1 = true
            this.repaint = false
        },
        // 控件调用函数
        DoCommandEventFunc(iCmd){
            var mxOcx = document.all.item("MxDrawXCtrl");
            if (iCmd == 600) {    
                //把线型改成实线
                mxOcx.LineType = "";
            
                //创建一个图层,名为"SplinelineLayer"
                mxOcx.AddLayer("SplinelineLayer");
            
                //设置当前图层为"SplinelineLayer"
                mxOcx.LayerName = "SplinelineLayer";

                mxOcx.DrawCADColor = 65280;
    
                mxOcx.LineWidth = 5;
                
                for(let i = 0; i < this.realList1.length; i++) {
                    for(let j = 0; j < this.realList1[i].length; j++ ){
                        let x = Number(this.realList1[i][j].x)
                        let y = Number(this.realList1[i][j].y)
                        //console.log(x,y)
                        if(j == 0){
                            mxOcx.PathMoveTo(x, y);
                        }else {
                            mxOcx.PathLineTo(x, y);
                        }
                        if(j == 3) {
                            mxOcx.AddLayer("pizhu");
                            mxOcx.LayerName = "pizhu";
                            mxOcx.LineType = "";
                            //设置线宽 4
                            mxOcx.LineWidth = 0;
                            let baseposx = this.realList1[i][j].x;
                            let baseposy = this.realList1[i][j].y;
                            let posx =  this.realList1[i][j].x;
                            let posy =  this.realList1[i][j].y + 10;
                            //console.log(baseposx,baseposy,posx,posy)
                            mxOcx.DrawLine(baseposx, baseposy, posx, posy);
                            mxOcx.DrawColor = 65280;
                            mxOcx.DrawText(posx, posy, "牵引绳", 5, 0, 0, 1);
                            mxOcx.LayerName = "SplinelineLayer";

                            // var comment = mxOcx.NewEntity("IMxDrawComment");
                            // mxOcx.AddLayer("pizhu");
                            // mxOcx.LayerName = "pizhu";
                            // comment.Text = "牵引绳";
                            // comment.TextHeight = 5;
                            // var basepos = mxOcx.NewPoint();
                            // basepos.x = this.realList1[i][j].x;
                            // basepos.y = this.realList1[i][j].y;
                            // var pos = mxOcx.NewPoint();
                            // pos.x =  this.realList1[i][j].x;
                            // pos.y =  this.realList1[i][j].y + 20;
                            // //基点
                            // comment.BasePoint = basepos;
                            // //位置
                            // comment.Position = pos;
                            // mxOcx.DrawEntity(comment)
                            
                            //var comobj = mxOcx.ObjectIdToObject( mxOcx.DrawEntity(comment) );
                            //comobj.TextStyle = "MyCommentFont";
                    }
                    }
                    mxOcx.DrawPathToSpline();
                    
                       
                }

            

                this.DoCommandEventFunc(601)
            }
            if (iCmd == 601) {    
                //把线型改成实线
                mxOcx.LineType = "";
            
                // //创建一个图层,名为"SplinelineLayer"
                // mxOcx.AddLayer("SplinelineLayer");
            
                // //设置当前图层为"SplinelineLayer"
                mxOcx.LayerName = "SplinelineLayer";

                mxOcx.DrawCADColor = 225;
    
                mxOcx.LineWidth = 5;
                
                for(let i = 0; i < this.realList12.length; i++) {
                    for(let j = 0; j < this.realList12[i].length; j++ ){
                        let x = Number(this.realList12[i][j].x)
                        let y = Number(this.realList12[i][j].y)
                        //console.log(x,y)
                        if(j == 0){
                            mxOcx.PathMoveTo(x, y);
                        }else {
                            mxOcx.PathLineTo(x, y);
                        }
                        if(j == 8) {
                            //创建一个图层,名为"SplinelineLayer"
                            // mxOcx.AddLayer("pizhu");
                            
                            // //设置当前图层为"SplinelineLayer"
                            mxOcx.LayerName = "pizhu";
                            mxOcx.LineType = "";
                            //设置线宽 4
                            mxOcx.LineWidth = 0;
                            let baseposx = this.realList12[i][j].x;
                            let baseposy = this.realList12[i][j].y;
                            let posx =  this.realList12[i][j].x;
                            let posy =  this.realList12[i][j].y + 10;
                            //console.log(baseposx,baseposy,posx,posy)
                            mxOcx.DrawLine(baseposx, baseposy, posx, posy);
                            mxOcx.DrawColor = 65280;
                            mxOcx.DrawText(posx, posy, "导引绳", 5, 0, 0, 1);
                            mxOcx.LayerName = "SplinelineLayer";
                        }

                    }
                    mxOcx.DrawPathToSpline();   
                }
                this.DoCommandEventFunc(602)
            }
            if (iCmd == 602) {    
                //把线型改成实线
                mxOcx.LineType = "";
            
                // //创建一个图层,名为"SplinelineLayer"
                // mxOcx.AddLayer("SplinelineLayer");
            
                // //设置当前图层为"SplinelineLayer"
                // mxOcx.LayerName = "SplinelineLayer";
                mxOcx.LayerName = "SplinelineLayer";
                mxOcx.DrawCADColor = 65280;
    
                mxOcx.LineWidth = 5;
                
                for(let i = 0; i < this.realList2.length; i++) {
                    for(let j = 0; j < this.realList2[i].length; j++ ){
                        let x = Number(this.realList2[i][j].x)
                        let y = Number(this.realList2[i][j].y)
                        //console.log(x,y)
                        if(j == 0){
                            mxOcx.PathMoveTo(x, y);
                        }else {
                            mxOcx.PathLineTo(x, y);
                        }
                        if(j == 13) {
                            //创建一个图层,名为"SplinelineLayer"
                            // mxOcx.AddLayer("pizhu");
                            
                            // //设置当前图层为"SplinelineLayer"
                            mxOcx.LayerName = "pizhu";
                            mxOcx.LineType = "";
                            //设置线宽 4
                            mxOcx.LineWidth = 0;
                            let baseposx = this.realList2[i][j].x;
                            let baseposy = this.realList2[i][j].y;
                            let posx =  this.realList2[i][j].x;
                            let posy =  this.realList2[i][j].y + 10;
                            //console.log(baseposx,baseposy,posx,posy)
                            mxOcx.DrawLine(baseposx, baseposy, posx, posy);
                            mxOcx.DrawColor = 65280;
                            mxOcx.DrawText(posx, posy, "导线", 5, 0, 0, 1);
                            mxOcx.LayerName = "SplinelineLayer";
                        }

                    }
                    mxOcx.DrawPathToSpline();   
                }
                this.DoCommandEventFunc(603)
            }
            if (iCmd == 603) {    
                //把线型改成实线
                mxOcx.LineType = "";
            
                // //创建一个图层,名为"SplinelineLayer"
                // mxOcx.AddLayer("SplinelineLayer");
            
                // //设置当前图层为"SplinelineLayer"
                // mxOcx.LayerName = "SplinelineLayer";
                mxOcx.LayerName = "SplinelineLayer";
                mxOcx.DrawCADColor = 225;
    
                mxOcx.LineWidth = 5;
                
                for(let i = 0; i < this.realList22.length; i++) {
                    for(let j = 0; j < this.realList22[i].length; j++ ){
                        let x = Number(this.realList22[i][j].x)
                        let y = Number(this.realList22[i][j].y)
                        //console.log(x,y)
                        if(j == 0){
                            mxOcx.PathMoveTo(x, y);
                        }else {
                            mxOcx.PathLineTo(x, y);
                        }
                        if(j == 18) {
                            //创建一个图层,名为"SplinelineLayer"
                            // mxOcx.AddLayer("pizhu");
                            
                            // //设置当前图层为"SplinelineLayer"
                            mxOcx.LayerName = "pizhu";
                            mxOcx.LineType = "";
                            //设置线宽 4
                            mxOcx.LineWidth = 0;
                            let baseposx = this.realList22[i][j].x;
                            let baseposy = this.realList22[i][j].y;
                            let posx =  this.realList22[i][j].x;
                            let posy =  this.realList22[i][j].y + 10;
                            //console.log(baseposx,baseposy,posx,posy)
                            mxOcx.DrawLine(baseposx, baseposy, posx, posy);
                            mxOcx.DrawColor = 65280;
                            mxOcx.DrawText(posx, posy, "牵引绳", 5, 0, 0, 1);
                            mxOcx.LayerName = "SplinelineLayer";
                        }
                    }
                    mxOcx.DrawPathToSpline();   
                }
                this.DoCommandEventFunc(606)
            }
            if (iCmd == 604) {
                var filter = mxOcx.NewResbuf();
                // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
                filter.AddStringEx("SplinelineLayer", 8);
                //定义选择集对象
                var ss = mxOcx.NewSelectionSet();
                // 选择图上的所有对象。
                ss.Select2(5, null, null, null,filter);
                var i = 0;
                //var listId = new Array();
                // 遍历所有对象，得到对象id.
                for (; i < ss.Count;i++)
                {
                    var e =  ss.Item(i);
                    e.Erase()
                    //listId.push(e.ObjectID);
                }
                this.DoCommandEventFunc(605)
                //return listId;
            }
            if (iCmd == 605) {
                var filter = mxOcx.NewResbuf();
                // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
                filter.AddStringEx("pizhu", 8);
                //定义选择集对象
                var ss = mxOcx.NewSelectionSet();
                // 选择图上的所有对象。
                ss.Select2(5, null, null, null,filter);
                var i = 0;
                //var listId = new Array();
                // 遍历所有对象，得到对象id.
                for (; i < ss.Count;i++)
                {
                    var e =  ss.Item(i);
                    e.Erase()
                    //listId.push(e.ObjectID);
                }
                
                this.DoCommandEventFunc(600)
                //return listId;
            }
            if (iCmd == 606) {
                mxOcx.LayerName = "pizhu";
                var arr = new Array(this.realList1.length+1).fill('')
                
                for(let i = 0; i < this.realList1.length; i++) {
                    // let x = Number(this.realList1[i][0].x)
                    // let y = Number(this.realList1[i][0].y)
                    if(this.position1 == '左'){
                        let double = this.data1[i].doublePulley
                        let leashDouble = this.data1[i].leashDoublePulley
                        if(double !== '-' || leashDouble !== '-'){
                            arr[i] = "挂双滑车"
                            //mxOcx.DrawColor = 65280;
                            // console.log(1)
                            // mxOcx.DrawText(x, y + 16, "挂双滑车", 5, 0, 1, 1);
                        }
                        let rise = this.data1[i].leashRise
                        if(rise !== '-' && arr[i] !== '') {
                            arr[i] = arr[i] + "\\P" + "导引绳上扬"
                            //mxOcx.DrawText(x, y + 16, "牵引绳上扬", 5, 0, 1, 1);
                        }else if(rise !== '-' && arr[i] == '') {
                            arr[i] = "导引绳上扬"
                        }
                    }
                    if(this.position1 == '右'){
                        let double = this.data1[this.data1.length - 1 - i].doublePulley
                        let leashDouble = this.data1[this.data1.length - 1 - i].leashDoublePulley
                        if(double !== '-' || leashDouble !== '-'){
                            arr[this.data1.length - 1 - i] = "挂双滑车"
                            //mxOcx.DrawColor = 65280;
                            //console.log(1)
                            //mxOcx.DrawText(x, y + 16, "挂双滑车", 5, 0, 1, 1);
                        }
                        let rise = this.data1[this.data1.length - 1 - i].leashRise
                        if(rise !== '-' && arr[this.data1.length - 1 - i] !== '') {
                            arr[this.data1.length - 1 - i] = arr[this.data1.length - 1 - i] + "\\P" + "导引绳上扬"
                            //mxOcx.DrawText(x, y + 16, "牵引绳上扬", 5, 0, 1, 1);
                        }else if(rise !== '-' && arr[this.data1.length - 1 - i] == '') {
                            arr[this.data1.length - 1 - i] = "导引绳上扬"
                        }
                    }
                }
                for(let i = 0; i < this.realList2.length; i++) {
                    // let x = Number(this.realList2[i][0].x)
                    // let y = Number(this.realList2[i][0].y)
                    if(this.position2 == '左'){
                        let double = this.data2[i].doublePulley
                        let leashDouble = this.data2[i].leashDoublePulley
                        ///console.log('2222',arr[i].match(new RegExp('挂双滑车')) !== null)
                        if((double !== '-' || leashDouble !== '-') && arr[i].match(new RegExp('挂双滑车')) == null){
                            arr[i] = arr[i] == '' ? "挂双滑车" : "\\P挂双滑车"
                            //console.log(2)
                            //mxOcx.DrawText(x, y + 16, "挂双滑车", 5, 0, 1, 1);
                        }
                        let rise = this.data2[i].leashRise
                        if(rise !== '-' && arr[i] !== '') {
                            arr[i] = arr[i] + "\\P" + "牵引绳上扬"
                            //mxOcx.DrawText(x, y + 16, "牵引绳上扬", 5, 0, 1, 1);
                        }else if(rise !== '-' && arr[i] == '') {
                            arr[i] = "牵引绳上扬"
                        }
                    }
                    if(this.position2 == '右'){
                        let double = this.data2[this.data2.length - 1 - i].doublePulley
                        let leashDouble = this.data2[this.data2.length - 1 - i].leashDoublePulley
                        if((double !== '-' || leashDouble !== '-') && arr[this.data2.length - 1 - i].match(new RegExp('挂双滑车')) == null){
                            arr[this.data2.length - 1 - i] = arr[this.data2.length - 1 - i] == '' ? "挂双滑车" : "\\P挂双滑车"
                            //console.log(2)
                            //mxOcx.DrawText(x, y + 16, "挂双滑车", 5, 0, 1, 1);
                        }
                        let rise = this.data2[this.data2.length - 1 - i].leashRise
                        if(rise !== '-' && arr[this.data2.length - 1 - i] !== '') {
                            arr[this.data2.length - 1 - i] = arr[this.data2.length - 1 - i] + "\\P" + "牵引绳上扬"
                            //mxOcx.DrawText(x, y + 16, "牵引绳上扬", 5, 0, 1, 1);
                        }else if(rise !== '-' && arr[this.data2.length - 1 - i] == '') {
                            arr[this.data2.length - 1 - i] = "牵引绳上扬"
                        }
                    }
                }
                console.log('arr',arr)
                let extraCoord = JSON.parse(JSON.stringify(this.$store.state.extraCoord))
                let j = 0
                for(let i = 0; i < extraCoord.length; i++) {
                    if(extraCoord[i+1].name == extraCoord[i].name) {
                        continue
                    }
                    else {
                        let x = Number(extraCoord[i].xCoordinate)
                        let y = Number(extraCoord[i].yCoordinate)
                        let text = arr[j]
                        //console.log(arr[j],"导引绳上扬\\P牵引绳上扬",arr[j] == "导引绳上扬\\P牵引绳上扬")
                        j = j + 1
                        mxOcx.DrawColor = 65535;
                        mxOcx.DrawMText(x, y + 16, text, 5, 25, 0, 8);
                    }
                }
            }
            if (iCmd == 607) {
                var name = mxOcx.GetFileName()
                console.log(name.match(new RegExp(this.$store.state.fileName)))
                if (name.match(new RegExp(this.$store.state.fileName)) !== null) {
                    console.log(1)
                    this.DoCommandEventFunc(604)
                }else {
                    console.log(2)
                    mxOcx.SendStringToExecute("OpenDwg");
                }
                
            }
        },

        CustomEvent1(sEventName) {
            //console.log(sEventName)
            if(sEventName == "OpenFileComplete")
            {
            // 控件加载完成.
        
            console.log('complete')  
            var mxOcx = document.all.item("MxDrawXCtrl");
            // var name = mxOcx.GetFileName().split('\\').slice(-3).join('/')
            var name = mxOcx.GetFileName()
            if (name.match(new RegExp(this.$store.state.fileName)) !== null) {
                this.DoCommandEventFunc(604)
            }
            // if(name != this.$store.state.fileName && this.openFlieflag) {
            //     mxOcx.NewFile()
            //     this.openFlieflag = false
            // }
            // this.DoCommandEventFunc(102)
            // if(name == this.$store.state.fileName && this.$store.state.extraCoord.length != 0) {
            //     this.DoCommandEventFunc(103)
            // }
            // if(name == this.$store.state.fileName && this.$store.state.controlPoint.length != 0) {
            //     this.DoCommandEventFunc(104)
            // }
            }        
        },

        cancel() {
            this.showSafeWarning = false
        },

        confirm() {
            this.showSafeWarning = false
            
        },

        safeWarning(index){
            this.showSafeWarning = index
            //console.log('safeWarning',index)
        }
        
    },
  }
</script>

<style scoped>
.container {
    position: relative
}

.left{
  width: 5%;
  float: left;
  height: 1px;
  /* background-color: red; */
}
.right{
  width: 5%;
  float: right;
  height: 1px;
  /* background-color: yellow; */
}
.center{
  width: 90%;
  min-width: 1400px;
  float: left;
  /* height: 100vh */
  /* background-color: green; */
}

/* @media screen and (min-width: 1024px) and (max-width: 1279px) {
  .center{
    zoom: 0.6;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1439px) {
  .center{
    zoom: 0.783;
  }
}

@media screen and (min-width: 1440px) and (max-width: 1599px) {
  .center{
    zoom: 0.897;
  }
} */



.export-msg {
    position: absolute;

    right: 0;
    top: 0px;
    font-size: 18px;
    color: white;
}

.table1 >>> tbody.ant-table-tbody {
    background: white;
}
 
.table-container >>> .ant-tabs-nav .ant-tabs-tab-active {
    color: yellow;
}

.table-container >>> .ant-tabs-ink-bar {
    background-color: yellow;
}

.ant-tabs {
    color: white;
}

.table-container >>> .ant-tabs-nav .ant-tabs-tab:hover {
    color: yellow;
}

/* table滚动条样式修改 */
.table1 >>> .ant-table-body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  border-radius: 0px;
  background-color:#EFEDE7;
}


.table1 >>> .ant-table-body::-webkit-scrollbar-corner {
  background-color: #EFEDE7;

}

.table1 >>> .ant-table-body::-webkit-scrollbar {
  width: 2px;
  height: 8px;
  border-radius: 10px;
  background-color: #F5F5F5;
}

.table1 >>> .ant-table-body::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  border-radius: 10px;
  background-color: #EFEDE7;
}
</style>
