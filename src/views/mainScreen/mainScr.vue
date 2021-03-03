<template>
  <div class="main">
      <div class="main-menu scroll-bar">
        <a-menu @click="changeDetailMenu" :open-keys="openKeys" v-model="selectKeys" mode="inline" @openChange="onOpenChange">
            <a-sub-menu key="sub1">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />文件</span>
                <!-- <a-menu-item key="new" @click="handleOk">
                    新建
                </a-menu-item> -->
                <a-menu-item class="file-open" key="open">
                    打开<input ref="file" title="打开" @change.stop="changesData" type="file" name="fixfolder" webkitdirectory multiple value>
                </a-menu-item>
                <a-menu-item @click="getPoint(105)" :disabled='disable' key="save">
                    保存
                </a-menu-item>
                <a-menu-item @click="getPoint(106)" :disabled='disable' key="print">
                    打印
                </a-menu-item>
                <a-menu-item :disabled='disable' key="quit">
                    退出
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu :disabled='disable' key="sub2">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />系统参数</span>
                <a-sub-menu key="subItem1" title="绳索参数">
                    <a-menu-item key="wire">
                        导线
                    </a-menu-item>
                    <a-menu-item key="groundWire">
                        地线
                    </a-menu-item>
                    <a-menu-item key="leash">
                        牵引绳
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="subItem2" title="设备参数">
                    <a-menu-item key="tensionMachine">
                        张力机
                    </a-menu-item>
                    <a-menu-item key="tractor">
                        牵引机
                    </a-menu-item>
                    <!-- <a-menu-item key="groundAnchor">
                        地锚
                    </a-menu-item> -->
                </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu :disabled='disable' key="sub3">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />坐标管理</span>
                    <a-menu-item key="extractCoordinate">
                        坐标提取
                    </a-menu-item>
                    <a-menu-item key="controlPoint">
                        控制点设置
                    </a-menu-item>
            </a-sub-menu>
            <a-menu-item :disabled='disable' key="exhibitionObject">
                <a-icon type="mail" />
                展放对象
            </a-menu-item>
            <a-sub-menu key="sub5">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />视图</span>
                    <a-menu-item :disabled='openDwgDisable' @click="getPoint(101)" key="projectView">
                        打开DWG文件
                    </a-menu-item>
                    <a-menu-item :disabled='disable' @click="getPoint(100)" key="viewportMovement">
                        视区移动
                    </a-menu-item>
                    <a-menu-item :disabled='disable' key="startWizard">
                        启动向导
                    </a-menu-item>
                    <a-menu-item :disabled='disable' key="displayWindow">
                        显示窗口
                    </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub6">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />计算</span>
                    <a-menu-item :disabled='disable' key="stretCalculation">
                        牵展计算
                    </a-menu-item>
                    <a-menu-item key="crossCalculation">
                        跨越档封网计算
                    </a-menu-item>
                    <a-menu-item key="verticalArcAdjustCalculation">
                        连续上下山垂弧调整计算
                    </a-menu-item>
            </a-sub-menu>
            <a-sub-menu :disabled='disable' key="sub7">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />输出</span>
                    <a-menu-item-group key="forceCalculationTable" title="受力计算结果表">
                        <a-menu-item @click="getForceCalculationTable1" key="forceOUT1">
                            输出一级受力计算表
                        </a-menu-item>
                        <a-menu-item @click="getForceCalculationTable2" key="forceOUT2">
                            输出二级受力计算表
                        </a-menu-item>
                    </a-menu-item-group>
                    <!-- <a-menu-item @click="getForceCalculationTable" key="forceCalculationTable">
                        受力计算结果表
                    </a-menu-item> -->
                    <a-menu-item key="towingRopeConfigTable">
                        牵引绳配置表
                    </a-menu-item>
                    <a-menu-item key="zhangQianEquipConfigTable">
                        张牵设备配置表
                    </a-menu-item>
                    <a-menu-item key="drawChartingInformationTable">
                        绘制制图信息表
                    </a-menu-item>
            </a-sub-menu>
            <a-sub-menu :disabled='disable' key="sub8">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="setting" />帮助</span>
            </a-sub-menu>
        </a-menu>
      </div>
      <!-- <div class="project-catalog">
          <a-tree
            :show-line="true"
            >
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0">
                <a-icon slot="icon" type="carry-out" />
                <span slot="title" style="color: #1890ff">parent 1</span>
                <a-tree-node key="0-0-0" title="parent 1-0">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node key="0-0-0-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                <a-tree-node key="0-0-0-1" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                <a-tree-node key="0-0-0-2" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                </a-tree-node>
                <a-tree-node key="0-0-1" title="parent 1-1">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node key="0-0-1-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                </a-tree-node>
                <a-tree-node key="0-0-2" title="parent 1-2">
                <a-icon slot="icon" type="carry-out" />
                <a-tree-node key="0-0-2-0" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                <a-tree-node key="0-0-2-1" title="leaf">
                    <a-icon slot="icon" type="carry-out" />
                    <a-icon slot="switcherIcon" type="form" />
                </a-tree-node>
                </a-tree-node>
            </a-tree-node>
            </a-tree>
      </div> -->
      <div class="sub-directory"></div>
      <div class="detailed-options">
          <a-menu @click="changeMainMenu" v-model="detailSelectKeys" style="height: 34px" mode="horizontal">
            <!-- <a-menu-item key="mail"> <a-icon type="mail" />新建工程</a-menu-item> -->
            <!-- <a-menu-item key="app1" class="file-open"> <a-icon type="appstore" />
                打开工程<input ref="file" title="打开" @change.stop="changesData" type="file" name="fixfolder" webkitdirectory multiple value>
            </a-menu-item> -->
            <a-menu-item key="drawingScale" :disabled='disable'> <a-icon type="appstore" />图纸比例</a-menu-item>
            <a-menu-item key="extractCoordinate" :disabled='disable'> <a-icon type="appstore" />坐标提取</a-menu-item>
            <a-menu-item key="controlPoint" :disabled='disable'> <a-icon type="appstore" />控制点设置</a-menu-item>
            <a-menu-item key="exhibitionObject" :disabled='disable'> <a-icon type="appstore" />展放对象</a-menu-item>
            <a-menu-item key="stretCalculation" :disabled='disable'> <a-icon type="appstore" />牵展</a-menu-item>
            <!-- <a-menu-item key="app9" :disabled='disable'> <a-icon type="appstore" />结果输出</a-menu-item> -->
            <a-menu-item key="startWizard" :disabled='disable'> <a-icon type="appstore" />启动向导</a-menu-item>
            <a-menu-item key="tensionMachine" :disabled='disable'> <a-icon type="appstore" />张力机</a-menu-item>
            <a-menu-item key="tractor" :disabled='disable'> <a-icon type="appstore" />牵引机</a-menu-item>
            <!-- <a-menu-item key="groundAnchor" :disabled='disable'> <a-icon type="appstore" />地锚参数</a-menu-item> -->
            <!-- <a-menu-item key="app14" :disabled='disable'> <a-icon type="appstore" />切换级数</a-menu-item> -->
            <a-menu-item @click="getPoint(105)" key="app15" :disabled='disable'> <a-icon type="appstore" />保存图纸</a-menu-item>
            <a-menu-item @click="getPoint(106)" key="app16" :disabled='disable'> <a-icon type="appstore" />打印图纸</a-menu-item>
            </a-menu>
      </div>
      <div id="cad-window-id" class="cad-windows scroll-bar" ref="container">
        <p align="center">
            <object id="MxDrawXCtrl" clsid="{74A777F8-7A8F-4e7c-AF47-7074828086E2}" type="application/mxdraw-activex" width="100%" :height="containHeight" align="left" >
                <param="" name="_Version" value="65536">  
                <param name="_ExtentX" value="242620">  
                <param name="_ExtentY" value="162190">  
                <param name="_StockProps" value="0">
                <param name="DwgFilePath" value=""> 
                <param name="IsRuningAtIE" value="1">
                <param name="EnablePrintCmd" value="1">  
                <param name="ShowCommandWindow" value="1">   
                <param name="ShowToolBars" value="1">  
                <param name="ShowModelBar" value="1">
                <param name="Iniset" value="CHROME=Y">  
                <param name="ToolBarFiles" value="">
                <!-- <param name="ShowMenuBar" value="1"> -->
                <param name="EnableUndo" value="1">
                <!-- <param name="ShowPropertyWindow" value="1"> -->
                <param name="Event_ImplementCommandEvent" value="DoCommandEventFunc">
                <span style="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。请点击<a href="http://www.mxdraw.com/MxDrawX52.msi">安装控件</a></span>
            </object> 
        </p>
        <div v-show="$store.state.visible" style="position:absolute;z-index=999999;top:0px;background:transparent!important;width:100%;height:99.9%">
            <iframe scrolling="no" allowtransparency="true" style="width: 100%;;height:99.9%;background:transparent" frameborder="0"></iframe> 
        </div>
      </div>
      <div class="cad-windows scroll-bar">
          <router-view></router-view>
      </div>
      <confirm-modal v-if="active"
                     @cancel="cancel" 
                     @confirm="confirm">
      </confirm-modal>
        <!-- <a-modal  v-model="visible" title="Basic Modal" @ok="handleOk" >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal> -->
          
  </div>
