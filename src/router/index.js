import Vue from 'vue'
import VueRouter from 'vue-router'

//import drawingScaleSet from '../router/tables/index'

Vue.use(VueRouter)

const mainScreen = () => import(/* webpackChunkName: "login" */ 'views/mainScreen/mainScreen.vue');
const mainScr = () => import(/* webpackChunkName: "login" */ 'views/mainScreen/mainScr.vue');
const drawingScaleSet = () => import(/* webpackChunkName: "login" */ 'views/tables/drawingScaleSet.vue');
const extractCoordinate = () => import(/* webpackChunkName: "login" */ 'views/tables/extractCoordinate.vue');
const controlPoint = () => import(/* webpackChunkName: "login" */ 'views/tables/controlPoint.vue');
const exhibitionObject = () => import(/* webpackChunkName: "login" */ 'views/tables/exhibitionObject.vue');
const wireParam = () => import(/* webpackChunkName: "login" */ 'views/tables/wireParam.vue');
const groundWireParam = () => import(/* webpackChunkName: "login" */ 'views/tables/groundWireParam.vue');
const leashParam = () => import(/* webpackChunkName: "login" */ 'views/tables/leashParam.vue');
const tensionMachineParam = () => import(/* webpackChunkName: "login" */ 'views/tables/tensionMachineParam.vue');
const tractorParam = () => import(/* webpackChunkName: "login" */ 'views/tables/tractorParam.vue');

const chartingInformationTable = () => import(/* webpackChunkName: "login" */ 'views/tables/chartingInformationTable.vue')

const stretCalculation = () => import(/* webpackChunkName: "login" */ 'views/tables/stretCalculation.vue');
const crossCalculation = () => import(/* webpackChunkName: "login" */ 'views/crossCalculate/crossCalculation.vue');

const verticalArcAdjustCalculation = () => import(/* webpackChunkName: "login" */ 'views/arcAdjustCalculate/verticalArcAdjustCalculation.vue');

const routes = [
  // {
  //   path: '/',
  //   name: 'mainScreen',
  //   component: mainScreen,
  // },
  {
    path: '/',
    name: 'childRoot',
    redirect: 'mainScr',
  },
  {
    path: '/mainScr',
    name: 'mainScr',
    component: mainScr,
    children: [
      {
        path: '/mainScr/tables/drawingScaleSet',
        name: 'drawingScaleSet',
        component: drawingScaleSet,
      },
      {
        path: '/mainScr/tables/extractCoordinate',
        name: 'extractCoordinate',
        component: extractCoordinate,
      },
      {
        path: '/mainScr/tables/controlPoint',
        name: 'controlPoint',
        component: controlPoint,
      },
      {
        path: '/mainScr/tables/exhibitionObject',
        name: 'exhibitionObject',
        component: exhibitionObject,
      },
      {
        path: '/mainScr/tables/wireParam',
        name: 'wireParam',
        component: wireParam,
      },
      {
        path: '/mainScr/tables/groundWireParam',
        name: 'groundWireParam',
        component: groundWireParam,
      },
      {
        path: '/mainScr/tables/leashParam',
        name: 'leashParam',
        component: leashParam,
      },

      {
        path: '/mainScr/tables/tensionMachineParam',
        name: 'tensionMachineParam',
        component: tensionMachineParam,
      },
      {
        path: '/mainScr/tables/tractorParam',
        name: 'tractorParam',
        component: tractorParam,
      },

      {
        path: '/mainScr/tables/drawChartingInformationTable',
        name: 'drawChartingInformationTable',
        component: chartingInformationTable,
      },

      {
        path: '/mainScr/tables/stretCalculation',
        name: 'stretCalculation',
        component: stretCalculation,
      },

      

      {
        path: '/mainScr/crossCalculation',
        name: 'crossCalculation',
        component: crossCalculation,
      },

      {
        path: '/mainScr/verticalArcAdjustCalculation',
        name: 'verticalArcAdjustCalculation',
        component: verticalArcAdjustCalculation,
      },
    ]
  },

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

router.beforeEach((to, from, next) => {
  window.addEventListener('load', function() {
    //console.log('router',to,from,next)
    //to.name = mainScr
    next({
      path: '/mainScr',
    })
  })
  next()
})

export default router
