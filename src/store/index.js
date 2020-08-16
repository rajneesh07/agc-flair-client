import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import agent from "./modules/agent";
import call from "./modules/call";
import consultedCall from "./modules/consultedCall";
import dialer from "./modules/dialer";
import session from "./modules/session";
import socket from "./modules/socket";
import timer from "./modules/timer";
import quess from "./modules/quess";
import chat from "./modules/chat";

import { SOCKET_STATES } from "@/defines.js";

const vuexPersist = new VuexPersist({
  key: "flair",
  storage: sessionStorage,
  modules: ["agent", "call", "consultedCall", "dialer", "socket", "timer", "session", "dgft", "chat"]
});

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false, //important: this is set to false to comply with Vuex-persist
  modules: {
    agent,
    call,
    chat,
    session,
    socket,
    timer,
    consultedCall,
    dialer,
    quess
  },
  plugins: [vuexPersist.plugin],

  state: {
    sockets: {
      connect() { },
      connection_error() {
        this.state.socket.status = SOCKET_STATES.DISCONNECTED;
      }
    }
  },
  actions: {
    showErrorBanner(context, [title, message]) {
      Vue.notify({
        group: "error",
        title: title,
        text: message,
        duration: 3000
      });
    },

    resetAllModules({ commit }) {
      commit("RESET_AGENT_MODULE");
      commit("RESET_CALL_MODULE");
      commit("RESET_CHAT_MODULE");
      commit("RESET_CONSULTED_CALL_MODULE");
      commit("RESET_DIALER_MODULE");
      commit("session/RESET_SESSION_MODULE");
      commit("RESET_TIMER_MODULE");

      //PROJECT SPECIFIC MODULES GO HERE

      commit("RESET_QUESS_MODULE");
    }
  }
});
