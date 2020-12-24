import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        visible: false,
        point1: {},
        point2: {},

        kx: 5000,
        ky: 500,

        fileName: '',

        extraCoord: [],
        controlPoint: [],

        wireParam: [],
        groundwireParam: [],
        leashParam: [],

        tensionParam: [],
        tractorParam: [],

        exhibitObjectEdiTable: [],
        recommendedTractionRope: [],

        wire: {},
        leash: [],

        changed: true,

        tableData1: [],
        tableData2: [],

        otherTracMsg1: {},
        otherTracMsg2: {},

        repaint: false,

        showStep: false,

        caluDisable: true,

        unfinshed1: true,
        unfinshed2: true,
        unfinshed3: true,
    },
    mutations: {
        visibleAble(state, visible){
            state.visible = visible
        },
        changePoint1(state, point) {
            state.point1 = point
            console.log(state.point1)
        },
        changePoint2(state, point) {
            state.point2 = point
            console.log(state.point2)
        },

        getRotio(state, data) {
            state.kx = data.kx
            state.ky = data.ky
        },

        getFileName(state, name) {
            state.fileName = name
        },

        updatedFile(state, file) {
            switch (true) {
                
                case file.name.match(new RegExp('坐标管理')) !== null:
                    let exCord = coordinateManagement(file.data)
                    state.extraCoord =  exCord
                    //localStorage.setItem('extraCoord', JSON.stringify(state.extraCoord))
                    // console.log('zuobiao管理',state.extraCoord)
                  break;
                
                case file.name.match(new RegExp('控制点管理')) !== null:
                    
                    let controlPoint = contrPointManagement(file.data)
                    state.controlPoint = controlPoint
                    //console.log('zuobiao管理',file.name.match(new RegExp('坐标管理'))
                    //localStorage.setItem('controlPoint', JSON.stringify(state.controlPoint))
                  break;


                case file.name.match(new RegExp('导线参数')) !== null:
                    let key = state.wireParam.length == 0 ? 0 : state.wireParam[state.wireParam.length - 1].key
                    let wireParam = getWireParam(file.data, key)
                    state.wireParam.length == 0 ? (state.wireParam = wireParam) : (state.wireParam.push(...wireParam))
                    console.log(state.wireParam)
                  break;
                case file.name.match(new RegExp('地线参数')) !== null:
                    key = state.groundwireParam.length == 0 ? 0 : state.groundwireParam[state.groundwireParam.length - 1].key
                    let groundwireParam = getWireParam(file.data, key)
                    state.groundwireParam.length == 0 ? (state.groundwireParam = groundwireParam) : (state.groundwireParam.push(...groundwireParam))
                  break;
                case file.name.match(new RegExp('牵引绳参数')) !== null:
                    key = state.leashParam.length == 0 ? 0 : state.leashParam[state.leashParam.length - 1].key
                    let leashParam = getWireParam(file.data, key)
                    state.leashParam.length == 0 ? (state.leashParam = leashParam) : (state.leashParam.push(...leashParam))
                  break;
                case file.name.match(new RegExp('张力机参数')) !== null:
                    let tensionParam = machineParam(file.data, true)
                    state.tensionParam = tensionParam
                  break;
                case file.name.match(new RegExp('牵引机参数')) !== null:
                    let tractorParam = machineParam(file.data, false)
                    state.tractorParam = tractorParam
                  break;

                
                case file.name.match(new RegExp('展放对象编辑表')) !== null:
                    key = state.exhibitObjectEdiTable.length == 0 ? 0 : state.exhibitObjectEdiTable[state.exhibitObjectEdiTable.length - 1].key
                    console.log('key',key)
                    let exhibitObjectEdiTable = getexhitObjParam(file.data, key)
                    state.exhibitObjectEdiTable = exhibitObjectEdiTable
                  break;
                case file.name.match(new RegExp('用户推荐牵引绳规格')) !== null:
                    key = state.recommendedTractionRope.length == 0 ? 0 : state.recommendedTractionRope[state.recommendedTractionRope.length - 1].key
                    let recommendedTractionRope = getRecommendWireParam(file.data, key)
                    state.recommendedTractionRope = recommendedTractionRope
                  break;
                default:
                  console.log("Didn't match");
                  break;
            }
            //console.log('store',file.data,file.name)
        },

        renewData(state, data) {
            switch(data.name) {
                case 'wire':
                    state.wireParam = data.data
                    break; 
                case 'groundWire':
                    state.groundwireParam = data.data
                    break;  
                case 'leash':
                    state.leashParam = data.data
                    break; 
                case 'tensionMachine':
                    state.tensionParam = data.data
                    break;
                case 'tractor':
                    state.tractorParam = data.data
                    break;

                // 坐标管理
                case 'extractCoordinate':
                    state.extraCoord = data.data
                    if(data.hasOwnProperty("unfinshed")) {
                        state.unfinshed1 = data.unfinshed
                    }
                    localStorage.setItem('extraCoord', JSON.stringify(state.extraCoord))
                    break;
                case 'contrPoint':
                    state.controlPoint = data.data
                    if(data.hasOwnProperty("unfinshed")) {
                        state.unfinshed2 = data.unfinshed
                    }
                    localStorage.setItem('controlPoint', JSON.stringify(state.controlPoint))
                    break; 
                
                // 展放对象，推荐牵引绳
                case 'exhibitObject':
                    state.exhibitObjectEdiTable = data.data
                    break;
                case 'recommendedTract':
                    state.recommendedTractionRope = data.data
                    break;
            }
        },

        getTracRopeAndLeash(state, data) {
            let [wire] = data.wire
            state.wire = wire
            let [leash1,leash2] = data.leash
            let temLeash = leash1 
            if(leash2.massPerMeter < leash1.massPerMeter) {
                leash1 = leash2
                leash2 = temLeash
            }
            let list = []
            list.push(leash1) 
            list.push(leash2)
            state.leash = list
            state.changed = data.changed
            state.unfinshed3 = data.unfinshed
            //console.log('store',state.wire,state.leash)
        },

        changItem(state, data) {
            state.changed = data
        },

        getTableData1(state, data) {
            state.tableData1 = data
        },

        getTableData2(state, data) {
            state.tableData2 = data
        },

        getotherTracMsg1(state, data) {
            state.otherTracMsg1 = data
        },

        getotherTracMsg2(state, data) {
            state.otherTracMsg2 = data
        },

        getRepaint(state, data) {
            state.repaint = data
        },

        showWizardStep(state, data) {
            state.showStep = data
        },

        clearAll(state, data) {
            if(data) {
                state.point1= {}
                state.point2= {}

                state.kx= 5000
                state.ky= 500

                state.fileName= ''

                state.extraCoord= []
                state.controlPoint= []

                state.wireParam= []
                state.groundwireParam= []
                state.leashParam= []

                state.tensionParam= []
                state.tractorParam= []

                state.exhibitObjectEdiTable= []
                state.recommendedTractionRope= []

                state.wire= {}
                state.leash= []

                state.changed= true

                state.tableData1= []
                state.tableData2= []

                state.otherTracMsg1= {}
                state.otherTracMsg2= {}

                state.repaint= false

                state.showStep= false

                state.caluDisable= true
            }
        }
    }
})

