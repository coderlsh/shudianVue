<template>
  <div> 
    <a-card title="图纸标题栏" :bordered="false" style="width: 80%;top: 10px;margin: 0 auto;">
      <div class="left-side">
        <div>
          作业图名称：<a-input style="width: 80%" v-model="name"></a-input>
        </div>
        <div class="left-side-mid">
          <div>
            批准：<a-input style="width: 71%" v-model="approve"></a-input>
          </div>
          <div>
            校核：<a-input style="width: 71%" v-model="check"></a-input>
          </div>
          <div>
            制图：<a-input style="width: 71%" v-model="mapping"></a-input>
          </div>
          <div>
            日期：<a-input style="width: 71%" v-model="date"></a-input>
          </div>
        </div>
        <div>
          图号：<a-input style="width: 85.5%" v-model="drawNum"></a-input>
        </div>
      </div>
      <div class="right-side">
        <div>
          <div class="right-side-title p-10">放线区段</div>
          <div class="p-10" style="display: flex;justify-content: center;align-items: center;">
            <a-input style="width: 35.5%;margin-right: 10px;" v-model="leftSide"></a-input>
            <a-icon type="arrow-right" /> 
            <a-input style="width: 35.5%;margin-left: 10px;" v-model="rightSide"></a-input>
          </div>
        </div>
        <div>
          <div class="p-10">纵向比例：1 / <a-input style="width: 35.5%" v-model="VerticalRatio"></a-input></div>
          <div class="p-10">横向比例：1 / <a-input style="width: 35.5%" v-model="HorizontalRatio"></a-input></div>
        </div>
      </div>
      <div class="bottom">
        <a-button class="m-br-10" @click="getPoint(701)" type="primary">选取插入位置</a-button>
        <a-button class="m-br-10" @click="getPoint(702)" type="primary">移动表格</a-button>
        <!-- <a-button class="m-br-10" @click="getPoint(703)" type="primary">放大表格</a-button> -->
        <a-button class="m-br-10" @click="getPoint(704)"  type="primary">重新绘制</a-button>
        <a-button class="m-br-10" @click="quitToMain" type="primary">退出</a-button>
      </div>
    </a-card> 
  </div>
</template>

