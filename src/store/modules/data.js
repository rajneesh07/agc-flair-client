import api from "@/services/api.js";
function initialState() {
  //hard-coded UUI for testing
  return {
    uui: [
      {
        key: "Current Call Time",
        value: "",
      },
      {
        key: "CLI",
        value: "",
      },
      {
        key: "UCID",
        value: "",
      },
      {
        key: "Collected Digits",
        value: "-",
      },
      {
        key: "Split/Skill",
        value: "",
      },
    ],
    //hard-coded Caller Data for testing
    callerData: [
      {
        key: "Name",
        value: "",
      },
      {
        key: "RMN",
        value: "",
      },
      {
        key: "Account No.",
        value: "",
      },
      {
        key: "Account Type",
        value: "",
      },
    ],
  };
}

const state = initialState;
const mutations = {};
const actions = {
  requestSendSms({}, payload) {
    api.sendSmsRequestToGateway(payload);
  },
};
const getters = {
  getCallerData(state) {
    return state.callerData;
  },
  getUui(state) {
    return state.uui;
  },
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
