<template>
  <div id="containBox1" ref="containBox1">
      <div class="left"></div>
      <div class="center">
        <wizard-step
          :show1=true
          from='controlPoint'
          next='stretCalculation'
        ></wizard-step>
        <a-card title="展放对象" :bordered="false" style="top: 10px">
          <div class="clearfix">
              <a-button class="m-br-10" @click="showModal" type="primary">选取</a-button>
              <a-button class="m-br-10" @click="delwire" type="primary">删除</a-button>
              <a-button class="m-br-10" @click="exportWireData" type="primary">保存</a-button>
              <a-button class="m-br-10" type="primary">退出</a-button>
          </div>
          <div class="border-box">
            
              <a-table bordered 
                      :row-selection="rowSelection1" 
                      :data-source="wireDataSource" 
                      :pagination="{pageSize:wireListTotal,
                      hideOnSinglePage:true}" 
                      :columns="columns"
                      :scroll="{ y: 180 }">
                  
              </a-table>
          </div>
        </a-card>
        <a-card title="推荐牵引绳规格" :bordered="false" style="top: 20px">
          <div class="clearfix">
              <a-button class="m-br-10" @click="showModalTrac"  type="primary">选取</a-button>
              <a-button class="m-br-10" @click="delleash" type="primary">删除</a-button>
              <a-button class="m-br-10" @click="exportLeashData" type="primary">保存</a-button>
          </div>
          <div  class="border-box">
              <a-table bordered 
                      :row-selection="rowSelection2" 
                      :scroll="{  y: 200 }" 
                      :data-source="leashDataSource" 
                      :pagination="{pageSize:leashListTotal,
                      hideOnSinglePage:true}" 
                      :columns="columns">
                
              </a-table>
          </div>
        </a-card>
      </div>
      <div class="right"></div>
     
      
      <exhibit-obj-modal :modalVisible="isShow"
                          @setModalVisible="setModalVisible"
                          @getSelectItem="getWireItem">
      </exhibit-obj-modal>
      <traction-rope-modal :modalVisible="isShowTrac"
                          @setModalVisible="setModalVisibleTrac"
                          @getSelectItem="getLeashItem">
      </traction-rope-modal>
      <confirm-modal text="尚未选取牵展对象"
                     v-if="exportActive"
                     @cancel="cancel" 
                     @confirm="confirm">
      </confirm-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '结构',
    dataIndex: 'structure',
    width: 100,
    scopedSlots: { customRender: 'structure' },
  },
  {
    title: '外径(mm)',
    dataIndex: 'outerDiameter',
    width: 100,
    scopedSlots: { customRender: 'outerDiameter' },
  },
  {
    title: '单盘长度(m)',
    dataIndex: 'length',
    width: 100,
    scopedSlots: { customRender: 'length' },
  },
  {
    title: '单盘绳净重(kg)',
    dataIndex: 'singleRopeWeight',
    width: 100,
    scopedSlots: { customRender: 'singleRopeWeight' },
  },
  {
    title: '每米质量(kg/m)',
    dataIndex: 'massPerMeter',
    //width: '8%',
    width: 100,
    scopedSlots: { customRender: 'massPerMeter' },
  },
  {
    title: '计算断破力(kn)',
    dataIndex: 'breakingForce',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'breakingForce' },
  },
  {
    title: '截面积(mm2)',
    dataIndex: 'crossArea',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'crossArea' },
  },
  {
    title: '摩擦系数',
    dataIndex: 'frictionCoefficient',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'frictionCoefficient' },
  },
  {
    title: '安全系数下限',
    dataIndex: 'safeLowerLimit',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'safeLowerLimit' },
  },
  {
    title: '安全系数上限',
    dataIndex: 'safeUpperLimit',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'safeUpperLimit' },
  },
  {
    title: '绳索性质',
    dataIndex: 'ropeNature',
    //width: '4%',
    
    scopedSlots: { customRender: 'ropeNature' },
  },
];

const recommendColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '结构',
    dataIndex: 'structure',
    width: 100,
    scopedSlots: { customRender: 'structure' },
  },
  {
    title: '外径(mm)',
    dataIndex: 'outerDiameter',
    width: 100,
    scopedSlots: { customRender: 'outerDiameter' },
  },
  {
    title: '单盘长度(m)',
    dataIndex: 'length',
    width: 100,
    scopedSlots: { customRender: 'length' },
  },
  {
    title: '单盘绳净重(kg)',
    dataIndex: 'singleRopeWeight',
    width: 100,
    scopedSlots: { customRender: 'singleRopeWeight' },
  },
  {
    title: '每米质量(kg/m)',
    dataIndex: 'massPerMeter',
    //width: '8%',
    width: 100,
    scopedSlots: { customRender: 'massPerMeter' },
  },
  {
    title: '计算断破力(kn)',
    dataIndex: 'breakingForce',
    //width: '8%',
    width: 100,
    scopedSlots: { customRender: 'breakingForce' },
  },
  {
    title: '截面积(mm2)',
    dataIndex: 'crossArea',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'crossArea' },
  },
  {
    title: '摩擦系数',
    dataIndex: 'frictionCoefficient',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'frictionCoefficient' },
  },
  {
    title: '安全系数下限',
    dataIndex: 'safeLowerLimit',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'safeLowerLimit' },
  },
  {
    title: '安全系数上限',
    dataIndex: 'safeUpperLimit',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'safeUpperLimit' },
  },

]


import inputEditableCell from './editableCell/inputEditableCell'
import selectEditableCell from './editableCell/selectEditableCell'
import checkEditableCell from './editableCell/checkEditableCell'

import exhibitObjModal from './modal/exhibitObjModal'
import tractionRopeModal from './modal/tractionRopeModal'
import confirmModal from './modal/confirmModal'

import wizardStep from 'components/wizardStep/wizardStep.vue'

