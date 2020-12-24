<template>
  <div class="main">
    <div class="main-menu">
      <a-menu mode="vertical">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
                <a-icon type="setting" />文件</span>
            <a-menu-item key="setting:1">
                新建
            </a-menu-item>
            <a-menu-item key="setting:2">
                打开
            </a-menu-item>
            <a-menu-item key="setting:3">
                保存
            </a-menu-item>
            <a-menu-item key="setting:4">
                打印
            </a-menu-item>
            <a-menu-item key="setting:5">
                退出
            </a-menu-item>
        </a-sub-menu>
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
                <a-icon type="setting" />系统参数</span>
            <a-menu-item key="setting:1">
                绳索参数
            </a-menu-item>
            <a-sub-menu key="sub3" title="绳索参数">
                <a-menu-item key="7">
                    1号参数
                </a-menu-item>
                <a-menu-item key="8">
                    2号参数
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="setting:2">
                设备参数
            </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    
      <!-- <div class="main-option-bar">
        <div class="main-option-bar-item">文件</div>
        <div class="main-option-bar-item disable">系统参数</div>
        <div class="main-option-bar-item disable">坐标管理</div>
        <div class="main-option-bar-item disable">展放对象</div>
        <div class="main-option-bar-item">视图</div>
        <span class="main-option-bar-item disable">计算</span>
        <span class="main-option-bar-item disable">输出</span>
        <span class="main-option-bar-item">帮助</span>
      </div> -->
      <div class="main-left-side">

            <div>
                <uploader :key="uploader_key" :options="options" class="uploader-example"
                        @file-success="onFileSuccess">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <uploader-btn :directory="true" :single="true">选择文件夹</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
                </uploader>
            </div>

          <div class="file">
              打开工程<input ref="file" @change.stop="changesData" type="file" name="fixfolder" webkitdirectory multiple value>
          </div>
          <!-- <div @click="referenceUpload">ssssssss</div> -->
          <!-- 指定一个非空文件夹路径：<br/>
          <input type="file" name="fixfolder"	value>
          <input type="button" value ="查找"> -->
          <table >
          <tr>
          <td	id = "textarea">
          
          </td>
          </tr>
          </table>
          <input type="button" class="btn btn-primary" @click="UserOpenDwg()" value="绘制直线">
      </div>
      <div class="main-right-side">        
        <!-- <p align="center">
            <object id="MxDrawXCtrl" clsid="{74A777F8-7A8F-4e7c-AF47-7074828086E2}" type="application/mxdraw-activex" width="100%" height="764px" align="left" >
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
                <param name="ShowMenuBar" value="1">
                <param name="EnableUndo" value="1">
                <param name="ShowPropertyWindow" value="1">
                <param name="Event_ImplementCommandEvent" value="DoCommandEventFunc">
                <span style="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。请点击<a href="http://www.mxdraw.com/MxDrawX52.msi">安装控件</a></span>
            </object> 
        </p> -->
   <div v-show="visible" style="position:absolute;z-index=999999;top:0px;background:transparent!important;width:1548px;height:764px">
     <!-- <iframe scrolling="no" allowtransparency="true" style="width: 100%;height: 100%;background:transparent" frameborder="0"></iframe>  -->
</div>

    </div>
        <!-- <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal> -->
  </div>
</template>