</template>

<script>

import confirmModal from './modal/confirmModal'

import { export_to_csv } from 'common/utils/exportData.js'

  export default {
    name:"mainScr",
    data () {
      return {
        disable: true,
        openDwgDisable: true,

        //caluDisable: true,
        
        // 主菜单参数
        rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8'],
        openKeys: ['sub1'],
        selectKeys: ['sub1'],

        // 详细菜单
        detailSelectKeys: [],

        // 工程路径
        path: {},

        // 工程目录
        treeData: {},

        containHeight: 0,
        
        openFlieflag: true,

        nowRouter: '',

        active: false,
      }
    },
    components: {
        confirmModal
    },
    computed: {
        caluDisable() {
            const dataSource1 = [...this.$store.state.controlPoint];
            const target1 = dataSource1.find(item => item.name === '');
            const dataSource2 = [...this.$store.state.extraCoord];
            const target2 = dataSource2.find(item => item.name === '');
            if(target1 || target2 || 
               JSON.stringify(this.$store.state.wire) == "{}" || 
               this.$store.state.leash.length == 0){
                   return true
            }else {
                return false
            }
            // return this.$store.state.unfinshed1 || this.$store.state.unfinshed2 || this.$store.state.unfinshed3
        }


    },
    watch: {// 如果路由有变化，会再次执行该方法
        '$route'(to,from) {
            // console.log(to.path,from.path,this.nowRouter,this.$route.path)
            this.nowRouter = this.$route.path
            if(this.$route.path !== '/mainScr') {
                var mxOcx = document.all.item("MxDrawXCtrl");
                mxOcx.StopAllCommand()
            }
        },
        
    },
    mounted() {
        document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
        document.getElementById("MxDrawXCtrl").ImplementCustomEvent = this.CustomEvent;
        var mxOcx = document.all.item("MxDrawXCtrl");
        mxOcx.ShowToolBar("常用工具",false);
        mxOcx.ShowToolBar("ET工具",false);
        this.containHeight = this.$refs.container.offsetHeight
        // mxOcx.ShowToolBar("绘图工具",false)
        let elementResizeDetectorMaker = require("element-resize-detector");
        //监听元素变化
        let erd = elementResizeDetectorMaker();
        let that = this;
        erd.listenTo(document.getElementById("cad-window-id"), function (element) {
            that.$nextTick(function () {
                //使echarts尺寸重置
                that.containHeight = this.$refs.container.offsetHeight
                console.log('height changed',that.containHeight)
            })
        })
    },
    methods: {
        
        // 主菜单的展开/关闭的回调
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            console.log(latestOpenKey)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
            console.log(this.openKeys)
        },

        // 主菜单选中时取消详细菜单的选中
        changeDetailMenu(k) {
            this.detailSelectKeys = []
            let key = k.key
            switch(key) {
                case 'wire':
                    if(this.$route.path == '/mainScr/tables/wireParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/wireParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'groundWire':
                    if(this.$route.path == '/mainScr/tables/groundWireParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/groundWireParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'leash':
                    if(this.$route.path == '/mainScr/tables/leashParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/leashParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'tensionMachine':
                    if(this.$route.path == '/mainScr/tables/tensionMachineParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/tensionMachineParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'tractor':
                    if(this.$route.path == '/mainScr/tables/tractorParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/tractorParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'extractCoordinate':
                    if(this.$route.path == '/mainScr/tables/extractCoordinate'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/extractCoordinate')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'controlPoint':
                    if(this.$route.path == '/mainScr/tables/controlPoint'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/controlPoint')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'exhibitionObject':
                    if(this.$route.path == '/mainScr/tables/exhibitionObject'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/exhibitionObject')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'startWizard':
                    if(this.$route.path == '/mainScr/tables/wireParam'){
                        this.$store.commit('visibleAble', true)
                        this.$store.commit('showWizardStep', true)
                    }else {
                        this.$router.replace('/mainScr/tables/wireParam')
                        this.$store.commit('visibleAble', true)
                        this.$store.commit('showWizardStep', true)
                    }
                    break

                case 'stretCalculation':
                    if(this.$route.path == '/mainScr/tables/stretCalculation'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/stretCalculation')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                
                case 'crossCalculation':
                    if(this.$route.path == '/mainScr/crossCalculation'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/crossCalculation')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                
                case 'verticalArcAdjustCalculation':
                    if(this.$route.path == '/mainScr/verticalArcAdjustCalculation'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/verticalArcAdjustCalculation')
                        this.$store.commit('visibleAble', true)
                    }
                    break

                case 'drawChartingInformationTable':
                    if(this.$route.path == '/mainScr/tables/drawChartingInformationTable'){
                        this.$store.commit('visibleAble', true)
                    }else{
                        this.$router.replace('/mainScr/tables/drawChartingInformationTable')
                        this.$store.commit('visibleAble', true)
                    }
                    break

                case 'displayWindow':
                    this.$store.commit('visibleAble', false)
            }
        },
        
        // 详细菜单选中时取消主菜单的选中
        changeMainMenu(key){
            
            this.openKeys = []
            this.selectKeys = []
            let key1 = key.key

            switch(key1) {
                case 'drawingScale':
                    this.$router.replace('/mainScr/tables/drawingScaleSet')
                    this.$store.commit('visibleAble', true)
                    console.log(1111)
                    break
                case 'extractCoordinate':
                    if(this.$route.path == '/mainScr/tables/extractCoordinate'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/extractCoordinate')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'controlPoint':
                    if(this.$route.path == '/mainScr/tables/controlPoint'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/controlPoint')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'exhibitionObject':
                    if(this.$route.path == '/mainScr/tables/exhibitionObject'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/exhibitionObject')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'stretCalculation':
                    if(this.$route.path == '/mainScr/tables/stretCalculation'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/stretCalculation')
                        this.$store.commit('visibleAble', true)
                    }
                    break

                case 'startWizard':
                    if(this.$route.path == '/mainScr/tables/wireParam'){
                        this.$store.commit('visibleAble', true)
                        this.$store.commit('showWizardStep', true)
                    }else {
                        this.$router.replace('/mainScr/tables/wireParam')
                        this.$store.commit('visibleAble', true)
                        this.$store.commit('showWizardStep', true)
                    }
                    break
                case 'tensionMachine':
                    if(this.$route.path == '/mainScr/tables/tensionMachineParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/tensionMachineParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
                case 'tractor':
                    if(this.$route.path == '/mainScr/tables/tractorParam'){
                        this.$store.commit('visibleAble', true)
                    }else {
                        this.$router.replace('/mainScr/tables/tractorParam')
                        this.$store.commit('visibleAble', true)
                    }
                    break
            }
            
        },


        getPoint(index) {
            this.$router.replace('/mainScr')
            if(this.$route.path == '/mainScr') {
                document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
                document.getElementById("MxDrawXCtrl").ImplementCustomEvent = this.CustomEvent;
                this.$store.commit('visibleAble', false)
                document.getElementById("MxDrawXCtrl").DoCommand(index);
            }
        },

        CustomEvent(sEventName)
        {
            //console.log(sEventName)
            if(sEventName == "OpenFileComplete")
            {
            // 控件加载完成.
        
            console.log('complete')  
            var mxOcx = document.all.item("MxDrawXCtrl");
            // var name = mxOcx.GetFileName().split('\\').slice(-3).join('/')
            var name = mxOcx.GetFileName().split('\\').pop()
            console.log('complete',this.$store.state.fileName, name)
            
            if(name != this.$store.state.fileName && this.openFlieflag) {
                mxOcx.NewFile()
                this.openFlieflag = false
                this.$message.warning('打开的dwg文件应当与文件夹中的dwg文件同名')
            }
            
            this.DoCommandEventFunc(102)
            if(name == this.$store.state.fileName ) {
                this.disable = false
            }
            if(name == this.$store.state.fileName && this.$store.state.extraCoord.length != 0) {
                this.DoCommandEventFunc(103)
            }
            if(name == this.$store.state.fileName && this.$store.state.controlPoint.length != 0) {
                this.DoCommandEventFunc(104)
            }
            }
            if(sEventName == 'MxDrawXInitComplete') {
                console.log('chushihuawanc')
            }
            if(sEventName == 'CommandEnded') {
                console.log('end')
            }
        
        },
        DoCommandEventFunc(iCmd){
            if (iCmd == 100) 
            {
                console.log('moveWindows')
                var mxOcx = document.all.item("MxDrawXCtrl");
                mxOcx.SendStringToExecute("p");
            }
            if(iCmd == 101) {
                this.openFlieflag = true
                
                var mxOcx = document.all.item("MxDrawXCtrl");
                //mxOcx.OpenWebDwgFile("http://localhost:8080/151-165放线区段/Input/151-165放线区段.dwg");
                mxOcx.SendStringToExecute("OpenDwg");
            }
            if(iCmd == 102) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                //mxOcx.SendStringToExecute("ZoomE");
                //mxOcx.AutoZoomAll = false
                mxOcx.ZoomAll()
            }
            if(iCmd == 103) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                for(let i =0; i < this.$store.state.extraCoord.length;i++){
                    let x = this.$store.state.extraCoord[i].xCoordinate
                    let y = this.$store.state.extraCoord[i].yCoordinate
                    let cirId = mxOcx.DrawCircle(x, y, 12)
                    this.$store.state.extraCoord[i].pointId = cirId
                    var ent = mxOcx.ObjectIdToObject(cirId);
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
                }
            }
            if(iCmd == 104) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                for(let i =0; i < this.$store.state.controlPoint.length;i++){
                    let x = this.$store.state.controlPoint[i].xCoordinate
                    let y = this.$store.state.controlPoint[i].yCoordinate
                    let cirId = mxOcx.DrawCircle(x, y, 12)
                    this.$store.state.controlPoint[i].pointId = cirId
                    var ent = mxOcx.ObjectIdToObject(cirId);
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
                }
            }
            if(iCmd == 105) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                var name = mxOcx.GetFileName().split('\\').join('\\\\')
                console.log(name)
                mxOcx.SendStringToExecute("SaveAsDwg");
                //mxOcx.SaveDwgFile(name);
            }
            if(iCmd == 106) {
                var mxOcx = document.all.item("MxDrawXCtrl");
               
                mxOcx.SendStringToExecute("Plot");
                //mxOcx.SaveDwgFile(name);
            }
            // 制图信息
            if(iCmd == 107) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                mxOcx.PathMoveTo(0, 0);
 
                //路径的一下个点
                mxOcx.PathLineTo(270, 0);
            
                //路径的一下个点
                mxOcx.PathLineTo(270, 110);
            
                //路径的一下个点
                mxOcx.PathLineTo(0, 110);
            
                //把路径设置成闭合
                mxOcx.PathMakeClosed();
            
                mxOcx.LineType = "";
            
                mxOcx.DrawCADColor = 16711680;

                mxOcx.DrawPathToPolyline();
                
                mxOcx.PathMoveTo(1, 0);
 
                //路径的一下个点
                mxOcx.PathLineTo(269, 0);
            
                //路径的一下个点
                mxOcx.PathLineTo(269, 110);
            
                //路径的一下个点
                mxOcx.PathLineTo(1, 110);
                mxOcx.DrawColor = 0;
                mxOcx.DrawPathToHatch(1);
            
                

                //mxOcx.SaveDwgFile(name);
            }
        },

        changesData () {
            let path = {}
            let i = 0
            console.log(this.$refs.file.files)
            this.$store.commit('clearAll', true)
            this.disable= true
            this.openDwgDisable= false
            for(let k in this.$refs.file.files) {
                if(this.$refs.file.files[k].name!== undefined && this.$refs.file.files[k].name.match(/\.(?:csv|xls|xlsx)$/i)) {
                //   this.upload(k)
                  path[i] = this.$refs.file.files[k].webkitRelativePath.split('/')
                  console.log(path[i])
                //   if(path[i].find(item => item.toLowerCase() == 'input')) {
                    var reader = new FileReader() //new一个FileReader实例
                    if(typeof FileReader == 'undefined') {
                        alert("你的浏览器暂不支持该功能")
                        return
                    }
                    reader.readAsText(this.$refs.file.files[k],'GB2312')
                    let name = this.$refs.file.files[k].name
                    let that = this
                    reader.name = name
				    reader.onload = function(f) {
                        // console.log(this.result.split('\n'),f.target.name);
                        that.$store.commit('updatedFile', { data:this.result.split('\n'), name:f.target.name })
				    }
                //   }
                //   if(i == 0){
                //     this.treeData = this.integratedTreeData(path[i], {})
                //   }else{
                //     this.integratedTree(path[i])
                //   }
                //   console.log(this.treeData)
                //   i ++
                


                }
                if(this.$refs.file.files[k].name!== undefined && this.$refs.file.files[k].name.match(/\.(?:dwg)$/i)) {
                    var name = this.$refs.file.files[k].webkitRelativePath.split('/').pop()
                    //console.log('name',name,this.$refs.file.files[k])
                    this.$store.commit('getFileName', name)
                    if(name !== JSON.parse(localStorage.getItem('fileName'))){
                        localStorage.setItem("extraCoord", "[]")
                        localStorage.setItem("controlPoint", "[]")
                        localStorage.setItem('fileName', JSON.stringify(name));
                    }else if(localStorage.getItem('extraCoord') !== "[]" || localStorage.getItem('controlPoint') !== "[]"){
                        this.$store.commit('visibleAble', true)
                        let that = this
                        setTimeout(() => {
                            that.active = true
                        },50)
                        console.log('same project')
                        
                    }
                    
                    //console.log('name changed',name,JSON.parse(localStorage.getItem('fileName')), name == JSON.parse(localStorage.getItem('fileName'))) 
                }
                //else {
                // //   this.$refs.file.files[k] = undefined /\.(?:csv|xls|xlsx)$/i
                // console.log('delet',document.all.fixfolder.value)
                // }

            }
            this.path = path
            this.openDwgDisable = false
            console.log(this.path);
            this.$refs.file.value = null
        },

        // uploadChange(){
        //     this.$refs.file.value = null
        // },

        cancel() {
            this.active = false
            this.$store.commit('visibleAble', false)
        },

        confirm() {
            // let extraCoord = JSON.parse(localStorage.getItem('extraCoord'))
            // let contrPoint = JSON.parse(localStorage.getItem('controlPoint'))
            this.$store.commit('renewData', { name:'extractCoordinate',data:JSON.parse(localStorage.getItem('extraCoord'))})
            this.$store.commit('renewData', { name:'contrPoint',data:JSON.parse(localStorage.getItem('controlPoint')) })
            this.active = false
            this.$store.commit('visibleAble', false)
            //this.changePathFlag = true
            //this.$router.replace(this.toPath)
        },

        getForceCalculationTable1(){
            if(this.$store.state.tableData1.length !== 0){
                let heads = []
                let columns = []
                columns = this.$store.state.colums1
                columns.forEach( item => {
                    let obj = {}
                    obj['title'] = item.title
                    obj['key'] = item.dataIndex
                    heads.push(obj)
                })
                let data = []    // 表格的内容
                let arrNew = this.$store.state.tableData1
                for(let i=0; i<arrNew.length; i++) {
                    let obj = arrNew[i];
                    let pushObj = {} // 每行都是obj
                    columns.forEach( item => {
                        let name = item.dataIndex 
                        pushObj[name]=obj[name]
                    })
                    data.push(pushObj)
                }
                let fileName = '一级放线受力结果表'
                export_to_csv(heads, data, fileName)
            }else{
                this.$message.warning('没有一级放线计算数据，请先进行计算')
            }
        },

        getForceCalculationTable2(){
            if(this.$store.state.tableData2.length !== 0){
                let heads = []
                let columns = []
                columns = this.$store.state.colums2
                columns.forEach( item => {
                    let obj = {}
                    obj['title'] = item.title
                    obj['key'] = item.dataIndex
                    heads.push(obj)
                })
                let data = []    // 表格的内容
                let arrNew = this.$store.state.tableData2
                for(let i=0; i<arrNew.length; i++) {
                    let obj = arrNew[i];
                    let pushObj = {} // 每行都是obj
                    columns.forEach( item => {
                        let name = item.dataIndex 
                        pushObj[name]=obj[name]
                    })
                    data.push(pushObj)
                }

                let fileName = '二级放线受力结果表'
                export_to_csv(heads, data, fileName)
            }else{
                this.$message.warning('没有二级放线计算数据，请先进行计算')
            }
        },

        // test
        handleOk(){
            if(this.$store.state.visible) {
                this.$router.replace('/mainScr')
                this.$store.commit('visibleAble', false)
            }else {
                this.$router.replace('/mainScr/tables/drawingScaleSet')
                this.$store.commit('visibleAble', true)
            }
            
            //this.visible = !this.visible
        },

        // 将数组整合为树结构
        integratedTreeData(path, tree, key) {
            let treeData = {}
            treeData['title'] = path[0]
            treeData['key'] = key ? key + '-0' : '0-0' 
            if(path.length !== 0) {
                path.shift()
                if(path.length !== 0) {treeData['children'] = []}
                // else if(tree.hasOwnProperty('children')) {
                //     let indexList = tree['children'][tree['children'].length - 1].split('-')
                //     let index = Number(indexList[indexList.length - 1]) + 1
                //     indexList[indexList.length - 1]  = index
                //     treeData['key'] = indexList.join('-')
                //     console.log(treeData["key"])
                // }
                if(JSON.stringify(tree) !== '{}' && tree.hasOwnProperty('children')) {
                    //console.log(tree)
                    tree['children'].push(treeData)
                }
                this.integratedTreeData(path, treeData, treeData['key'])
                
            }
            return treeData
        },

        integratedTree(path) {
            path.shift()
            let findObj = this.treeData['children'].find(item => item.title == path[0])
            let nowObj = this.treeData
            while(findObj) {
                path.shift()
                nowObj = findObj
                findObj = findObj['children'].find(item => item.title == path[0])
            }
            // console()
            if(path.length !== 0) {
                let insertObj = {}
                insertObj['title'] = path[0]
                path.shift()
                console.log(nowObj['children'].length - 1)
                let indexList = nowObj['children'][nowObj['children'].length - 1].key.split('-')
                let index = Number(indexList[indexList.length - 1]) + 1
                indexList[indexList.length - 1]  = index
                insertObj['key'] = indexList.join('-')
                if(path.length !== 0) {
                    insertObj['children'] = []
                }
                nowObj['children'].push(insertObj)
                if(path.length !== 0) {
                    insertObj['children'].push(this.integratedTreeData(path, insertObj, insertObj['key']))
                }
            }
        }
    },
  }
</script>

<style scoped>
.main {
    height: 90%;
    background-color: #F3F7F7;
    margin: 0 1rem;
    position: relative;
    
}

.main .main-menu {
  position: absolute;
  left: 0;
  top: 0;
  height: 50%;
  /* width: 8.5%; */
  width: 150px
  /* overflow: auto; */
}

.main .main-menu .file-open input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

.main .detailed-options .file-open input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.main .project-catalog {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50%;
  width: 10rem;
  overflow: auto; 
}

.main .sub-directory {
  position: absolute;
  right: 0;
  top: 0;
  height: 2rem;
  width: 91.5%;
  overflow: auto;   
}

.main .detailed-options {
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 150px);
  height: 3.9%;
  background-color: aquamarine;
}

.main .detailed-options >>> .ant-menu-horizontal {
  height: 100%!important;
  line-height: 100%;
}

.main .detailed-options >>> .ant-menu-horizontal > .ant-menu-item,
.main .detailed-options >>> .ant-menu-horizontal > .ant-menu-submenu {
  /* top: 50%; */
  transform: translate(0, 32%);  
}

.main .detailed-options >>> .ant-menu-item,
.main .detailed-options >>> .ant-menu-submenu-title {
  height: 100%   
}

.main .cad-windows {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 96.1%;
  /* height: 855.469px; */
  width: calc(100% - 150px);
  background-color: cadetblue;
  overflow: auto;  
}

.scroll-bar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  border-radius: 10px;
  /* background-color: yellow; */
}

.scroll-bar::-webkit-scrollbar {
  width: 0px;
  height: 10px;
  border-radius: 10px;
  background-color: #F5F5F5;
}

.scroll-bar::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  border-radius: 10px;
  background-color:  #5F9EA0;
}
</style>
