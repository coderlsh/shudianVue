<template>
  <div>
    <div class="left"></div>
    <div class="center">
      <wizard-step
        :show1=true
        from='extractCoordinate'
        next='exhibitionObject'
      ></wizard-step>
      <a-card title="控制点管理编辑表" :bordered="false" style="top: 10px;margin: 0 auto;">
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
                    <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                </template>
                <template slot="controlPointProperty" slot-scope="text, record">
                    <select-editable-cell :selectWidth=200 :selectList="controlPointProperty" :text="text" @change="onCellChange(record.key, 'controlPointProperty', $event)"></select-editable-cell>
                </template>
                <template slot="controlDist" slot-scope="text, record">
                    <input-editable-cell :text="text" @change="onCellChange(record.key, 'controlDist', $event)"></input-editable-cell>
                </template>
            </a-table>
        </div>
      </a-card>
    </div>
    <div class="right"></div>
      
      <confirm-modal text="存在未命名控制点"
                     v-if="exportActive"
                     @cancel="cancel" 
                     @confirm="confirm">
      </confirm-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '控制点代号',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '控制点性质',
    dataIndex: 'controlPointProperty',
    width: '20%',
    scopedSlots: { customRender: 'controlPointProperty' },
  },
  {
    title: 'X坐标',
    dataIndex: 'xCoordinate',
    width: '20%',
    scopedSlots: { customRender: 'xCoordinate' },
  },
  {
    title: 'Y坐标',
    dataIndex: 'yCoordinate',
    width: '20%',
    scopedSlots: { customRender: 'yCoordinate' },
  },
  {
    title: '控制距离',
    dataIndex: 'controlDist',
    width: '20%',
    scopedSlots: { customRender: 'controlDist' },
  },
];


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
          controlPointProperty: ['220V','10KV','35KV','110KV','220KV','330KV','500KV','1000KV','±400KV',
          '±500KV','±800KV','一级公路','二级公路','三级公路','四级公路','城市道路','林区道路','厂矿道路','普通道路',
          '一级通航河流','二级通航河流','三级及以下通航河流','不通航河流','地面'
          ],

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
      '$store.state.controlPoint'() {
        this.dataSource = this.$store.state.controlPoint
      },
    },
    mounted() {
      document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
      this.dataSource = this.$store.state.controlPoint  
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
        }
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
        let x = inputData.xCoordinate
        console.log(length)
        if(length == 0 ){
          this.dataSource.push(inputData)
        }else{
          if(x < this.dataSource[0].xCoordinate) {
            this.dataSource.unshift(inputData)
          }else if(x > this.dataSource[length - 1].xCoordinate) {
            this.dataSource = dataSource
            this.dataSource.push(inputData)
          }else {
            let num = 1
            while(this.dataSource[num].xCoordinate < x) {
              num ++
            }
            this.dataSource.splice(num, 0, inputData)
          }
          this.$store.commit('renewData', { name:'contrPoint',data:this.dataSource })
        }
      },

      // 删除
      delPointAndList(value) {
        let data = [...this.dataSource]
        data = data.filter(item => item.pointId != value)
        this.dataSource = data
        this.$store.commit('renewData', { name:'contrPoint',data:this.dataSource })
      },

      // 彻底删除
      delList() {
        let data = [...this.dataSource]
        this.selectedRows.forEach(item => {
          data = data.filter(item2 => item2.key != item.key)
        })
        this.dataSource = data
        this.$store.commit('renewData', { name:'contrPoint',data:this.dataSource })
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

          let fileName = '控制点管理'
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
            name: '',
            controlPointProperty: '',
            xCoordinate: point1.x,
            yCoordinate: point1.y,
            controlDist: '0',
            pointId:lineId
          }
          this.lineId = lineId
          console.log(lineId,point1.x,point1.y)
          var color = mxOcx.NewComObject("IMxDrawMcCmColor");
          color.SetRGB(0,0,255);
  
          // 设置实体颜色。
          ent.TrueColor = color;
          // 为新写的直线写一个字符串扩展数据
          var database = mxOcx.GetDatabase();
              
          // 得到层表.
          var layerTable = database.GetLayerTable();
          var sLayerName = "controlPointlayer";
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
          spFilte.AddStringEx("controlPointlayer", 8);
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
        const target = dataSource.find(item => item.name === '');
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
          this.$store.commit('renewData', { name:'contrPoint',data:this.dataSource,unfinshed: false})
          next()
        }

        // this.$store.commit('renewData', { name:'contrPoint',data:this.dataSource })
        // next()
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