<template>
  <div class="home">
    <a-button type="primary" @click="upload()">11111111</a-button>
    <a-button type="primary" @click="saveFile()">2222
      <!-- <a href="#" download="文件名.txt">点击下载</a> -->
    </a-button>
    <input type="file" ref="file" webkitdirectory multiple/>
    <table >
    <tr>
    <td	id = "textarea">
    
    </td>
    </tr>
    </table>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    
    var	fso	= new ActiveXObject("Scripting.FileSystemObject")
    var localSite = 'C:/Users/33085/Desktop/shudiancompute/输电线路张力架设仿真系统安装20120425包含说明书相关表格等/输电线路张力架设仿真系统安装2012/演示工程/张力放线工程.smpro'
    localSite = localSite.split('\/')
    localSite = localSite.slice(0, localSite.length - 1 ).join('\/')
    console.log(localSite)
    //var s = this.Search(fso, localSite)
    var	f =	fso.GetFolder(localSite);
    // var	fc = new Enumerator(f.files);
    var	s =	"";
    var x = fso.GetBaseName(localSite);
	// for	(; !fc.atEnd();	fc.moveNext())
	// {
	// 	s += fc.item();
	// 	s += "<br/>";
	// }
    var fk = new Enumerator(f.SubFolders);
	for	(; !fk.atEnd();	fk.moveNext())
	{
        //x = Search(fso, fk.item());
        //s = s + x;
        x = (fk.item() + '').split('\\').pop()
        console.log(x)
        
		    s += fk.item();
        s += "<br/>";
    }
    textarea.innerHTML = s
//console.log(x)

  //   localSite = localSite.split('\\')
  //   localSite = localSite.slice(0, localSite.length - 1).join('\\')
  //   // console.log(localSite)
  //   var s = this.Search(fso, localSite)
    
	// console.log(s)
  },
  created() {

    this.$api.test.hello().then(res => {
      console.log('22222',res)
    })

    this.$api.test.test(
      {
        "filePath":"E:\\电网\\151-165放线区段\\Input",
        "fileName":"导线参数.csv"
      }
    ).then(res => {
      console.log('1')
      console.log(res.data)
    })
  },
  methods: {

   Search(fso, value) {
    var	f =	fso.GetFolder(value);
    var	fc = new Enumerator(f.files);
    var	s =	"";
    var x = "";
	for	(; !fc.atEnd();	fc.moveNext())
	{
		s += fc.item();
		s += "<br/>";
	}
    var fk = new Enumerator(f.SubFolders);
	for	(; !fk.atEnd();	fk.moveNext())
	{
        //x = Search(fso, fk.item());
        //s = s + x;
		s += fk.item();
        s += "<br/>";
        console.log(fk.item())
    }
    return s
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
    upload() {
      console.log('click upload')
      //请求接口前需要传的参数
      let formData=new FormData();
      formData.append('file',this.$refs.file.files[0])
      //这里要把所有要传到后端的字段都添加到formData里面，我当时操作的时候就是把这一点遗漏掉了，折腾了好久。。
      //请求接口
      this.addData(formData).then(result=>{
        //这里进行获取到result之后的操作
        console.log('upload')
        console.log(result)
      });
    },
    saveFile() {
      document.execCommand('Saveas');
    }
  },
}
</script>
