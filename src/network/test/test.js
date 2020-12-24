import service from '../utils/http'
import paths from '../utils/paths'

// 登录类数据接口

 const test= {
    //  登录接口
    test(params) {
        return service.post(paths.test,params);
    },

    hello() {
        return service.get(paths.hello)
    }
 } 


export default test