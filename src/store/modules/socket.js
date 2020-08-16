import { SOCKET_EVENTS, SOCKET_STATES } from "@/defines.js";

function initialState() {
  return {
    status: SOCKET_STATES.CONNECTED,
  };
}
export default {
  state: initialState,
  mutations: {
    RESET_SOCKET_MODULE(state) {
      Object.assign(state, initialState());
    },

    /******************* SOCKETIO STATE MUTATIONS *********************/
    SET_SOCKET_STATE_CONNECTED(state) {
      state.status = SOCKET_STATES.CONNECTED;
    },
    SET_SOCKET_STATE_DISCONNECTED(state) {
      state.status = SOCKET_STATES.DISCONNECTED;
    },
  },
  actions: {
    setSocketStateConnected({ commit, dispatch }) {
      commit("SET_SOCKET_STATE_CONNECTED");
      dispatch("sendSessionRejoinEvent");
    },

    sendSessionRejoinEvent({ getters }) {
      let sessionId = getters["session/getSessionId"];
      if (sessionId) {
        let request = {
          sessionId: sessionId,
        };
        console.log("sendSessionRejoinEvent(): request=" + JSON.stringify(request));

        this._vm.$socket.emit(SOCKET_EVENTS.REJOIN_SESSION, request, (response) => {
          console.log("sendSessionRejoinEvent(): response=" + JSON.stringify(response));
        });
      }
    },
    setSocketStateDisconnected({ commit }) {
      commit("SET_SOCKET_STATE_DISCONNECTED");
    },

    processSocketConnected({ getters, dispatch }) {
      dispatch("setSocketStateConnected");
      dispatch("session/loadConfigurations");
      dispatch("startAgentStateMonitoring");
      dispatch("rejoinChatRooms");
      dispatch("session/fetchExistingSessionFromServer", { root: true })
        .then((resp) => {
          console.log(
            "processSocketConnected(): response received from fetchExistingSessionFromServer: resp=" +
              JSON.stringify(resp)
          );
          console.log(
            "responseCode " +
              (resp.responseCode === 0 ? "Not " : "is ") +
              "zero. sessionID not retreived. sessionId=" +
              getters["session/getSessionId"]
          );
          if (resp.responseCode === "0" && getters["session/getSessionId"].length) {
            console.log("processSocketConnected(): sending request for sendQueryAgentStateRequest");
            dispatch("sendQueryAgentStateRequest", { root: true });
            dispatch("sendQueryCallStateRequest", { root: true });
          } else {
            console.log("processSocketConnected(): skipping request for sendQueryAgentStateRequest");
          }
        })
        .catch(() => {
          //dispatch("processAgentLogout");
        });
    },

    /**********************************
     *  INCOMING SOCKET REQUESTS
     **********************************/
    SOCKET_DEVEVENT(payload) {
      console.log("SOCKET_DEVEVENT(): Received event: " + JSON.stringify(payload));
    },

    SOCKET_TEST_CONN_DROPPED(payload) {
      console.log("SOCKET_TEST_CONN_DROPPED(): Received event: " + JSON.stringify(payload));
    },
    SOCKET_TEST_TERM_CONN_DROPPED(payload) {
      console.log("SOCKET_TEST_TERM_CONN_DROPPED(): Received event: " + JSON.stringify(payload));
    },

    SOCKET_ICALLRING({ dispatch }, payload) {
      console.log("SOCKET_ICALLRING(): Received event: " + JSON.stringify(payload));

      dispatch("processNewInboundCall", payload);
    },

    SOCKET_ICALLTALK({ dispatch, getters }, payload) {
      console.log("SOCKET_ICALLTALK(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) !== null) {
        dispatch("setCallStateTalking", payload);
      } else {
        console.log("SOCKET_ICALLTALK(): not identified for call OR conf call");
      }
    },

    SOCKET_ICALLDISC({ dispatch, getters }, payload) {
      console.log("SOCKET_ICALLDISC(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) !== null) {
        dispatch("setCallStateDropped", payload);
      } else {
        console.log("SOCKET_ICALLDISC(): no calls found for UCID:" + payload.ucid);
      }
    },

    SOCKET_ICALLHLD({ dispatch, getters }, payload) {
      console.log("SOCKET_ICALLHLD(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) !== null) {
        dispatch("setCallStateHeld", payload);
      } else {
        console.log("SOCKET_ICALLHLD() call ID not found in list of calls");
      }
    },

    SOCKET_CALLCONF({ dispatch, getters }, payload) {
      console.log("SOCKET_CALLCONF(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) < 0) {
        dispatch("processNewConferenceCall", payload);
      }
      dispatch("setMultiCallStateConferenced", payload);
    },

    SOCKET_CONFCALLDISC({ dispatch }, payload) {
      console.log("SOCKET_CONFCALLDISC(): Received event: " + JSON.stringify(payload));
      dispatch("processConferenceConnectionDisconnect", payload);
    },

    SOCKET_OUTCALLRING({ dispatch, getters }, payload) {
      console.log("SOCKET_OUTCALLRING(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) < 0) {
        dispatch("addCallToActiveCalls", payload).then(() => {
          dispatch("processNewOutboundCall", payload);
          dispatch("setCallStateRinging", payload);
        });
      } else {
        dispatch("setCallStateRinging", payload);
      }
    },

    SOCKET_OUTCALLTALK({ dispatch, getters }, payload) {
      console.log("SOCKET_OUTCALLTALK(): Received event: " + JSON.stringify(payload));
      if (getters.getCallIndexByCallId(payload.callId) < 0) {
        dispatch("addCallToActiveCalls", payload).then(() => {
          dispatch("processNewOutboundCall", payload);
          dispatch("setCallStateTalking", payload);
        });
      } else {
        dispatch("setCallStateTalking", payload);
      }
    },

    SOCKET_OUTCALLDISC({ dispatch }, payload) {
      console.log("SOCKET_OUTCALLDISC(): Received event: " + JSON.stringify(payload));
      dispatch("setCallStateDropped", payload);
    },

    SOCKET_OUTCALLHLD({ dispatch }, payload) {
      console.log("SOCKET_OUTCALLHLD(): Received event: " + JSON.stringify(payload));
      dispatch("setCallStateHeld", payload);
    },
    SOCKET_AGTUPDATED({ dispatch }, payload) {
      console.log("SOCKET_AGTUPDATED(): Received event: " + JSON.stringify(payload));
      dispatch("setAgentState", payload.state);
      dispatch("setUpdatedAuxCode", payload);
    },

    SOCKET_AVAYACONNDISC({}, payload) {
      console.log("SOCKET_AVAYACONNDISC(): Received event: " + JSON.stringify(payload));
    },
    SOCKET_AVAYACONNRECONN({}, payload) {
      console.log("SOCKET_AVAYACONNRECONN(): Received event: " + JSON.stringify(payload));
    },

    /***************************************************************
     *
     *  Chat related Socket messages
     ***************************************************************/

    SOCKET_NEW_CHAT_MESSAGE({ dispatch }, chatMessage) {
      console.log("new chat message received. chatMessage=" + JSON.stringify(chatMessage));
      dispatch("addNewRemoteChatMessage", chatMessage);
    },

    SOCKET_NEW_CHAT_REQUEST({ dispatch }, chat) {
      console.log("new chat received!!!");
      dispatch("addChatSession", chat);
    },
    SOCKET_USER_TYPING_STARTED({ dispatch }, chat) {
      console.log("user typing started");
      dispatch("setChatIsTyping", chat);
    },
    SOCKET_USER_TYPING_STOPPED({ dispatch }, chat) {
      console.log("user typing stopped");
      dispatch("resetChatIsTyping", chat);
    },
  },
  getters: {
    getSocketStatus(state) {
      return state.status;
    },
  },
};
