<template>
  <div class="cross-modal">
    <a-modal
    class="extr-modal"
      :footer="null"
      :visible="modalVisible"
      :confirmLoading="confirmLoading"
      :closable="true"
      :mask="false"
      :maskClosable="false"
      :z-index="1000"
      :width="1610"
      style="top: 500px;width: 430px;margin: 0 auto;"
      :bodyStyle="{width: '1200px'}"
      wrapClassName="modal"
      @cancel="handleCancle"
    >
      <div class="CurveContainer">
        <div style="font-size: 20px;padding-bottom: 11px;
                    border-bottom: 1px solid;margin-bottom: 14px;">输入参数</div>
        <div class="input-parameter">
          <div><span>导线比载</span><span class="input-container"><a-input v-model="wireRatioLoad" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>弹性模量</span><span class="input-container"><a-input v-model="elasticModulus" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
          <div><span>百米弧垂系数(默认10℃)</span><span class="input-container"><a-input v-model="sagCoefficient" @change='numExam' style="width: 70%;height: 100%;margin-left: 12px" /></span></div>
        </div>
          <div v-if="useShow" class="use-data-msg">是否使用当前放线段数据？
            <a-button @click="addData(true)">
              是               
            </a-button>
            <a-button @click="addData(false)">
              否
            </a-button>
          </div>
          <div>
            <a-button class="editable-add-btn" @click="handleAdd">
              点击添加新的档位
            </a-button>
            <a-table class="ant-modal-body"  bordered :pagination="{pageSize: 7}" :data-source="dataSource" :columns="columns">
              <template slot="name" slot-scope="text, record">
                <editable-cell :text="text" type='name' @change="onCellChange(record.key, 'name', $event)" />
              </template>
              <template slot="span" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.key, 'span', $event); testNum(record.span)" />
              </template>
              <template slot="diffHeigh" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.key, 'diffHeigh', $event); ; testNum(record.diffHeigh)" />
              </template>
              <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                  v-if="dataSource.length"
                  title="确定是否删除?"
                  @confirm="() => onDelete(record.key)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import editableCell from '../editableCell/editableCell'
