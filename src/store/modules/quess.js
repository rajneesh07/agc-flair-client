function initialState() {
  //hard-coded UUI for testing
  return {
    quessCallToProcess: {
      callIndex: null,
      callId: null,
      call: null
    },
    quessUui: [],
    quessCrmUrl: [],
    quessSelectedCallId: null
  };
}

export default {
  state: initialState,

  actions: {
    setQuessSelectedCallId({ commit }, callId) {
      commit("SET_QUESS_SELECTED_CALL_ID", callId);
    },
    processNewQuessCall({ commit, dispatch, getters }, callId) {
      let call = getters.getCallByCallId(callId);
      if (getters.getCallIndexByCallId(call.callId) === 0) {
        const callIndex = getters.getCallIndexByCallId(call.callId);
        commit("SET_QUESS_CALL_TO_PROCESS", [callId, callIndex, call]);
      }
      dispatch("setQuessUuiForCall", call);
      dispatch("setQuessCrmUrlForCall", call);
    },
    processQuessCallCleared({ commit, dispatch }, callIndex) {
      commit("RESET_QUESS_CALL_TO_PROCESS");
      dispatch("resetQuessCrmUrlForCall", callIndex);
      dispatch("resetQuessUuiForCall", callIndex);
    },

    disposeQuessCall({ dispatch }, payload) {
      dispatch("removeCallFromActiveCalls", [payload.ucid, payload.callId]);
    },
    setQuessCrmUrlForCall({ commit, getters }, call) {
      const callIndex = getters.getCallIndexByCallId(call.callId);
      const path = "?";
      const uui = getters.getQuessUuiByCallIndex(callIndex);

      let screenpopBuilderRequest = {
        uui: uui,
        path: path,
        baseUrl: getters["session/getConfig"].QUESS.CRM.URL
      };

      commit("SET_QUESS_CRM_URL", screenpopBuilderRequest);
    },

    resetQuessCrmUrlForCall({ commit }, index) {
      commit("RESET_QUESS_CRM_URL", index);
    },

    setQuessUuiForCall({ commit, getters }, call) {
      const config = getters["session/getConfig"];
      const request = {
        callId: call.callId,
        keys: config.QUESS.UUI_KEYS,
        values: call.uui
      };
      commit("SET_QUESS_UUI", request);
    },

    resetQuessUuiForCall({ commit, getters }, callId) {
      commit("RESET_QUESS_UUI", getters.getCallIndexByCallId(callId));
    }
  },
  mutations: {
    RESET_QUESS_MODULE(state) {
      Object.assign(state, initialState());
    },
    SET_QUESS_SELECTED_CALL_ID(state, callId) {
      state.quessSelectedCallId = callId;
    },

    SET_QUESS_CALL_TO_PROCESS(state, [callId, callIndex, call]) {
      state.quessCallToProcess.callIndex = callIndex;
      state.quessCallToProcess.callId = callId;
      state.quessCallToProcess.call = call;
    },
    RESET_QUESS_CALL_TO_PROCESS(state) {
      state.quessCallToProcess.callIndex = null;
      state.quessCallToProcess.callId = null;
      state.quessCallToProcess.call = null;
    },

    SET_QUESS_CRM_URL(state, payload) {
      let params = "id=" + payload.uui.uniqueID;
      state.quessCrmUrl.push(payload.baseUrl + payload.path + params);
    },

    RESET_QUESS_CRM_URL(state, index) {
      if (state.quessCrmUrl[index] != null) {
        state.quessCrmUrl.splice(index, 1);
      } else {
        console.log("RESET_QUESS_CRM_URL(): skipping, since index " + index + " does not exist in quessCrmUrl List");
      }
    },

    SET_QUESS_UUI(state, payload) {
      //UUI Keys are retreived from config file
      //UUI values are retreived as pipe separated string from IVR

      const uuiKeys = payload.keys;
      if (payload.values !== "") {
        const uuiValues = payload.values.split("|");
        //const tempUui = [];
        //Loop through the array of UUI keys
        let tempJson = {};
        for (let i = 0; i < uuiKeys.length; i++) {
          //set the key of the JSON obj as the UUI key, and set it's value as the corresponsing UUI value
          tempJson[uuiKeys[i]] = uuiValues[i];
          //For the uui for the call, set the key as the callID, and push the UUI entry as a key value pair in the state
          //tempUui.push(tempJson);
        }
        state.quessUui.push(tempJson);
      } else {
        state.quessUui.push("");
      }
    },
    RESET_QUESS_UUI(state, index) {
      if (state.quessUui[index]) {
        state.quessUui.splice(index, 1);
      } else {
        console.log("RESET_QUESS_UUI(): skipping, since callId does not exist in UUI List");
      }
    }
  },
  getters: {
    getSelectedQuessUui(state) {
      const callIndex = state.quessCallToProcess.callIndex;
      return callIndex > -1 ? state.quessUui[callIndex] : null;
    },
    getSelectedCallId(state) {
      return state.quessSelectedCallId;
    },
    getQuessUuiByCallIndex: state => callIndex => {
      if (state.quessUui[callIndex] != null) {
        console.log("found QUESS UUI: state=" + JSON.stringify(state.quessUui));
        return state.quessUui[callIndex];
      } else {
        console.log(
          "getQuessUuiByCallIndex(): could not find QUESS UUI for call index=" +
            callIndex +
            ", state=" +
            JSON.stringify(state.quessUui)
        );
        return null;
      }
    },

    getSelectedQuessCrmUrl(state) {
      const callIndex = state.quessCallToProcess.callIndex;
      return callIndex > -1 ? state.quessCrmUrl[callIndex] : null;
    },

    getQuessCrmUrlByCallIndex: state => callIndex => {
      if (state.quessCrmUrl[callIndex]) {
        console.log("found QUESS CRM URL: state=" + JSON.stringify(state.quessCrmUrl));
        return state.quessCrmUrl[callIndex];
      } else {
        console.log("did not find QUESS CRM URL: state=" + JSON.stringify(state.quessCrmUrl));
        return null;
      }
    }
  }
};
