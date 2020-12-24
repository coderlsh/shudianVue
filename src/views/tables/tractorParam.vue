<template>
  <div>
        <wizard-step
          :show1=true
          from='tensionMachineParam'
          next='drawingScaleSet'
        ></wizard-step>
        <a-card title="选取牵引机规格" :bordered="false" style="width: 80%;top: 10px;margin: 0 auto;">
            <div>
                <a-button class="mr-10" @click="addItem" type="primary">添加</a-button>
                <a-button class="mr-10 file-open" type="primary">批量导入
                  <input ref="importData" title="打开" @change.stop="changesData" type="file" name="fixfolder" accept=".csv"  value>
                </a-button>
                <a-button class="mr-10" @click="exportData" type="primary">批量导出</a-button>
                <a-button class="mr-10" @click="delItem" type="primary">删除</a-button>
                <a-button class="mr-10" type="primary">保存</a-button>
                <a-button class="mr-10" @click="quitToMain" type="primary">退出</a-button>
            </div>
            <div class="border-box">
                <a-table
                        bordered  
                        :data-source="dataSource" 
                        :row-selection="rowSelection" 
                        :pagination="{pageSize:listTotal,
                        hideOnSinglePage:true}" 
                        :columns="columns"
                        :scroll="{ y: 550 }">
                    <template slot="name" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                    </template>
                    <template slot="ratedTraction" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'ratedTraction', $event)"></input-editable-cell>
                    </template>
                    <template slot="tractionWheelDiameter" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'tractionWheelDiameter', $event)"></input-editable-cell>
                    </template>
                    <template slot="applicableMaxDiameter" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'applicableMaxDiameter', $event)"></input-editable-cell>
                    </template>
                    <template slot="rounds" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'rounds', $event)"></input-editable-cell>
                    </template>
                    <template slot="mainAnchorHorizontalAngle" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'mainAnchorHorizontalAngle', $event)"></input-editable-cell>
                    </template>
                    <template slot="subAnchorHorizontalAngle" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'subAnchorHorizontalAngle', $event)"></input-editable-cell>
                    </template>
                    <template slot="angleBetweenLineAndAnchor" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'angleBetweenLineAndAnchor', $event)"></input-editable-cell>
                    </template>
                    <template slot="anchorPositionFlag" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'anchorPositionFlag', $event)"></input-editable-cell>
                    </template>
                    <template slot="equipmentWeight" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'equipmentWeight', $event)"></input-editable-cell>
                    </template>
                </a-table>
            </div>
        </a-card> 
  </div>
</template>

<script>
const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
    width: 100,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '额定牵引力(KN)',
    dataIndex: 'ratedTraction',
    width: 100,
    scopedSlots: { customRender: 'ratedTraction' },
  },
  {
    title: '牵引轮直径(mm)',
    dataIndex: 'tractionWheelDiameter',
    width: 100,
    scopedSlots: { customRender: 'tractionWheelDiameter' },
  },
  {
    title: '适用最大钢丝线直径(mm)',
    dataIndex: 'applicableMaxDiameter',
    width: 100,
    scopedSlots: { customRender: 'applicableMaxDiameter' },
  },
  {
    title: '轮数',
    dataIndex: 'rounds',
    width: 100,
    scopedSlots: { customRender: 'rounds' },
  },
  {
    title: '主锚水平夹角',
    dataIndex: 'mainAnchorHorizontalAngle',
    width: 100,
    scopedSlots: { customRender: 'mainAnchorHorizontalAngle' },
  },
  {
    title: '附锚水平夹角',
    dataIndex: 'subAnchorHorizontalAngle',
    //width: '8%',
    width: 100,
    scopedSlots: { customRender: 'subAnchorHorizontalAngle' },
  },
  {
    title: '锚点地锚连线与地锚夹角',
    dataIndex: 'angleBetweenLineAndAnchor',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'angleBetweenLineAndAnchor' },
  },
  {
    title: '锚点位置标志位',
    dataIndex: 'anchorPositionFlag',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'anchorPositionFlag' },
  },
  {
    title: '设备重量(t)',
    dataIndex: 'equipmentWeight',
    //width: '8%',
    //width: 100,
    scopedSlots: { customRender: 'equipmentWeight' },
  },
];

import inputEditableCell from './editableCell/inputEditableCell'

import wizardStep from 'components/wizardStep/wizardStep.vue'

import { export_to_csv } from 'common/utils/exportData.js'

  export default {
    components: {
      inputEditableCell,
      wizardStep
    },
    data () {
      return {
          columns,
          dataSource: [],
          selectedRows: [],
          listTotal: 0,
          key: 0
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
    watch: {
        dataSource() {
            this.listTotal = this.dataSource.length
        },

        '$store.state.tractorParam'() {
            //console.log('changed',this.$store.state.wireParam)
            this.dataSource = this.$store.state.tractorParam
            this.key = this.dataSource.length == 0 ? 0 : this.dataSource[this.dataSource.length - 1].key
            // console.log('changed',this.key)
        }
    },
    mounted() {
        this.listTotal = this.dataSource.length
        this.dataSource = this.$store.state.tractorParam
        this.key = this.dataSource.length == 0 ? 0 : this.dataSource[this.dataSource.length - 1].key
    },
    methods: {
        // 添加
        addItem() {
            this.key = this.key + 1
            let insertData = {
                key: this.key,
                name: '',
                ratedTraction: '',
                tractionWheelDiameter: '',
                applicableMaxDiameter: '',
                rounds: '',
                mainAnchorHorizontalAngle: '',
                subAnchorHorizontalAngle: '',
                angleBetweenLineAndAnchor: '',
                anchorPositionFlag: '',
                equipmentWeight: '',
            }
            this.dataSource.push(insertData)
        },

        // 批量上传
        changesData () {
            var patt = new RegExp('牵引机')
            if(this.$refs.importData.files[0].name.match(patt) && this.$refs.importData.files[0].name.match(/\.(?:csv|xls|xlsx)$/i)) {
                var reader = new FileReader() //new一个FileReader实例
                if(typeof FileReader == 'undefined') {
                    alert("你的浏览器暂不支持该功能")
                    return
                }
                reader.readAsText(this.$refs.importData.files[0],'GB2312')
                let name = this.$refs.importData.files[0].name
                let that = this
                reader.name = name
                reader.onload = function(f) {
                    that.$store.commit('updatedFile', { data:this.result.split('\n'), name:f.target.name })
                }
                this.$refs.importData.value = null
            }else {
                this.$message.error('需要上传包含"牵引机"命名的csv文件')
            }
        },

        // 删除
        delItem() {
            if(this.selectedRows.length == 0) {
                this.$message.warning('请先选中需要删除的数据')
            }else {
                let that = this
                let dataSource = this.dataSource.filter( item => {
                    return item.key != that.selectedRows[0].key
                })
                this.dataSource = dataSource
                this.$store.commit('renewData', { name:'tractor',data:dataSource })
            }
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

            let fileName = '牵引机参数'
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

        onCellChange(key, dataIndex, value) {
          const dataSource = [...this.dataSource];
          const target = dataSource.find(item => item.key === key);
          if (target) {
            target[dataIndex] = value;
            this.dataSource = dataSource;
          }
        },
    },
  }
</script>

<style scoped>
    /* margin-right 10px */
    .mr-10{
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .border-box {
        border: 1px solid #1890FF;
        border-radius: 3px;
    }
 
    .file-open input {
        position: absolute;
        font-size: 100px;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
