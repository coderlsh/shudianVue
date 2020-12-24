const  drawingScaleSet = () => import(/* webpackChunkName: "login" */ 'views/tables/drawingScaleSet.vue');

const routes = [
    {
      path: '/mainScr/tables/drawingScaleSet',
      name: 'drawingScaleSet',
      component: drawingScaleSet,
    },
  ]
  
  export default routes