<script>

  export default {
    name:"mainScreen",
    data () {
      return {
        fso: {},
        visible: true,
        uploader_key: new Date().getTime(),//这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
        options: {
        target: '/',//SpringBoot后台接收文件夹数据的接口
        testChunks: false//是否分片-不分片
        },
        sourceCodeList: []
      }
    },
    // render(createElement) {
    //   const self = this
    //   if (!this.active) {
    //     return
    //   }

    //   return createElement('div',
    //     {
    //       attrs: {
    //         id: self.unit
    //       }
    //     },
    //     [
    //       createElement('script', 'googletag.cmd.push(function() { googletag.display("' + self.unit + '"); });')
    //     ])
    // },

    mounted() {
        document.getElementById("MxDrawXCtrl").ImplementCommandEventFun = this.DoCommandEventFunc
    },

    methods: {
     handleOk(){
       this.visible = false
     }, 

myclick(){
                  
              //  下面的DoCommand(1)调用程序将跳到DoCommandEventFunc(iCmd)执行
              document.getElementById("MxDrawXCtrl").DoCommand(1);
              console.log(document)
          },
          UserOpenDwg() {
              document.getElementById("MxDrawXCtrl").DoCommand(2)

},
          DoCommandEventFunc(iCmd){
              if (iCmd == 1) 
              {
              var mxOcx = document.all.item("MxDrawXCtrl");
                  mxOcx.focus();
              var point1 = mxOcx.GetPoint(false,0,0,"\n 点取开始点:");
              if(point1 == null)
              {
                  return;
              }
              var point2 = mxOcx.GetPoint(true,point1.x,point1.y,"\n 点取结束点:");
              if(point1 == null)
              {
                  return;
              }
              // 直线的id
              var lineId = mxOcx.DrawLine(point1.x,point1.y,point2.x,point2.y);

              // 为新写的直线写一个字符串扩展数据
              var database = mxOcx.GetDatabase();
              // var ent = database.ObjectIdToObject(lineId);                  
              console.log(database.ObjectIdToObject(lineId))
              }
              if(iCmd == 2) {
                var mxOcx = document.all.item("MxDrawXCtrl");
                mxOcx.SendStringToExecute("OpenDwg");
              } 
          },


        changesData () {
            for(let k in this.$refs.file.files) {
                if(this.$refs.file.files[k].name!== undefined && this.$refs.file.files[k].name.match(/\.(?:csv|xls|xlsx)$/i)) {
                //   this.upload(k)
                  console.log(this.$refs.file.files[k].webkitRelativePath)
                }else {
                //   this.$refs.file.files[k] = undefined
                console.log('delet',document.all.fixfolder.value)
                }

            }
        console.log(this.$refs.file.files);
      },
      addData(data){
      return new Promise((resolve,reject)=>{
        this.$axios.post(`/api/readCsv`,
        data,
        {
          headers:{
            'Content-Type': 'multipart/form-data; boundary = ' + new Date().getTime()
            //这里要把content-type设置为multipard/form-data，同时还要设置boundary
          }
        }).then(result=>{
          resolve(result.data)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    upload(k) {
      console.log('click upload')
      //请求接口前需要传的参数
      let formData=new FormData();
      formData.append('file',this.$refs.file.files[k])
      //这里要把所有要传到后端的字段都添加到formData里面，我当时操作的时候就是把这一点遗漏掉了，折腾了好久。。
      //请求接口
      this.addData(formData).then(result=>{
        //这里进行获取到result之后的操作
        console.log('upload')
        console.log(result)
      });
    },
         onFileSuccess: function (rootFile, file, response, chunk) {
        //这里可以根据response（接口）返回的数据处理自己的实际问题（如：从response拿到后台返回的想要的数据进行组装并显示）
        //注，这里从文件夹每上传成功一个文件会调用一次这个方法
        this.$nextTick(() => { // console.log(this.$refs["uploaderList"].fileList); // console.log(this.uploader.files); 
        let folderList = this.$refs["uploaderList"].fileList; 
        folderList.forEach(item => { if (item.isFolder == true) { this.sourceCodeList.push(item); } }); 
        // 数组对象去重方法 
        this.sourceCodeList = [...new Set(this.sourceCodeList)]; })
        console.log(this.sourceCodeList)
  },
      referenceUpload(e) {
          //this.$refs.referenceUpload.value = null;
          this.fso	= new ActiveXObject("Scripting.FileSystemObject");
          console.log(this.fso)
          var localSite = document.all.fixfolder.value
          //var localSite = this.$refs.referenceUpload.value
          console.log(localSite)
          localSite = localSite.split('\\')
          var fileFormat = localSite[localSite.length - 1]
          console.log(fileFormat)
          localSite = localSite.slice(0, localSite.length - 1).join('\\')
          // console.log(localSite)
          if(!this.fso.FolderExists(localSite + '\\放线区段1')){
              var strFolderName = this.fso.CreateFolder(localSite + '\\放线区段1');
              this.fso.CreateFolder(localSite + '\\放线区段1\\input');
              this.fso.CreateFolder(localSite + '\\放线区段1\\output');
          }
          // document.write("创建文件夹: " + localSite + '\\放线区段1' + "<br>");
          var s = this.Search(this.fso, localSite)
          
          textarea.innerHTML = s
      },
      Search(fso, value) {
          var	f =	this.fso.GetFolder(value);
          // var	fc = new Enumerator(f.files);
          var	s =	"";
          // //var x = "";
          // for	(; !fc.atEnd();	fc.moveNext())
          // {
          //     s += fc.item();
          //     s += "<br/>";
          // }
          var fk = new Enumerator(f.SubFolders);
          for	(; !fk.atEnd();	fk.moveNext())
          {
              //x = Search(fso, fk.item());
              //s = s + x;
              s += (fk.item() + '').split('\\').pop();
              s += "<br/>";
              console.log(fk.item())
          }
          return s
      }
    },
    components: {

    }
  }
</script>

<style scoped>
.main {
    height: 86.5%;
    background-color: #F3F7F7;
    margin: 0 1rem;
    position: relative;
    
}

.main .main-menu {
  position: absolute;
  left: 0;
  top: 0;
  height: 50%;
  width: 10rem;
  background-color: aqua;
}

.main .main-option-bar {
    padding:0.5rem 1.5rem;
    color: #3B5191;
    border-bottom: 1px solid #E2E2E2;
    /* background-color: transparent; */
}

.main .main-option-bar .main-option-bar-item {
    padding-right: 1rem;
    cursor: pointer;
}

.main .main-option-bar .disable {
    color: #D9D9DA;
}

.main .main-left-side {
    position: absolute;
    height: 93.8%;
    right: 0;
    bottom: 0;
    width: 18%;
}

.main .main-right-side {
    height: 93.8%;
    width: 82%;
    position: absolute;
    z-index: 2;
} 

.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}


  .uploader-example {
    width: 90%;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
 
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
 
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

</style>