export default {
    props: {
      modalVisible:false
    },
    components: {
      editableCell,
    },
    data () {
        return {
          confirmLoading: false,

          wireRatioLoad: '0.0303249',
          elasticModulus: '63700',
          sagCoefficient: '0.7056',
          
          back: true,
          backList: true,

          useShow: false,

          dataSource: [
            // {
            //   key: '0',
            //   name: 'Edward King 0',
            //   span: '32',
            //   diffHeigh: '0',
            // },
            // {
            //   key: '1',
            //   name: 'Edward King 1',
            //   span: '32',
            //   diffHeigh: '1',
            // },
          ],
          count: 0,
          columns: [
            {
              title: '档位',
              dataIndex: 'name',
              width: '30%',
              scopedSlots: { customRender: 'name' },
            },
            {
              title: '档距',
              dataIndex: 'span',
              width: '30%',
              scopedSlots: { customRender: 'span' },
            },
            {
              title: '悬点高差',
              dataIndex: 'diffHeigh',
              width: '20%',
              scopedSlots: { customRender: 'diffHeigh' },
            },
            {
              title: '删除该档位',
              dataIndex: 'operation',
              scopedSlots: { customRender: 'operation' },
            },
          ],
        }
    },
    watch: {
      modalVisible(){
        if(this.$store.state.extraCoord.length !== 0 && this.dataSource.length == 0){
          this.useShow = true
        }
      },
    },
    computed: {
      
    },
    created () {
        
    },
    methods: {
      testNum(e){
        if(e == '' || isNaN(Number(e))) {
          this.$message.warning('请输入数字！')
          this.backList= false
        }else {
          this.backList = true
        }
      },

      numExam(e) {
        if(isNaN(Number(e.path[0].value))) {
          this.$message.warning('请输入数字！')
          this.back = false
        }else {
          this.back = true
        }
        // console.log(e,Number(e.data),Number(e.data) == NaN,isNaN(Number(e.data)),e.path[0].value)
      },

      addData(flag){
        if(!flag){
          this.useShow = false
        }else{
          this.useShow = false
          let extraCoord = JSON.parse(JSON.stringify(this.$store.state.extraCoord))
          if(extraCoord.length != 0){
            for(let i = 0; i < extraCoord.length - 1; i++) {
                if(extraCoord[i].coordinatePosition == "右" && extraCoord[i+1].coordinatePosition == "左") {
                    if(extraCoord[i].name == extraCoord[i + 1].name ) {
                        let exchang = extraCoord[i]
                        extraCoord[i] = extraCoord[i+1]
                        extraCoord[i + 1] = exchang
                    }
                }
            }
          }
          if(extraCoord.length != 0) {
            let index = 0
            let list = []
            for(let i = 0; i < extraCoord.length - 1; i++) {
              if(extraCoord[i].coordinatePosition !== "中" && extraCoord[i+1].coordinatePosition !== "中") {
                  index = index + 1
                  continue
              }else{
                  let l = (extraCoord[i+1].xCoordinate -
                  extraCoord[i].xCoordinate) * this.$store.state.kx / 1000
                  let h = (extraCoord[i+1].yCoordinate -
                  extraCoord[i].yCoordinate) * this.$store.state.ky / 1000
                  let landh = {
                      key: this.count,
                      name: extraCoord[i].name + '-' + extraCoord[i + 1].name,
                      span: l.toFixed(2),
                      diffHeigh: h.toFixed(2),
                  }
                  this.count = this.count + 1
                  list.push(landh)    
                  //console.log(l.toFixed(2), h,h.toFixed(2))
              }
            }
            this.dataSource = list
          }
        }
      },

      handleCancle(e) {
        
        if(this.back && this.backList) {
          let item = {
            wireRatioLoad: this.wireRatioLoad,
            elasticModulus: this.elasticModulus,
            sagCoefficient: this.sagCoefficient,

            dataSource: this.dataSource,

            closed: false,
          }
          
          this.$emit('setModalVisible', item);
        }else {
          this.$message.warning('输入参数不合适！请修改')
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

      onDelete(key) {
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.key !== key);
        const target1 = this.dataSource.find(item => item.span == '' || isNaN(Number(item.span)));
        const target2 = this.dataSource.find(item => item.diffHeigh == '' || isNaN(Number(item.diffHeigh)));
        if(target1 || target2){
          this.backList = false
        }else{
          this.backList = true
        }
      },

      handleAdd() {
        const { count, dataSource } = this;
        const newData = {
          key: count,
          name: `未命名 ${count}`,
          span: '输入档距',
          diffHeigh: '输入高差',
        };
        this.dataSource = [...dataSource, newData];
        this.count = count + 1;
        this.backList = false
      },

    },
    mounted() {
      if(this.$store.state.extraCoord.length !== 0 && this.dataSource.length == 0){
        this.useShow = true
      }
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

    .p-50 {
      padding-left: 50px;
    }

    .ml-156 {
      margin-left: 156px;
    }

    .extr-modal >>> .ant-modal-content {
      background-color: rgba(0,110,107, .9);
      box-shadow: 0 0 24px rgba(0,110,107, .8) inset;
      color:rgb(255, 255, 255);
      width: 1200px;
      /* height: 430px; */
      margin: 0 auto;
    }
    .cross-modal .ant-modal-body {
        overflow-y:auto;
    }

    .ant-modal-body >>> tbody.ant-table-tbody{
      background: white;
    }

    /* 设置滚动条样式 */
    .cross-modal .ant-modal-body::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 4px;
        background-color: transparent;
    }

    .cross-modal .ant-modal-body::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }

    .cross-modal .ant-modal-body::-webkit-scrollbar-thumb {
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

    .extr-modal >>> .ant-modal-close  {
      color: white;
    }

    .input-parameter {
      padding-top: 5px;
      display: flex;
      flex-wrap: wrap;
    }

    .input-parameter div {
      width: 50%;
      padding-bottom: 17px;
      position: relative;
      font-size: 18px;
    }

    .input-parameter div .input-container{
      position: absolute;
      /* height: 24px; */
      right: 47px;
      top: -2px;
    }

    .use-data-msg{
      font-size: 25px;
      color: red;
      margin: 10px 0;
    }

    .use-data-msg >>> button.ant-btn{
      margin: 0 10px;
    }
</style>