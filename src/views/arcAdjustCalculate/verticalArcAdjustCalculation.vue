<template>
  <div class="cross-calculate">
    <div class="left"></div>
    <div class="center">
      <div class="input-parameter">
        <div style="color: red;">输入参数</div>
        <a-button @click="getInputParam" type="primary" style="margin-left:10px;top: -2px">打开输入参数</a-button>
      </div>
      <a-table class="table1" :columns="columns" 
               
               :scroll="{ x: 1300 }"    
               :data-source="dataSource">
      </a-table>
    </div>
    <div class="right"></div>
    <arc-adjust-modal :modalVisible="isShow"
                       @setModalVisible="setModalVisible">
    </arc-adjust-modal>
    <!-- <a-button type="primary" block>点击拾取第一点的坐标</a-button> -->
  </div>
</template>

<script>
import arcAdjustModal from './modal/arcAdjustModal'

const columns = [
  {
    title: '档位名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '竣工弧垂',
    dataIndex: 'completionSag',
    key: 'completionSag',
  },
  {
    title: '水平应力',
    dataIndex: 'horizontalStress',
    key: 'horizontalStress',
   
  },
  {
    title: 'cos',
    dataIndex: 'cos',
    key: 'cos',

  },
  {
    title: '等效档距',
    dataIndex: 'equivalentSpan',
    key: 'equivalentSpan',

  },
  {
    title: '等效弧垂',
    dataIndex: 'equivalentSag',
    key: 'equivalentSag',

  },
  {
    title: 'Y(ln)',
    dataIndex: 'Yln',
    key: 'Yln',

  },
  {
    title: 'M',
    dataIndex: 'M',
    key: 'M',

  },
  {
    title: 'Y',
    dataIndex: 'Y',
    key: 'Y',

  },
  {
    title: '各档应力',
    dataIndex: 'stress',
    key: 'stress',

  },
  {
    title: '各档施工△f',
    dataIndex: 'eachConstructionF',
    key: 'eachConstructionF',

  },
  {
    title: '线夹调整量',
    dataIndex: 'clampAdjustment',
    key: 'clampAdjustment',
  },
];

  export default {
    name:"drawingScaleSet",
    data () {
      return {
        isShow: true,

        columns,

        wireRatioLoad: '',
        elasticModulus: '',
        sagCoefficient: '',

        lAndH: [],

        dataSource:[]
      }
    },
    watch: {
    },
    components: {
      arcAdjustModal
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
          this.wireRatioLoad = item.wireRatioLoad
          this.elasticModulus = item.elasticModulus
          this.sagCoefficient = item.sagCoefficient
          this.lAndH = item.dataSource
          this.getParam()
          // console.log(this.wireRatioLoad,this.elasticModulus,this.sagCoefficient,this.lAndH )
        }
      },

      getParam() {
        //console.log(this.inputParam !== '{}')
        if(this.lAndH.length !== 0){
          let list = [], YlnAndM = 0, sumM = 0, Y = 0
          for(let i = 0; i < this.lAndH.length; i ++){
            let diff = this.lAndH[i].diffHeigh / this.lAndH[i].span, span = this.lAndH[i].span
            let cos = (Math.cos(Math.atan(diff))).toFixed(4)
            let sin = Math.sin(Math.atan(diff))
            let completionSag = (this.sagCoefficient / cos * ( span / 100 ) ** 2).toFixed(3)
            let horizontalStress = (span ** 2 * this.wireRatioLoad / (8 * cos * completionSag)).toFixed(4)
            let equivalentSpan = (span - 2 * horizontalStress * sin / this.wireRatioLoad).toFixed(2)
            let equivalentSag = (equivalentSpan ** 2 * this.wireRatioLoad / (8 * cos * horizontalStress)).toFixed(2)
            let Yln = i == 0 ? 0 : (this.lAndH[i - 1].diffHeigh - equivalentSag + +list[i - 1].Yln + +list[i - 1].equivalentSag).toFixed(2)
            let M = -((span ** 3 * this.wireRatioLoad ** 2 * cos/(12 * horizontalStress ** 3) + span/(this.elasticModulus*cos**2))).toFixed(3)
            YlnAndM = YlnAndM + Yln * M
            sumM = sumM + M
            if(i == this.lAndH.length - 1){
              Y = (YlnAndM / sumM).toFixed(3)
            }
            let obj = {
              name: this.lAndH[i].name,
              key: this.lAndH[i].key,
              cos: cos,
              completionSag:completionSag,
              horizontalStress:horizontalStress,
              equivalentSpan:equivalentSpan,
              equivalentSag:equivalentSag,
              Yln:Yln,
              M:M,
              Y: '',
              stress: '',
              eachConstructionF: '',
              clampAdjustment: ''
            }
            list.push(obj)
          }
          for(let i = 0; i < this.lAndH.length; i ++){
            let diff = this.lAndH[i].diffHeigh / this.lAndH[i].span, span = this.lAndH[i].span
            let cos = Math.cos(Math.atan(diff))
            list[i].Y = Y
            if(i == 0){
              list[i].stress = (list[i].horizontalStress - this.wireRatioLoad * Y).toFixed(4)
              list[i].clampAdjustment = (list[i].M*(list[i].stress-list[i].horizontalStress)).toFixed(3)
            }else{
              list[i].stress = (+list[0].stress + +this.wireRatioLoad * list[i].Yln).toFixed(4)
              list[i].clampAdjustment = (+list[i-1].clampAdjustment + list[i].M*(list[i].stress-list[i].horizontalStress)).toFixed(3)
            }
            list[i].eachConstructionF = (span ** 2 * this.wireRatioLoad/(8 * cos * list[i].stress) - list[i].completionSag).toFixed(4)
          }
          this.dataSource = list
        }
      },

      
      
    },

  }
</script>

<style scoped>
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }

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

.title {
  color: white;
  font-size: medium;
  padding: 0.2rem 11.1rem;
}

.input-parameter {
  padding-top: 7px;
  padding-bottom: 7px;
  display: flex;
  flex-wrap: wrap;
  font-size: 22px;
}

.input-parameter div {
  width: 13%;
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
