<template>
  <div>
    <div class="left"></div>
    <div class="center">
      <wizard-step
        :show1=true
        from='drawingScaleSet'
        next='controlPoint'
      ></wizard-step>
      <a-card title="坐标管理编辑表" :bordered="false" style="top: 10px;margin: 0 auto;">
        <div class="clearfix">
            <a-button class="m-br-10" @click="getPoint(1)" type="primary">添加</a-button>
            <a-button class="m-br-10" @click="getPoint(2)" type="primary">删除</a-button>
            <a-button class="m-br-10" @click="delList" type="primary">直接删除</a-button>
            <a-button class="m-br-10" @click="getPoint(3)" type="primary">重新取点</a-button>
            <a-button class="m-br-10" @click="exportData" type="primary">保存</a-button>
            <a-button class="m-br-10" @click="quitToMain" type="primary">退出</a-button>
        </div>
        <div>
            <a-table bordered :row-selection="rowSelection" :data-source="dataSource" :pagination="{pageSize: 7}" :columns="columns">
                <template slot="name" slot-scope="text, record">
                    <input-editable-cell :text="text" type='name' @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                </template>
                <template slot="coordinateProperty" slot-scope="text, record">
                    <select-editable-cell :selectList="coordinateProperty" :text="text" @change="onCellChange(record.key, 'coordinateProperty', $event)"></select-editable-cell>
                </template>
                <template slot="coordinatePosition" slot-scope="text, record">
                    <select-editable-cell :selectList="coordinatePosition" :text="text" @change="onCellChange(record.key, 'coordinatePosition', $event)"></select-editable-cell>
                </template>
                <template slot="rotationNum" slot-scope="text, record">
                    <input-editable-cell :text="text" @change="onCellChange(record.key, 'rotationNum', $event)"></input-editable-cell>
                </template>
                <template slot="wirePulleyMoveDist" slot-scope="text, record">
                    <input-editable-cell :text="text" @change="onCellChange(record.key, 'wirePulleyMoveDist', $event)"></input-editable-cell>
                </template>
                <template slot="groundWirePulleyMoveDist" slot-scope="text, record">
                    <input-editable-cell :text="text" @change="onCellChange(record.key, 'groundWirePulleyMoveDist', $event)"></input-editable-cell>
                </template>
                <template slot="towerProperty" slot-scope="text, record">
                    <select-editable-cell :selectList="towerProperty" :text="text" @change="onCellChange(record.key, 'towerProperty', $event)"></select-editable-cell>
                </template>
                <template slot="wireArrive" slot-scope="text, record">
                    <check-editable-cell :text="text" @change="onCellChange(record.key, 'wireArrive', $event)"></check-editable-cell>
                </template>
                <template slot="groundWireArrive" slot-scope="text, record">
                    <check-editable-cell :text="text" @change="onCellChange(record.key, 'groundWireArrive', $event)"></check-editable-cell>
                </template>
            </a-table>
        </div>
      </a-card>
    </div>
    <div class="right"></div>
      
      <confirm-modal text="存在未命名坐标点"
                     v-if="exportActive"
                     @cancel="cancel" 
                     @confirm="confirm">
      </confirm-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '坐标点代号或名称',
    dataIndex: 'name',
    width: '9%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '坐标点性质',
    dataIndex: 'coordinateProperty',
    width: '12%',
    scopedSlots: { customRender: 'coordinateProperty' },
  },
  {
    title: '坐标点位置',
    dataIndex: 'coordinatePosition',
    width: '9%',
    scopedSlots: { customRender: 'coordinatePosition' },
  },
  {
    title: 'X坐标',
    dataIndex: 'xCoordinate',
    width: '12%',
    scopedSlots: { customRender: 'xCoordinate' },
  },
  {
    title: 'Y坐标',
    dataIndex: 'yCoordinate',
    width: '12%',
    scopedSlots: { customRender: 'yCoordinate' },
  },
  {
    title: '转角度数',
    dataIndex: 'rotationNum',
    width: '9%',
    scopedSlots: { customRender: 'rotationNum' },
  },
  {
    title: '导线滑车移动距离',
    dataIndex: 'wirePulleyMoveDist',
    width: '9%',
    scopedSlots: { customRender: 'wirePulleyMoveDist' },
  },
  {
    title: '地线滑车移动距离',
    dataIndex: 'groundWirePulleyMoveDist',
    width: '9%',
    scopedSlots: { customRender: 'groundWirePulleyMoveDist' },
  },
  {
    title: '杆塔性质',
    dataIndex: 'towerProperty',
    width: '9%',
    scopedSlots: { customRender: 'towerProperty' },
  },
  {
    title: '导线是否到达',
    dataIndex: 'wireArrive',
    width: '5%',
    scopedSlots: { customRender: 'wireArrive' },
  },
  {
    title: '地线是否到达',
    dataIndex: 'groundWireArrive',
    width: '5%',
    scopedSlots: { customRender: 'groundWireArrive' },
  },
];

