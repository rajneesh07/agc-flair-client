import { SOCKET_EVENTS } from "@/defines.js";
function initialState() {
  return {};
}
export default {
  state: initialState,

  getters: {},

  actions: {
    //Called after Call transfer socket request is successful
    processCallTransferDone({ commit }) {
      commit("RESET_CALL_MODULE");
      commit("RESET_CONSULTED_CALL_MODULE");
    },

    processCallConferenceDone({}) {},

    requestConsultCall({ getters }, callId) {
      return new Promise((resolve, reject) => {
        try {
          let request = {
            sessionId: getters["session/getSessionId"],
            primaryCallId: callId,
            dialedNumber: getters.getDialedDigits
          };

          console.log("requestConsultCall(): request=" + JSON.stringify(request));
          this._vm.$socket.emit(SOCKET_EVENTS.CONSULT_CALL, request, resp => {
            console.log("requestConsultCall(): resp=" + JSON.stringify(resp));
            if (resp.responseCode == "0") {
              resolve(resp);
            } else {
              resolve(resp);
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    },

    requestConferenceCall({ getters, dispatch }, payload) {
      let request = {
        sessionId: getters["session/getSessionId"],
        primaryCallId: payload.callIdA,
        consultedCallId: payload.callIdB
      };

      console.log("requestConferenceCall(): request=" + JSON.stringify(request));
      this._vm.$socket.emit(SOCKET_EVENTS.CONFERENCE_CALL, request, resp => {
        console.log("requestConferenceCall(): resp=" + JSON.stringify(resp));
        if (resp.responseCode === "0") {
          dispatch("processCallConferenceDone", resp);
        }
      });
    },

    requestTransferCall({ getters, dispatch }, payload) {
      let request = {
        sessionId: getters["session/getSessionId"],
        primaryCallId: payload.callIdA,
        consultedCallId: payload.callIdB
      };

      console.log("requestTransferCall(): request=" + JSON.stringify(request));
      this._vm.$socket.emit(SOCKET_EVENTS.TRANSFER_CALL, request, resp => {
        console.log("requestTransferCall(): resp=" + JSON.stringify(resp));
        if (resp.responseCode === "0") {
          dispatch("processCallTransferDone", resp);
        }
      });
    }
  },

  mutations: {
    RESET_CONSULTED_CALL_MODULE(state) {
      Object.assign(state, initialState());
    }
  }
};
