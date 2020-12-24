import service from '../utils/http'
import paths from '../utils/paths'

// 登录类数据接口

 const readFile= {
    //  登录接口
    readFile(params) {
        return service.post(paths.readFile, params);
    },
 } 


export default readFile