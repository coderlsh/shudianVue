<template>
  <div>
        <wizard-step 
            :show1=false
            next='groundWireParam'
        ></wizard-step>
        <a-card class="containerScale" title="选取导线规格" :bordered="false" style="width: 80%;top: 10px;margin: 0 auto;">
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
                    <template slot="structure" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'structure', $event)"></input-editable-cell>
                    </template>
                    <template slot="specification" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'specification', $event)"></input-editable-cell>
                    </template>
                    <template slot="outerDiameter" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'outerDiameter', $event)"></input-editable-cell>
                    </template>
                    <template slot="length" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'length', $event)"></input-editable-cell>
                    </template>
                    <template slot="singleRopeWeight" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'singleRopeWeight', $event)"></input-editable-cell>
                    </template>
                    <template slot="massPerMeter" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'massPerMeter', $event)"></input-editable-cell>
                    </template>
                    <template slot="breakingForce" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'breakingForce', $event)"></input-editable-cell>
                    </template>
                    <template slot="crossArea" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'crossArea', $event)"></input-editable-cell>
                    </template>
                    <template slot="frictionCoefficient" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'frictionCoefficient', $event)"></input-editable-cell>
                    </template>
                    <template slot="safeLowerLimit" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'safeLowerLimit', $event)"></input-editable-cell>
                    </template>
                    <template slot="safeUpperLimit" slot-scope="text, record">
                        <input-editable-cell :text="text" @change="onCellChange(record.key, 'safeUpperLimit', $event)"></input-editable-cell>
                    </template>
                </a-table>
            </div>
        </a-card> 
  </div>
</template>

<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '结构',
    dataIndex: 'structure',
    
    scopedSlots: { customRender: 'structure' },
  },
  {
    title: '规格',
    dataIndex: 'specification',
    
    scopedSlots: { customRender: 'specification' },
  },
  {
    title: '外径(mm)',
    dataIndex: 'outerDiameter',
   
    scopedSlots: { customRender: 'outerDiameter' },
  },
  {
    title: '单盘长度(m)',
    dataIndex: 'length',
   
    scopedSlots: { customRender: 'length' },
  },
  {
    title: '单盘绳净重(kg)',
    dataIndex: 'singleRopeWeight',
    
    scopedSlots: { customRender: 'singleRopeWeight' },
  },
  {
    title: '每米质量(kg/m)',
    dataIndex: 'massPerMeter',
    //width: '8%',
    
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
        listData() {
            return this.$store.state.wireParam;
        },

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

        listData(val) {
            console.log('changed',val)
        },

        '$store.state.wireParam'() {
            //console.log('changed',this.$store.state.wireParam)
            this.dataSource = this.$store.state.wireParam
            this.key = this.dataSource.length == 0 ? 0 : this.dataSource[this.dataSource.length - 1].key
            // console.log('changed',this.key)
        }
    },
    mounted() {
        this.listTotal = this.dataSource.length
        this.dataSource = this.$store.state.wireParam
        this.key = this.dataSource.length == 0 ? 0 : this.dataSource[this.dataSource.length - 1].key
    },
    methods: {
        // 添加
        addItem() {
            this.key = this.key + 1
            let insertData = {
                key: this.key,
                name: '',
                structure: '',
                specification: '',
                outerDiameter: '',
                length: '',
                singleRopeWeight: '',
                massPerMeter: '',
                breakingForce: '',
                crossArea: '',
                frictionCoefficient: '',
                safeLowerLimit: '3',
                safeUpperLimit: '5',
            }
            this.dataSource.push(insertData)
            console.log(this.$store.state.wireParam)
        },

        // 批量上传
        changesData () {
            var patt = new RegExp('导线')
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
                this.$message.error('需要上传包含"导线"命名的csv文件')
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
                this.$store.commit('renewData', { name:'wire',data:dataSource })
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

            let fileName = '导线参数'
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
          console.log('xiugai',this.dataSource)
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

    @media screen and (min-width: 1024px) and (max-width: 1279px) {
        .containerScale{
            zoom: 0.7;
        }
    }
    
</style>
