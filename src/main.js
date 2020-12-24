 import Vue from 'vue'
// const Vue = require('vue')
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Menu, Icon, Modal, Tree, Table, Card, Input, Select, Checkbox, message, Radio, Tabs, Popconfirm} from 'ant-design-vue'

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

import api from './network/utils/index'
import axios from 'axios'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.prototype.$axios = axios
Vue.prototype.$message = message;

Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Modal)
Vue.use(Tree)
Vue.use(Table)
Vue.use(Card)
Vue.use(Input)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Tabs)
Vue.use(Popconfirm)

message.config({
  top: `30px`,
  duration: 1,
  maxCount: 3,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


  
