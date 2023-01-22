import { createStore } from "vuex";

export const store = createStore({
  state: {

    gameLevel : 1,

    activeSeesawBalance: 0, //kaydirak pozisyonu

    isPause: 0, //oyun durdu mu  0=pause 1=play

    fallDirection : null,

    isEnd: false, //oyun bitti mi
    
    dropPosition: 0,

    fallSpeed: {
      topPositionSpeed: 30,
      interval: 120
    },

    yourTotalWeight: [],

    pcTotalWeight: [],

    yourMomentum: [],

    pcMomentum: [],

    fallingWeight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // agirlik secimi

    objectType: ["triangle", "circle", "rectangle"], //dusen cismin sekli

    rightWeightPosition: [60, 70, 80, 90, 100],

    rightElements: [],

    leftElements: []

  },
  getters: {

    getGameLevel: (state) => {
      return state.gameLevel
    },

    getFallDirection : (state) => {
      return state.fallDirection
    },

    getGamePlayPause: (state) => {
      return state.isPause
    },

    getYourTotalWeight: (state) => {
      return state.yourTotalWeight
    },

    getYourMomentum: (state) => {
      return state.yourMomentum
    },

    getPcTotalWeight: (state) => {
      return state.pcTotalWeight
    },

    getPcMomentum: (state) => {
      return state.pcMomentum
    },

    getLeftElement: (state) => {
      return state.leftElements
    },

    getRightElement: (state) => {
      return state.rightElements
    },

    getSeesawBalance: (state) => {
      return state.activeSeesawBalance
    },

    getFallSpeed: (state) => {
      return state.fallSpeed
    },

    getDropPosition: (state) => {
      return state.dropPosition
    },

    getObjectType: (state) => {
      return state.objectType[Math.floor(Math.random() * state.objectType.length)];
    },

    getfallingWeight: (state) => {
      return state.fallingWeight[Math.floor(Math.random() * state.fallingWeight.length)];
    },

    getRightWeightPosition: (state) => {
      return state.rightWeightPosition[Math.floor(Math.random() * state.rightWeightPosition.length)];
    }

  },
  mutations: {
    
    dropPosition: (state, payload) => {
      //console.log(payload)
      state.dropPosition += payload
    },

    rightElementAdd: (state, payload) => {
      state.rightElements.push(payload);
      state.pcTotalWeight.push(payload.getfallingWeight)
      state.pcMomentum.push((payload.getRightWeightPosition * payload.getfallingWeight) / 100)
      state.activeSeesawBalance = ((payload.getRightWeightPosition * payload.getfallingWeight) / 100) * 2;
    },

    leftElementAdd: (state, payload) => {
      //console.log(payload)
      let pos = null;
      state.leftElements.push(payload);
      state.yourTotalWeight.push(payload.getfallingWeight)
      switch (payload.getLeftWeightPosition) {
        case 0:
          pos = 100;
          break;
        case 10:
          pos = 90;
          break;
        case 20:
          pos = 80;
          break;
        case 30:
          pos = 70;
          break;
        case 40:
          pos = 60;
          break;
        default:
          break;
      }
      state.yourMomentum.push((pos * payload.getfallingWeight) / 100)
    },

    playPause: (state, payload) => {
      state.isPause = payload
    },

    nextElement: (state, payload) => {
      state.dropPosition = 0;
      state.activeSeesawBalance = (state.pcMomentum.reduce((acc, current) => acc + current, 0) - state.yourMomentum.reduce((acc, current) => acc + current, 0)) * 2
    },

    activeSeesawBalance: (state, payload) => {
      state.activeSeesawBalance = payload
    },

    fallDirection : (state,payload) => {
      state.fallDirection = payload
    },

    gameLevel : (state,payload) => {
      state.gameLevel = payload
    }

  }

})