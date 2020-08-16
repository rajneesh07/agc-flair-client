import { SOCKET_EVENTS } from "@/defines.js";
function initialState() {
  return {
    dialedDigits: null
  };
}

export default {
  namespaced: false,
  state: initialState,
  getters: {
    getDialedDigits(state) {
      return state.dialedDigits;
    }
  },
  mutations: {
    RESET_DIALER_MODULE(state) {
      Object.assign(state, initialState());
    },

    UPDATE_DIALED_DIGITS(state, inpDigits) {
      state.dialedDigits = inpDigits;
    }
  },
  actions: {
    updateDialedDigits({ commit }, inpDigits) {
      commit("UPDATE_DIALED_DIGITS", inpDigits);
    },

    async requestOutboundCall({ getters, dispatch }) {
      return new Promise((resolve, reject) => {
        if (!getters.getDialedDigits) {
          dispatch("showErrorBanner", ["Outbound Call Not Made", "Please enter a valid number"]);
        } else {
          let request = {
            sessionId: getters["session/getSessionId"],

            dialedDigits: getters.getDialedDigits
          };

          console.log("requestOutboundCall(): request=" + JSON.stringify(request));
          try {
            this._vm.$socket.emit(SOCKET_EVENTS.MAKE_CALL, request, resp => {
              console.log("requestOutboundCall(): resp=" + JSON.stringify(resp));
              resolve(resp);
            });
          } catch (err) {
            reject(err);
          }
        }
      });
    }
  }
};
