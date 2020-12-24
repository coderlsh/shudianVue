<template>
  <div class="alarm-modal" ref="exhibitObjModal">
      <a-modal
        :footer="null"
        :visible="modalVisible"
        :confirmLoading="confirmLoading"
        :closable="true"
        :mask="false"
        :maskClosable="false"
        :z-index="1000"
        :width="1610"
        style="top: 500px;width: 1610px;margin: 0 auto;"
        :bodyStyle="{ height: '850px',width: '1610px'}"
        wrapClassName="modal"
        @cancel="handleCancle"
        :getContainer="() => this.$refs.exhibitObjModal"
      >
        <div class="CurveContainer">
              <div class="ml-156">
                <a-select style="{width:100px}"
                          showArrow
                          v-model="value" 
                          @change="handleChange"
                          class="mrb-10"
                          >
                    <a-select-option v-for="(value,index) of this.selectList" 
                                    :key="index"
                                    >
                    {{value}}</a-select-option>
                </a-select>
                <a-button class="mrb-10" @click="selectItem" type="primary">选取</a-button>
                <a-button class="mrb-10" @click="cancelSelectItem" type="primary">取消</a-button>
                <!-- <a-button class="mrb-10" type="primary">查询</a-button> -->
            </div>
            <a-card v-show='show' title="选取展放导线规格" :bordered="false" style="width: 80%;margin: 0 auto;">
                <div class="border-box">
                    <a-table class="ant-modal-body" 
                            bordered 
                            :row-selection="rowSelection" 
                            :data-source="wireDataSource" 
                            :pagination="{pageSize:wireListTotal,
                            hideOnSinglePage:true}" 
                            :columns="columns"
                            :scroll="{ y: 500 }">
                        <!-- <template slot="name" slot-scope="text, record">
                            <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                        </template>
                        <template slot="controlPointProperty" slot-scope="text, record">
                            <select-editable-cell :selectWidth=200 :selectList="controlPointProperty" :text="text" @change="onCellChange(record.key, 'name', $event)"></select-editable-cell>
                        </template>
                        <template slot="controlDist" slot-scope="text, record">
                            <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                        </template> -->
                    </a-table>
                </div>
            </a-card>
            <a-card v-show="!show" title="选取展放地线规格" :bordered="false" style="width: 80%;margin: 0 auto;">
                <div class="border-box">
                    <a-table class="ant-modal-body" 
                            bordered 
                            :row-selection="rowSelection" 
                            :data-source="groundWireDataSource" 
                            :pagination="{pageSize:groundWireListTotal,
                            hideOnSinglePage:true}" 
                            :columns="columns"
                            :scroll="{ y: 500 }">
                        <!-- <template slot="name" slot-scope="text, record">
                            <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                        </template>
                        <template slot="controlPointProperty" slot-scope="text, record">
                            <select-editable-cell :selectWidth=200 :selectList="controlPointProperty" :text="text" @change="onCellChange(record.key, 'name', $event)"></select-editable-cell>
                        </template>
                        <template slot="controlDist" slot-scope="text, record">
                            <input-editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"></input-editable-cell>
                        </template> -->
                    </a-table>
                </div>
            </a-card>            
        </div>
      </a-modal>
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
];

export default {
    props: {
      modalVisible:false
    },
    data () {
        return {
          confirmLoading: false,

          columns,
          wireDataSource: [],
          groundWireDataSource: [],
          wireListTotal: 0,
          groundWireListTotal: 0,
          key: 0,
          selectedRows: [],
          selectedRowKeys: [],
          selectList: ['导线','地线'],
          value: '导线',
          show:true
        }
    },
    watch: {

      '$store.state.wireParam'() {
        this.wireDataSource = this.$store.state.wireParam
        this.wireListTotal = this.wireDataSource.length
      },

      '$store.state.groundwireParam'() {
        this.groundWireDataSource = this.$store.state.groundwireParam
        this.groundWireListTotal = this.groundWireDataSource.length
      }
    },
    computed: {
      rowSelection() {
        return {
          selectedRowKeys:this.selectedRowKeys,
          hideDefaultSelections:true,
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            
            this.selectedRows = selectedRows
            this.selectedRowKeys = selectedRowKeys
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        };
      },
    },
    created () {
        
    },
    methods: {

      handleChange(e) {
          this.value = this.selectList[e];
          this.show = !this.show;
          //console.log(e)
      },
        
      handleCancle(e) {
          console.log('点击了modal的close按钮');
          
          this.$emit('setModalVisible', false);
      },

      selectItem() {
        this.selectedRows[0].ropeNature=this.value
        let nowItem = this.selectedRows[0]
        this.selectedRowKeys = []
        this.selectedRows = []
        this.$emit('getSelectItem', nowItem);
      },

      cancelSelectItem() {
        this.selectedRowKeys = []
        this.selectedRows = []
      }
    },
    mounted() {
      this.wireDataSource = this.$store.state.wireParam
      this.groundWireDataSource = this.$store.state.groundwireParam
      this.wireListTotal = this.wireDataSource.length
      this.groundWireListTotal = this.groundWireDataSource.length
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

    .ml-156 {
      margin-left: 156px;
    }

    .alarm-modal >>> .ant-modal-content {
        background-color: rgba(0,110,107, .9);
        box-shadow: 0 0 24px rgba(0,110,107, .8) inset;
        color:rgb(255, 255, 255);
        width: 1610px;
        height: 850px;
    }
    .modal .ant-modal-body {
        overflow-y:auto;
    }
    /* 设置滚动条样式 */
    .modal .ant-modal-body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 4px;
        background-color: transparent;
    }

    .modal .ant-modal-body::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }

    .modal .ant-modal-body::-webkit-scrollbar-thumb {
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