import { export_to_csv } from 'common/utils/exportData.js'

  export default {
    name:"drawingScaleSet",
    data () {
      return {
          lineId: '',

          columns,
          recommendColumns,
          wireDataSource: [],
          leashDataSource: [],
          wireListTotal: 0,
          leashListTotal: 0,
          wireKey: 0,
          leashKey: 0,

          selectedRows1: [],
          selectedRowKeys1: [],
          rowKeyRecord1: [],

          selectedRows: [],
          selectedRowKeys: [],
          rowKeyRecord: [],

    
          isShow: false,
          isShowTrac: false,

          reloadFlag: false,

          exportActive: false,
          toPath: '',
          changePathFlag: false
      }
    },
    watch: {
      '$store.state.exhibitObjectEdiTable'() {
        this.wireDataSource = this.$store.state.exhibitObjectEdiTable
        this.wireListTotal = this.wireDataSource.length
        this.wireKey = this.wireDataSource[this.wireListTotal - 1].key 
      
      },

      '$store.state.recommendedTractionRope'() {
        this.leashDataSource = this.$store.state.recommendedTractionRope
        this.leashListTotal = this.leashDataSource.length
        this.leashKey = this.leashDataSource[this.leashListTotal- 1].key 
      },

       
    },
    
    // mounted() {
    //   console.log('2222222222222')
    //   if(this.$store.state.wire) {
    //     this.selectedRows1 = [this.$store.state.wire]
    //     this.selectedRowKeys1 = this.$store.state.wire.key
    //     this.selectedRows = this.$store.state.leash
    //     console.log('11111',this.selectedRows1,this.selectedRowKeys1)
    //   }
    // },
    computed: {
      rowSelection1() {
        return {
          selectedRowKeys:this.selectedRowKeys1,
          hideDefaultSelections:true,
          columnTitle:' ',
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            // if(this.selectedRows1 == selectedRows) {
            //   console.log('xiangdeng')
            // }else {
            //   console.log(this.selectedRows1,selectedRows)
            // }
            this.selectedRowKeys1 = selectedRowKeys
            if(selectedRows.length > 1) { 
              this.selectedRowKeys1.shift()
            }
            let list = []
            this.selectedRowKeys1.forEach(item => {
              const target = this.wireDataSource.find(item2 => item2.key === item);
              if(target !== undefined){
                list.push(target)
              }
            })
            this.selectedRows1 = list
            console.log(`selectedRowKeys: ${this.selectedRowKeys1}`, 'selectedRows: ', this.selectedRows1);
          },
        };
      },
      rowSelection2() {
        return {
          selectedRowKeys:this.selectedRowKeys,
          hideDefaultSelections:true,
          columnTitle:' ',
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            // if(this.selectedRows == selectedRows) {
            //   console.log('same')
            // }else {
            //   console.log(this.selectedRows,selectedRows)
            // }
            // this.selectedRowKeys.forEach(item => {
            //   console.log(item)
            // })
            
            this.selectedRowKeys = selectedRowKeys
            //console.log(selectedRows,this.selectedRows)
            if(selectedRows.length > 2) { 
              this.selectedRowKeys.shift()
            }
            let list = []
            this.selectedRowKeys.forEach(item => {
              const target = this.leashDataSource.find(item2 => item2.key === item);
              if(target !== undefined){
                list.push(target)
              }
            })
            this.selectedRows = list
            console.log(`selectedRowKeys: ${this.selectedRowKeys}`, 'selectedRows: ', this.selectedRows);
          },
        };
      },
    
    },
    components: {
        inputEditableCell,
        selectEditableCell,
        checkEditableCell,
        exhibitObjModal,
        tractionRopeModal,
        confirmModal,

        wizardStep
    },
    mounted() {


      let elementResizeDetectorMaker = require("element-resize-detector");
      //监听元素变化
      let erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(document.getElementById("containBox1"), function (element) {
          that.$nextTick(function () {
              //使echarts尺寸重置
              let containHeight = this.$refs.containBox1.offsetWidth
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
      this.wireDataSource = this.$store.state.exhibitObjectEdiTable
      this.wireListTotal = this.wireDataSource.length     
      this.leashDataSource = this.$store.state.recommendedTractionRope
      this.leashListTotal = this.leashDataSource.length 
      this.wireKey = this.wireDataSource[this.wireListTotal - 1].key 
      this.leashKey = this.leashDataSource[this.leashListTotal- 1].key 

      if(JSON.stringify(this.$store.state.wire) !== '{}') {
        this.selectedRows1 = [this.$store.state.wire]
        this.selectedRowKeys1 = [this.$store.state.wire.key]
        this.rowKeyRecord1 = [this.$store.state.wire.key]
        this.selectedRows = this.$store.state.leash
        this.selectedRowKeys = [this.$store.state.leash[1].key, this.$store.state.leash[0].key]
        this.rowKeyRecord = [this.$store.state.leash[1].key, this.$store.state.leash[0].key]
        
        //console.log('11111',this.selectedRows1,this.selectedRowKeys1)
      }

     
     
    },
    methods: {
      setModalVisible(close) {
        console.log(close)
        if (!close) {
          this.isShow = false
        }
      },

      setModalVisibleTrac(close) {
        if (!close) {
          this.isShowTrac = false
        }
      },

      getWireItem(item) {
        let obj = {}
        item.key = this.wireKey + 1
        obj = JSON.parse(JSON.stringify(item))
        this.wireKey = this.wireKey + 1
        this.wireDataSource.push(obj)
        this.isShow = false
        this.$store.commit('renewData', { name:'exhibitObject',data:this.wireDataSource })
      },

      getLeashItem(item) {
        let obj = {}
        obj = JSON.parse(JSON.stringify(item))
        obj.key = this.leashKey + 1
        // obj = JSON.parse(JSON.stringify(item))
        this.leashKey = this.leashKey + 1
        this.leashDataSource.push(obj)
        this.isShowTrac = false
        this.$store.commit('renewData', { name:'recommendedTract',data:this.leashDataSource })
      },

      delwire() {
        let data = [...this.wireDataSource]
        this.selectedRows1.forEach(item => {
          data = data.filter(item2 => item2.key != item.key)
        })
        this.selectedRowKeys1 = []
        this.selectedRows1 = []
        this.wireDataSource = data
        this.$store.commit('renewData', { name:'exhibitObject',data:this.wireDataSource })
      },

      delleash() {
        let data = [...this.leashDataSource]
        this.selectedRows.forEach(item => {
          data = data.filter(item2 => item2.key != item.key)
        })
        this.selectedRowKeys = []
        this.selectedRows = []
        this.leashDataSource = data
        this.$store.commit('renewData', { name:'recommendedTract',data:this.leashDataSource })
      },

      showModalTrac() {
        this.isShowTrac = !this.isShowTrac
      },

      showModal() {
        this.isShow = !this.isShow
      },


      onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },

      // 导出数据
      exportWireData() {
          let heads = []
          let columns = []
          columns = this.columns
          columns.forEach( item => {
              let obj = {}
              obj['title'] = item.title
              obj['key'] = item.dataIndex
              heads.push(obj)
          })
          let data = []    // 表格的内容
          let arrNew = this.wireDataSource
          for(let i=0; i<arrNew.length; i++) {
              let obj = arrNew[i];
              let pushObj = {} // 每行都是obj
              columns.forEach( item => {
              let name = item.dataIndex 
              pushObj[name]=obj[name]
              })
              data.push(pushObj)
          }

          let fileName = '展放对象编辑表'
          export_to_csv(heads, data, fileName)
      },

      // 导出数据
      exportLeashData() {
          let heads = []
          let columns = []
          columns = this.recommendColumns
          columns.forEach( item => {
              let obj = {}
              obj['title'] = item.title
              obj['key'] = item.dataIndex
              heads.push(obj)
          })
          let data = []    // 表格的内容
          let arrNew = this.leashDataSource
          for(let i=0; i<arrNew.length; i++) {
              let obj = arrNew[i];
              let pushObj = {} // 每行都是obj
              columns.forEach( item => {
              let name = item.dataIndex 
              pushObj[name]=obj[name]
              })
              data.push(pushObj)
          }

          let fileName = '用户推荐牵引绳规格'
          export_to_csv(heads, data, fileName)
      },


    
      reload() {
        this.reloadFlag = true
        this.$router.replace('/mainScr')
        console.log(this.reloadFlag)
      },

      cancel() {
        this.exportActive = false
      },

      confirm() {
        this.changePathFlag = true
        this.$router.replace(this.toPath)
      }
    },
    created() {
       window.addEventListener('load', this.reload, true)
    },
    beforeRouteLeave (to, from, next) {
      console.log(this.reloadFlag)
      if(this.reloadFlag) {
          //console.log('load')
          next()
      }
      else if(this.selectedRows.length !== 2 && this.selectedRows1 !== 1) { 
        
          this.exportActive = true
          this.toPath = to.path
          // while(this.exportActive) {
          //   if(this.changePathFlag){
          //     next({
          //       path: this.toPath
          //     })
          //     break
          //   }else if(!this.exportActive){
          //     this.$message.warning('需要选择一组展放对象和两组牵引绳')
          //     //console.log(this.$store)
          //     next({
          //       path: '/mainScr/tables/exhibitionObject'
          //     })
          //     break
          //   }
          // }
          if(this.changePathFlag){
              next()
          }else{
            this.$message.warning('需要选择一组展放对象和两组牵引绳')
            //console.log(this.$store)
            next({
              path: '/mainScr/tables/exhibitionObject'
            })
          }
          console.log('load',this.reloadFlag,to,from)
             
        
      }else {
        let changed = false
        this.selectedRowKeys.forEach(item => {
          if(this.rowKeyRecord.find(item2 => item2 == item) == undefined) {
            changed = true
          }
        })
        if(changed == true || this.rowKeyRecord1[0] !== this.selectedRowKeys1[0]) {
          this.$store.commit('getTracRopeAndLeash', {
            wire: this.selectedRows1,
            leash: this.selectedRows,
            changed: changed,
            unfinshed: false,
          })
        }else {
          this.$store.commit('changItem', changed)
        }
        
        next()
      }
    },
    
  }
</script>

<style scoped>
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }

.m-br-10 {
  margin-bottom: 10px;
  margin-right: 10px;
}

.border-box {
  border: 1px solid #1890FF;
  border-radius: 3px;
}

.left{
  width: calc(50% - 595px);
  float: left;
  height: 100px;
  /* background-color: red; */
}
.right{
  width: calc(50% - 595px);
  float: right;
  height: 100px;
  /* background-color: yellow; */
}
.center{
  width: 1190px;
  float: left;
  /* height: 100vh */
  /* background-color: green; */
}

/* @media screen and (min-width: 1024px) and (max-width: 1279px) {
  .center{
    zoom: 0.706;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1439px) {
  .center{
    zoom: 0.92;
  }
} */

</style>