const data = [{
    key: 2,
    name: 'N107',
    coordinateProperty: '挂点',
    coordinatePosition: '左',
    xCoordinate: 3.0,
    yCoordinate: 2.0,
    rotationNum: '0',
    wirePulleyMoveDist: '0',
    groundWirePulleyMoveDist: '0',
    towerProperty: '直线塔',
    wireArrive: '1',
    groundWireArrive: '0'
},
{
    key: 1,
    name: 'N108',
    coordinateProperty: '挂点',
    coordinatePosition: '左',
    xCoordinate: 3.0,
    yCoordinate: 2.0,
    rotationNum: '0',
    wirePulleyMoveDist: '0',
    groundWirePulleyMoveDist: '0',
    towerProperty: '直线塔',
    wireArrive: '1',
    groundWireArrive: '0'
}];

import inputEditableCell from './editableCell/inputEditableCell'
import selectEditableCell from './editableCell/selectEditableCell'
import checkEditableCell from './editableCell/checkEditableCell'

import wizardStep from 'components/wizardStep/wizardStep.vue'

import confirmModal from './modal/confirmModal'

import { export_to_csv } from 'common/utils/exportData.js'

  export default {
    name:"drawingScaleSet",
    data () {
      return {
          lineId: '',

          columns,
          dataSource:[],
          key: 0,
          firstAdd:true,
          selectedRows: [],
          coordinateProperty: ['端点','挂点','转向点','临时支撑点'],
          coordinatePosition: ['中','左','右'],
          towerProperty: ['直线塔','耐张塔'],

          exportActive: false,
          toPath: '',
          changePathFlag: false
      }
    },
    computed: {
      rowSelection() {
        return {
          hideDefaultSelections:true,
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            
            this.selectedRows = selectedRows
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        };
      },
    },
    components: {
        inputEditableCell,
        selectEditableCell,
        checkEditableCell,
        wizardStep,
        confirmModal
    },
    watch: {
      '$store.state.extraCoord'() {
        this.dataSource = this.$store.state.extraCoord
      },
    },
    mounted() {
      document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc  
      this.dataSource = this.$store.state.extraCoord  
      this.key = this.getMaxKey()
    },
    methods: {
      // 单元格修改后的回调
      onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
          // this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource })
        }
        // this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource })
      },

      // 获取最大的key值
      getMaxKey() {
        let arr=[];
        let returnValue = 0
        if(this.dataSource.length !== 0) {
          for(let i=0;i<this.dataSource.length;i++){
            arr.push(this.dataSource[i].key);
          }
          returnValue = Math.max(...arr);
        }
        return returnValue
      },

      // 添加
      insertList(inputData) {
        let length = this.dataSource.length
        let obj = {}
        const dataSource = [...this.dataSource];
        this.key = this.key + 1
        inputData.key = this.key
        console.log('key',this.key,inputData.key)
        let x = inputData.xCoordinate
        console.log(length)
        if(length == 0 ){
          inputData.coordinateProperty = '端点'
          this.dataSource.push(inputData)
        }else{
          if(x < this.dataSource[0].xCoordinate) {
            // console.log('111')
            inputData.coordinateProperty = '端点'
            this.dataSource[0].coordinateProperty = '挂点'
            this.dataSource.unshift(inputData)
          }else if(x > this.dataSource[length - 1].xCoordinate) {
            //console.log('211')
            inputData.coordinateProperty = '端点'
            dataSource[length - 1 ].coordinateProperty = '挂点'
            this.dataSource = dataSource
            // this.$set(this.data[length - 1], 'coordinateProperty', '挂点');
            // this.data[length - 1].coordinateProperty = '挂点'
            this.dataSource.push(inputData)
          }else {
            console.log('311',x,this.dataSource[length - 1].xCoordinate)
            let num = 1
            while(this.dataSource[num].xCoordinate < x) {
              num ++
            }
            this.dataSource.splice(num, 0, inputData)
          }
          this.dataSource[0].coordinateProperty = '端点'
          this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource })
          console.log('data',this.dataSource)
        }
      },

      // 删除
      delPointAndList(value) {
        let data = [...this.dataSource]
        data = data.filter(item => item.pointId != value)
        let length = data.length
        if(length != 0) {
          data[0].coordinateProperty = '端点'
          data[length - 1].coordinateProperty = '端点'
        }
        this.dataSource = data
        this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource })
      },

      // 彻底删除
      delList() {
        let data = [...this.dataSource]
        this.selectedRows.forEach(item => {
          data = data.filter(item2 => item2.key != item.key)
        })
        this.dataSource = data
        this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource })
        //console.log(this.dataSource)
      },

      // 添加，删除，重新取点
      getPoint(index) {
        this.$store.commit('visibleAble', false)
        document.getElementById("MxDrawXCtrl").DoCommand(Number(index));
      },

      // 导出数据
      exportData() {
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
        let arrNew = this.dataSource
        for(let i=0; i<arrNew.length; i++) {
            let obj = arrNew[i];
            let pushObj = {} // 每行都是obj
            columns.forEach( item => {
            let name = item.dataIndex 
            pushObj[name]=obj[name]
            })
            data.push(pushObj)
        }

        let fileName = '坐标管理'
        export_to_csv(heads, data, fileName)
      },

      // 退出
      quitToMain() {
        if(this.$route.path == '/mainScr'){
          this.$store.commit('visibleAble', false)
        }else {
          this.$router.replace('/mainScr')
          this.$store.commit('visibleAble', false)
        }
      },

      // 控件调用函数
      DoCommandEventFunc(iCmd){
        var mxOcx = document.all.item("MxDrawXCtrl");
        if (iCmd == 1) {
          mxOcx.focus();
          var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点2:");
          if(point1 == null)
          {
            return;
          }
          // 直线的id
          var lineId = mxOcx.DrawCircle(point1.x,point1.y, 12)
          var ent = mxOcx.ObjectIdToObject(lineId);
          var insertData = {
            key: 0,
            name: '未命名',
            coordinateProperty: '挂点',
            coordinatePosition: '中',
            xCoordinate: point1.x,
            yCoordinate: point1.y,
            rotationNum: '0',
            wirePulleyMoveDist: '0',
            groundWirePulleyMoveDist: '0',
            towerProperty: '直线塔',
            wireArrive: '0',
            groundWireArrive: '0',
            pointId:lineId
          }
          this.lineId = lineId
          console.log(lineId,point1.x,point1.y)
          var color = mxOcx.NewComObject("IMxDrawMcCmColor");
          color.SetRGB(255,0,0);
 
          // 设置实体颜色。
          ent.TrueColor = color;
          // 为新写的直线写一个字符串扩展数据
          var database = mxOcx.GetDatabase();
            
          // 得到层表.
          var layerTable = database.GetLayerTable();
          var sLayerName = "coordinatelayer";
          // 得到层。
          var layer = layerTable.GetAt(sLayerName, true);
          //console.log(layer)
          if (layer == null)
          {
              // 如果没有层，就新建一个层。
              mxOcx.AddLayer(sLayerName);
          }
       
          // 设置实体层名到指定层上。
          ent.Layer = sLayerName;
          // var ent = database.ObjectIdToObject(lineId);                  
          //console.log(database.ObjectIdToObject(lineId))
          this.$store.commit('visibleAble', true)
          this.insertList(insertData)
        }
        if(iCmd == 2) {
          // 由id得到实体对象.
          //var mxOcx = document.all.item("MxDrawXCtrl");
          

          //实例化一个构造选择集进行过滤,该类封装了选择集及其处理函数。
          var ss = mxOcx.NewSelectionSet();
          //构造一个过滤链表
          var spFilte = mxOcx.NewResbuf();
          spFilte.AddStringEx("coordinatelayer", 8);
          //在一个点构造选择集
          var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
          var vPt1 = mxOcx.NewPoint();
          vPt1.x = point1.x - 5;
          vPt1.y = point1.y - 10
          //定义第二个点的位置
          var vPt2 = mxOcx.NewPoint();
          vPt2.x = point1.x + 5;
          vPt2.y = point1.x + 10;
          //选取跨范围的实体
          ss.Select(1, vPt1, vPt2,spFilte);
          //ss.SelectAtPoint (point1, spFilte);
          for (var i = 0; i < ss.Count; i++)
          {
              var ent = ss.Item(i);
              var id = ent.ObjectID
              // console.log(id, ent.ObjectName);
              if (ent.ObjectName == "McDbCircle") {
                ent.Erase()
                this.delPointAndList(id)
              }
          }
          this.$store.commit('visibleAble', true)
        }
        if(iCmd == 3) {
          //var mxOcx = document.all.item("MxDrawXCtrl");
          var id = this.selectedRows[0].pointId
          var obj = mxOcx.ObjectIdToObject(id);
          obj.Erase()
          this.delPointAndList(id)
          this.DoCommandEventFunc(1)
        }
      },

      cancel() {
        this.exportActive = false
      },

      confirm() {
        this.changePathFlag = true
        this.$router.replace(this.toPath)
      }
    },
    beforeRouteLeave (to, from, next) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.name === '未命名');
      if (target) {
        
        this.exportActive = true
        this.toPath = to.path
        if(this.changePathFlag) {
          this.$store.commit('visibleAble', false)
          next()
        }else{
          this.$store.commit('visibleAble', true)
        }
      }else{
        this.$store.commit('renewData', { name:'extractCoordinate',data:this.dataSource, unfinshed: false,})
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

.left{
  width: calc(50% - 746.4px);
  float: left;
  height: 100px;
  /* background-color: red; */
}
.right{
  width: calc(50% - 746.4px);
  float: right;
  height: 100px;
  /* background-color: yellow; */
}
.center{
  width: 1492.8px;
  float: left;
  /* height: 100vh */
  /* background-color: green; */
}
</style>