// 坐标管理
function coordinateManagement(data) {
    let extraCoord = []
    if(data[data.length - 1] !== ''){
        data[data.length] = ''
    }
    // console.log(data[data.length - 1], data)
    for(let i = 1,k=0; i<data.length-1; i++,k++) {
        let reg = /^\"+|\"+$/g
        data[i] = data[i].replace(reg,"")
        let [name, coordinateProperty, coordinatePosition,
            xCoordinate, yCoordinate, rotationNum, wirePulleyMoveDist, 
            groundWirePulleyMoveDist, towerProperty,
            wireArrive, groundWireArrive] = data[i].split(',')
        if(groundWireArrive.lastIndexOf("\"") == 0){
            groundWireArrive = groundWireArrive.replace(reg,'')
        }else{
            groundWireArrive = groundWireArrive.substring(groundWireArrive.indexOf("\"")+1,groundWireArrive.lastIndexOf("\""))
        }
        let insertData = {
            key: k,
            name: name.replace(reg,""),
            coordinateProperty: coordinateProperty.replace(reg,""),
            coordinatePosition: coordinatePosition.replace(reg,""),
            xCoordinate: xCoordinate,
            yCoordinate: yCoordinate,
            rotationNum: rotationNum.replace(reg,""),
            wirePulleyMoveDist: wirePulleyMoveDist.replace(reg,""),
            groundWirePulleyMoveDist: groundWirePulleyMoveDist.replace(reg,""),
            towerProperty: towerProperty.replace(reg,""),
            wireArrive: wireArrive.replace(reg,""),
            groundWireArrive: groundWireArrive,
            pointId:''
        }
        
        extraCoord.push(insertData)
    }
    return extraCoord
}