<script>


  export default {
    data () {
      return {
          name: 'XX作业图',
          approve: 'lsh',
          check: 'lsh',
          mapping: 'lsh',
          date: '2020-10-8',
          drawNum: 'PE-ZLEXT-02',

          leftSide: '151',
          rightSide: '161',

          VerticalRatio: '500',
          HorizontalRatio: '5000',

          curX: '',
          curY: '',

          length1: '',
          scale: 1,
      }
    },
    computed: {
      
    },
    watch: {
        
    },
    mounted() {
      document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc 
      document.getElementById("MxDrawXCtrl").ImplementCustomEvent = this.CustomEvent;
      document.getElementById("MxDrawXCtrl").ImpDynWorldDrawFun = this.DoDynWorldDrawFun
      this.DoCommandEventFunc(700)
    },
    methods: {
      getPoint(index) {
        this.$store.commit('visibleAble', false)
        document.getElementById("MxDrawXCtrl").DoCommand(Number(index));
      },

      DoDynWorldDrawFun(dX,dY,pWorldDraw,pData) {
        var sGuid = pData.Guid;
        var mxOcx = document.all.item("MxDrawXCtrl");
        console.log(sGuid,'11',dY)
        //设置自定义事件的返回值
        //mxOcx.SetEventRet(0);

        var curPt = mxOcx.NewPoint();
        curPt.x = dX;
        curPt.y = dY;
        
        if (sGuid == "TestDynDrawLine") {
          
          this.DynWorldDrawLine(pData, pWorldDraw, curPt);
          mxOcx.SetEventRet(1);
        }
        if (sGuid == "TestDynScale") {
          this.DynScale(pData, pWorldDraw, curPt);
          mxOcx.SetEventRet(1);
        }
      },
      DynWorldDrawLine( pCustomEntity, pWorldDraw, curPt) {
        var mxOcx = document.all.item("MxDrawXCtrl");
        var filter = mxOcx.NewResbuf();
        // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
        filter.AddStringEx("chartInfoTab", 8);
        //定义选择集对象
        var ss = mxOcx.NewSelectionSet();
        // 选择图上的所有对象。
        ss.Select2(5, null, null, null,filter);
        var i = 0;
        var listId = new Array();
        // 遍历所有对象，得到对象id.
        
        //与用户交互在图面上提取一个点
        var vBasePt = pCustomEntity.GetPoint("BasePoint");
        console.log(curPt.x,curPt.y,vBasePt.x,vBasePt.y)
        var centerPt = mxOcx.NewPoint();
        if(this.curX == '' || this.curY == ''){
          centerPt.x = vBasePt.x
          centerPt.y = vBasePt.y
        }else{
          centerPt.x = this.curX
          centerPt.y = this.curY
        }
        for (; i < ss.Count;i++)
        {
            var e =  ss.Item(i);
            e.Move(centerPt, curPt);
            listId.push(e.ObjectID);
        }
        this.curX = curPt.x
        this.curY = curPt.y
        console.log('history:',this.curX,this.curY)
        // var length=vBasePt.DistanceTo(curPt);
        // var length1=length.toFixed(2);
    
        
        //计算this点减去pPoint，得到的向量
        // var vec = vBasePt.SumVector(curPt);
        //返回向量顺时针转到与X轴的角度.[0,2PI)
        // var dAng = vec.Angle();
        //变换视区长度
        // var dHeigth = mxOcx.ViewLongToDocCoord(15);
        //绘制一个单行文字
        //参数一为文字的位置的X坐标 ；参数二为文字的位置的Y坐标 ；参数三为文字内容字符串
        //参数四为文字高度；参数五为文字的旋转角度
        //参数六为文字的水平对齐方式,0=kTextLeft,1=kTextCenter,2=kTextRight
        //参数七文字的竖直对齐方式,1=kTextBottom,2=kTextVertMid,3=kTextTop
        // pWorldDraw.DrawText(centerPt.x, centerPt.y, "长度：" + length1, dHeigth, dAng * 180.0 / 3.14159265, 1, 1);
        //绘制一个直线
        //参数一直线的开始点x坐标，参数二直线的开始点y坐标，参数三直线的结束点x坐标，参数四直线的结束点y坐标
        //pWorldDraw.DrawLine (vBasePt.x, vBasePt.y, curPt.x, curPt.y);
      },
      // 控件调用函数
      DynScale(pCustomEntity, pWorldDraw, curPt) {
        var mxOcx = document.all.item("MxDrawXCtrl");
        var filter = mxOcx.NewResbuf();
        // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
        filter.AddStringEx("chartInfoTab", 8);
        //定义选择集对象
        var ss = mxOcx.NewSelectionSet();
        // 选择图上的所有对象。
        ss.Select2(5, null, null, null,filter);
        var i = 0;
        var listId = new Array();
        // 遍历所有对象，得到对象id.
        
        //与用户交互在图面上提取一个点
        var vBasePt = pCustomEntity.GetPoint("BasePoint");
       
        var scale = mxOcx.NewComObject("IMxDrawMatrix3d");
        // 设置缩放基点是0,0.
        var scaleBasePoint = mxOcx.NewPoint();
        scaleBasePoint.x = vBasePt.x;
        scaleBasePoint.y = vBasePt.y;
        var length=vBasePt.DistanceTo(curPt);
        var length1=length.toFixed(2);
        var scaleLength = 1
        if(this.length1 !== '') {
          scaleLength = ((length1)/100).toFixed(1)
          if(length1 > this.length1){
            if(length1 == 10){

            }
          }
          
          // if(length1 > this.length1) {
          //   scaleLength = scaleLength + this.scale
          // }
        }else {
          var scaleLength = 1
        }
        if(scaleLength <= 0){
          scaleLength = 1
        }
        console.log('length',scaleLength,length1,this.length1)
        // 设置缩放比例为 2.
        scale.Scaling(scaleLength, scaleBasePoint);
        for (; i < ss.Count;i++)
        {
            var e =  ss.Item(i);
            e.ScaleEntity(scaleBasePoint,scaleLength)
            //e.TransformBy(scale);
            listId.push(e.ObjectID);
        }
        this.length1 = length1
        this.scale = scaleLength
        pWorldDraw.DrawLine (vBasePt.x, vBasePt.y, curPt.x, curPt.y);
      },
      DoCommandEventFunc(iCmd){
        var mxOcx = document.all.item("MxDrawXCtrl");
        if (iCmd == 700) {
          mxOcx.focus();
          var database = mxOcx.GetDatabase();
          // 得到文本式表.
          var textStyleTable = database.GetTextStyleTable();
          var sTextStyleName = "MyTextStyleName";
          // 得到文本式
          var textStyle = textStyleTable.GetAt(sTextStyleName, true);
          if (textStyle == null)
          {
              // 如果没有就新建一个。
              mxOcx.AddTextStyle2(sTextStyleName, "仿宋_GB2312", 0.7);
          }
          else
          {
              // 如果被删除，就反删除。
              textStyle.SetProp("unErase", null);
              textStyle.SetFont("仿宋_GB2312", false, false, 0, 0);
          }

         
          
          database.CurrentlyTextStyle =  "MyTextStyleName";
        }
        if (iCmd == 701) {
          mxOcx.focus();
          // var layerTable = database.GetLayerTable();
          // var sLayerName = "chartInfoTab";
          // // 得到层。
          // var layer = layerTable.GetAt(sLayerName, true);
          // //console.log(layer)
          // if (layer == null)
          // {
          //     // 如果没有层，就新建一个层。
          //     mxOcx.AddLayer(sLayerName);
          // }
       
          // // 设置实体层名到指定层上。
          //  mxOcx.LayerName = sLayerName;
          mxOcx.AddLayer("chartInfoTab");
          mxOcx.LayerName = "chartInfoTab";
          var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点2:");
          if(point1 == null)
          {
            return;
          }
          mxOcx.PathMoveTo(point1.x, point1.y);
          mxOcx.PathLineTo(point1.x - 270, point1.y);
          mxOcx.PathLineTo(point1.x - 270,point1.y + 110);
          mxOcx.PathLineTo(point1.x, point1.y + 110);
          //把路径设置成闭合
          mxOcx.PathMakeClosed();
          mxOcx.LineType = "";
          mxOcx.DrawCADColor = 16711680;
          mxOcx.DrawPathToPolyline();
          
          // mxOcx.PathMoveTo(point1.x - 1, point1.y);
          // mxOcx.PathLineTo(point1.x - 269.1, point1.y);
          // mxOcx.PathLineTo(point1.x - 269.1, point1.y + 109.1);
          // mxOcx.PathLineTo(point1.x - 1, point1.y + 109.1);
          // mxOcx.DrawColor = 0;
          // mxOcx.DrawPathToHatch(1);
          
          mxOcx.DrawCADColor = 16711680;
          mxOcx.DrawLine(point1.x - 109, point1.y, point1.x - 109, point1.y + 110);
          mxOcx.DrawLine(point1.x, point1.y + 82.5, point1.x - 270, point1.y + 82.5);
          mxOcx.DrawLine(point1.x, point1.y + 55, point1.x - 270, point1.y + 55);
          mxOcx.DrawLine(point1.x - 109, point1.y + 27.5, point1.x - 270, point1.y + 27.5);
          mxOcx.DrawLine(point1.x - 81, point1.y , point1.x - 81, point1.y + 55);
          mxOcx.DrawLine(point1.x, point1.y + 27.5, point1.x - 81, point1.y + 27.5);
          mxOcx.DrawLine(point1.x - 241.8, point1.y, point1.x - 241.8, point1.y + 82.5);
          mxOcx.DrawLine(point1.x - 190.5, point1.y + 27.5, point1.x - 190.5, point1.y + 82.5);
          mxOcx.DrawLine(point1.x - 160.5, point1.y + 27.5, point1.x - 160.5, point1.y + 82.5);
          // mxOcx.AddTextStyle1("MyTextStyle", "仿宋_GB2312", 0.7);
          // mxOcx.TextStyle = "MyTextStyle";
          mxOcx.DrawText(point1.x - 265, point1.y + 86.5, this.name, 12.6, 0, 0, 1);
          mxOcx.DrawText(point1.x - 268, point1.y + 63, '批准', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 240.8, point1.y + 63, this.approve, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 268, point1.y + 35.5, '制图', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 240.8, point1.y + 35.5, this.mapping, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 189.5, point1.y + 63, '校核', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 159.5, point1.y + 63, this.check, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 189.5, point1.y + 35.5, '日期', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 159.5, point1.y + 35.5, this.date, 7, 0, 0, 1);
          mxOcx.DrawText(point1.x - 268, point1.y + 8, '图号', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 240.8, point1.y + 8, this.drawNum, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 100, point1.y + 90.5, '放线区段', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 104, point1.y + 63, this.leftSide + '-' + this.rightSide, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 101, point1.y + 35.5, '比', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 101, point1.y + 8, '例', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 78, point1.y + 35.5, '纵', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 65, point1.y + 35.5, '1/' + this.VerticalRatio, 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 78, point1.y + 8, '横', 8.5, 0, 0, 1);
          mxOcx.DrawText(point1.x - 65, point1.y + 8, '1/' + this.HorizontalRatio, 8.5, 0, 0, 1);
        }
        if (iCmd == 702) {
          // var ent = mxOcx.GetEntity("选择实体");
          // if (ent == null)
          //     return;
          // 移动实体
          // 移动基点
          var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
          if(point1 == null)
          {
              return;
          }
          var getSecondPt = mxOcx.NewComObject("IMxDrawUiPrPoint");
          getSecondPt.message = "第二点";
          getSecondPt.basePoint = point1;
          //不开启皮筋效果
          getSecondPt.setUseBasePt(false);
          //调用
          var spDrawData = getSecondPt.InitUserDraw("TestDynDrawLine");
          // 设置动态绘制参数.
          spDrawData.SetPoint("BasePoint", point1);
          // 开始取第二个点。
          if (getSecondPt.go() != 1) {
            return;
          }
            
          var ret = spDrawData.Draw();

          // var ptBase = mxOcx.NewPoint();
          // ptBase.x = 0;
          // ptBase.y = 0;
          // // 移动到点.
          // var ptMoveTo = mxOcx.NewPoint();
          // ptMoveTo.x = 200;
          // ptMoveTo.y = 200;
          
          // // 由id得到实体对象.
          // var mxOcx = document.all.item("MxDrawXCtrl");
          // var filter = mxOcx.NewResbuf();
          // // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
          // filter.AddStringEx("chartInfoTab", 8);
          // //定义选择集对象
          // var ss = mxOcx.NewSelectionSet();
          // // 选择图上的所有对象。
          // ss.Select2(5, null, null, null,filter);
          // var i = 0;
          // var listId = new Array();
          // // 遍历所有对象，得到对象id.
          // for (; i < ss.Count;i++)
          // {
          //     var e =  ss.Item(i);
          //     e.Move(ptBase, ptMoveTo);
          //     listId.push(e.ObjectID);
          // }
          // //return listId;
          // console.log(listId)
          //mxOcx.SendStringToExecute("Move", listId);
          //this.$store.commit('visibleAble', true)


          //实例化一个构造选择集进行过滤,该类封装了选择集及其处理函数。
          // var ss = mxOcx.NewSelectionSet();
          // //构造一个过滤链表
          // var spFilte = mxOcx.NewResbuf();
          // spFilte.AddStringEx("coordinatelayer", 8);
          // //在一个点构造选择集
          // var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
          // var vPt1 = mxOcx.NewPoint();
          // vPt1.x = point1.x - 5;
          // vPt1.y = point1.y - 10
          // //定义第二个点的位置
          // var vPt2 = mxOcx.NewPoint();
          // vPt2.x = point1.x + 5;
          // vPt2.y = point1.x + 10;
          // //选取跨范围的实体
          // ss.Select(1, vPt1, vPt2,spFilte);
          // //ss.SelectAtPoint (point1, spFilte);
          // for (var i = 0; i < ss.Count; i++)
          // {
          //     var ent = ss.Item(i);
          //     var id = ent.ObjectID
          //     // console.log(id, ent.ObjectName);
          //     if (ent.ObjectName == "McDbCircle") {
          //       ent.Erase()
          //       this.delPointAndList(id)
          //     }
          // }
          //this.$store.commit('visibleAble', true)
        }
        if (iCmd == 703) {
           var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
          if(point1 == null)
          {
              return;
          }
          var getSecondPt = mxOcx.NewComObject("IMxDrawUiPrPoint");
          getSecondPt.message = "第二点";
          getSecondPt.basePoint = point1;
          //不开启皮筋效果
          getSecondPt.setUseBasePt(false);
          //调用
          var spDrawData = getSecondPt.InitUserDraw("TestDynScale");
          // 设置动态绘制参数.
          spDrawData.SetPoint("BasePoint", point1);
          // 开始取第二个点。
          if (getSecondPt.go() != 1) {
            return;
          }
            
          var ret = spDrawData.Draw();
        }
        if (iCmd == 704) {
          var filter = mxOcx.NewResbuf();
          // 把层名加入过滤条件，8是DXF组码，0表示是的是一个层名。
          filter.AddStringEx("chartInfoTab", 8);
          //定义选择集对象
          var ss = mxOcx.NewSelectionSet();
          // 选择图上的所有对象。
          ss.Select2(5, null, null, null,filter);
          var i = 0;
          var listId = new Array();
          // 遍历所有对象，得到对象id.
          for (; i < ss.Count;i++)
          {
              var e =  ss.Item(i);
              mxOcx.Erase(e.ObjectID)
              listId.push(e.ObjectID);
          }
          this.DoCommandEventFunc(701)
        }
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

    },
  }
</script>

<style scoped>
    /* margin-right 10px */
    .mr-10{
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .m-br-10 {
      margin-bottom: 10px;
      margin-right: 10px;
    }

    .p-10 {
      padding: 10px;
    }

    .border-box {
        border: 1px solid #1890FF;
        border-radius: 3px;
    }
 
    .left-side {
      width: 60%;
      float: left;
    }

    .left-side > div{
      padding: 10px;
    }
    
    .left-side .left-side-mid {
      display: flex;
      flex-wrap: wrap;
    }

    .left-side .left-side-mid div {
      width: 50%;
      padding: 10px 0;
    }

    .right-side {
      width: 40%;
      height: 16rem;
      float: left; 
    }

    .right-side .right-side-title {
      text-align: center;
    }

    .bottom {
      float: left;
    }
</style>