// 控制点管理
function contrPointManagement(data) {
    let list = []
    if(data[data.length - 1] !== ''){
        data[data.length] = ''
    }
    console.log(data)
    for(let i = 1,k=0; i<data.length-1; i++,k++) {
        let reg = /^\"+|\"+$/g
        data[i] = data[i].replace(reg,"")
        let [name, controlPointProperty, xCoordinate,
            yCoordinate, controlDist] = data[i].split(',')
        if(controlDist.lastIndexOf("\"") == 0){
            controlDist = controlDist.replace(reg,'')
        }else{
            controlDist = controlDist.substring(controlDist.indexOf("\"")+1,controlDist.lastIndexOf("\""))
        }
        let insertData = {
            key: k,
            name: name.replace(reg,""),
            controlPointProperty: controlPointProperty.replace(reg,""),
            xCoordinate: xCoordinate,
            yCoordinate: yCoordinate,
            controlDist: controlDist,
            pointId:''
        }
        list.push(insertData)
    }
    return list
}

// 导线，地线，牵引绳参数
function getWireParam(data, k=0) {
    let list = []
    if(data[data.length - 1] !== ''){
        data[data.length] = ''
    }
    console.log('data',data)
    for(let i = 1; i<data.length-1; i++) {
        k ++
        let reg = /^\"+|\"+$/g;
        data[i] = data[i].replace(reg,"")
        console.log('data',data[i],k)
        let [name, structure, specification,
            outerDiameter, length, singleRopeWeight, massPerMeter, 
            breakingForce, crossArea,
            frictionCoefficient, safeLowerLimit, safeUpperLimit] = data[i].split(',')
        //let reg2 = /|\"+$/g;
        if(safeUpperLimit !== undefined){
            if(safeUpperLimit.lastIndexOf("\"") == 0){
                safeUpperLimit = safeUpperLimit.replace(reg,'')
            }else{
                safeUpperLimit = safeUpperLimit.substring(safeUpperLimit.indexOf("\"")+1,safeUpperLimit.lastIndexOf("\""))
            }
        }
        //console.log()
        //safeUpperLimit = safeUpperLimit.replace(reg2,'')
        //console.log('safe',safeUpperLimit)
        let insertData = {
            key: k,
            name: name.replace(reg,""),
            structure: structure.replace(reg,""),
            specification: specification.replace(reg,""),
            outerDiameter: outerDiameter.replace(reg,""),
            length: length.replace(reg,""),
            singleRopeWeight: singleRopeWeight.replace(reg,""),
            massPerMeter: massPerMeter.replace(reg,""),
            breakingForce: breakingForce.replace(reg,""),
            crossArea: crossArea.replace(reg,""),
            frictionCoefficient: frictionCoefficient.replace(reg,""),
            safeLowerLimit: safeLowerLimit.replace(reg,""),
            safeUpperLimit: safeUpperLimit,
        }
        console.log(insertData.safeUpperLimit)
        list.push(insertData)
    }
    return list
}

// 用户推荐牵引绳规格
function getRecommendWireParam(data, k=0) {
    let list = []
    if(data[data.length - 1] !== ''){
        data[data.length] = ''
    }
    console.log('data',data)
    for(let i = 1; i<data.length-1; i++) {
        k ++
        let reg = /^\"+|\"+$/g;
        data[i] = data[i].replace(reg,"")
        console.log('data',data[i],k)
        let [name, structure,
            outerDiameter, length, singleRopeWeight, massPerMeter, 
            breakingForce, crossArea,
            frictionCoefficient, safeLowerLimit, safeUpperLimit] = data[i].split(',')
        //let reg2 = /|\"+$/g;
        if(safeUpperLimit !== undefined){
            if(safeUpperLimit.lastIndexOf("\"") == 0){
                safeUpperLimit = safeUpperLimit.replace(reg,'')
            }else{
                safeUpperLimit = safeUpperLimit.substring(safeUpperLimit.indexOf("\"")+1,safeUpperLimit.lastIndexOf("\""))
            }
        }
        //console.log()
        //safeUpperLimit = safeUpperLimit.replace(reg2,'')
        //console.log('safe',safeUpperLimit)
        let insertData = {
            key: k,
            name: name.replace(reg,""),
            structure: structure.replace(reg,""),
            outerDiameter: outerDiameter.replace(reg,""),
            length: length.replace(reg,""),
            singleRopeWeight: singleRopeWeight.replace(reg,""),
            massPerMeter: massPerMeter.replace(reg,""),
            breakingForce: breakingForce.replace(reg,""),
            crossArea: crossArea.replace(reg,""),
            frictionCoefficient: frictionCoefficient.replace(reg,""),
            safeLowerLimit: safeLowerLimit.replace(reg,""),
            safeUpperLimit: safeUpperLimit,
        }
        console.log(insertData.safeUpperLimit)
        list.push(insertData)
    }
    return list
}

// 张力机，牵引机参数
function machineParam(data, flag) {
    let list = []
    let insertData = {}
    for(let i = 1,k=0; i<data.length-1; i++,k++) {
        let [name, ratedPower, WheelDiameter,
            applicableMaxDiameter, rounds, mainAnchorHorizontalAngle, subAnchorHorizontalAngle, 
            angleBetweenLineAndAnchor, anchorPositionFlag, equipmentWeight] = data[i].split(',')
        if(flag) {
            insertData = {
                key: k,
                name: name,
                ratedTension: ratedPower,
                tensionWheelDiameter: WheelDiameter,
                applicableMaxDiameter: applicableMaxDiameter,
                rounds: rounds,
                mainAnchorHorizontalAngle: mainAnchorHorizontalAngle,
                subAnchorHorizontalAngle: subAnchorHorizontalAngle,
                angleBetweenLineAndAnchor: angleBetweenLineAndAnchor,
                anchorPositionFlag: anchorPositionFlag,
                equipmentWeight: equipmentWeight,
            }
        }else {
            insertData = {
                key: k,
                name: name,
                ratedTraction: ratedPower,
                tractionWheelDiameter: WheelDiameter,
                applicableMaxDiameter: applicableMaxDiameter,
                rounds: rounds,
                mainAnchorHorizontalAngle: mainAnchorHorizontalAngle,
                subAnchorHorizontalAngle: subAnchorHorizontalAngle,
                angleBetweenLineAndAnchor: angleBetweenLineAndAnchor,
                anchorPositionFlag: anchorPositionFlag,
                equipmentWeight: equipmentWeight,
            }
        }
            
        list.push(insertData)
    }
    return list
}

// 展放对象
function getexhitObjParam(data, k=0) {
    let list = []
    if(data[data.length - 1] !== ''){
        data[data.length] = ''
    }
    
    for(let i = 1; i<data.length-1; i++) {
        k ++
        let reg = /^\"+|\"+$/g;
        data[i] = data[i].replace(reg,"")
        // console.log('绽放',data[i])
        let [name, structure,
            outerDiameter, length, singleRopeWeight, massPerMeter, 
            breakingForce, crossArea,
            frictionCoefficient, safeLowerLimit, safeUpperLimit,ropeNature] = data[i].split(',')
        if(ropeNature !== undefined){
            if(ropeNature.lastIndexOf("\"") == 0){
                ropeNature = ropeNature.replace(reg,'')
            }else{
                ropeNature = ropeNature.substring(ropeNature.indexOf("\"")+1,ropeNature.lastIndexOf("\""))
            }
        }
        let insertData = {
            key: k,
            name: name.replace(reg,""),
            structure: structure.replace(reg,""),
            outerDiameter: outerDiameter.replace(reg,""),
            length: length.replace(reg,""),
            singleRopeWeight: singleRopeWeight.replace(reg,""),
            massPerMeter: massPerMeter.replace(reg,""),
            breakingForce: breakingForce.replace(reg,""),
            crossArea: crossArea.replace(reg,""),
            frictionCoefficient: frictionCoefficient.replace(reg,""),
            safeLowerLimit: safeLowerLimit.replace(reg,""),
            safeUpperLimit: safeUpperLimit.replace(reg,""),
            ropeNature: ropeNature
        }
        //console.log('inserdata',insertData)
        list.push(insertData)
    }
    return list
}

// function getLocalParam() {

// }