<template>
  <mdb-card class="agc-chat-window d-flex flex-column z-depth-3 rounded" :style="chatWidthStyle">
    <div class="agc-chat-header cyan py-3">
      <chat-header
        @close="toggleChatWindow"
        @minimize="toggleChatMinimized"
        :minimized="minimized"
        :chatter-name="chatterName"
        :interaction-history="interactionHistory"
        :show-history="showHistory"
        :chat-id="chatId"
      ></chat-header>
    </div>
    <zoom-y-transition>
      <div v-if="isChatActive" class="d-flex flex-column h-100 flex-grow-1 m-3">
        <chat-active-view :chatId="chatId"></chat-active-view>
      </div>

      <div v-if="isChatRequested" class="d-flex flex-column mt-3 text-center">
        <chat-requested-view
          :interaction-history="interactionHistory"
          :chatter-name="chatterName"
          :chatId="chatId"
        ></chat-requested-view>
      </div>
      <div v-if="isChatClosed" class="d-flex flex-column mt-3 text-center">
        <chat-ended-view
          :interaction-history="interactionHistory"
          :chatter-name="chatterName"
          :chatId="chatId"
        ></chat-ended-view>
      </div>
    </zoom-y-transition>
  </mdb-card>
</template>

<script>
import { ZoomYTransition } from "vue2-transitions";
import ChatHeader from "./ChatHeader.vue";
import ChatRequestedView from "./ChatRequestedView";
import ChatActiveView from "./ChatActiveView";
import ChatEndedView from "./ChatEndedView";
import { CHAT_STATES } from "@/defines";
import {
  mdbCard,
  mdbCardHeader,
  mdbCardBody,
  mdbBtn,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbContainer,
  mdbRow,
  mdbCol
} from "mdbvue";

export default {
  name: "ChatWindow",
  props: {
    width: Number,
    height: Number,
    chatId: String
  },
  data() {
    return {
      minimized: false,
      showHistory: false
    };
  },
  components: {
    ChatHeader,

    ChatRequestedView,
    ChatActiveView,
    ChatEndedView,

    ZoomYTransition,
    mdbCard,
    mdbCardHeader,
    mdbCardBody,
    mdbBtn,
    mdbIcon,
    mdbListGroup,
    mdbListGroupItem,
    mdbContainer,
    mdbRow,
    mdbCol
  },
  methods: {
    toggleChatWindow() {
      console.log("toggling window for chatId=" + this.chatId);
      this.$store.dispatch("toggleChatWindow", this.chatId);
    },
    toggleChatMinimized() {
      this.minimized = !this.minimized;
    }
  },
  computed: {
    chatWidthStyle() {
      return "width: " + this.width + "px";
    },
    chatSession() {
      return this.$store.getters.getChatSessionById(this.chatId);
    },
    interactionHistory() {
      return this.chatSession.interactionHistory;
    },
    isChatActive() {
      console.log("thischatstate=", this.chatSession.state);

      return this.chatSession.state == CHAT_STATES.ACTIVE;
    },
    isChatRequested() {
      return this.chatSession.state == CHAT_STATES.REQUESTED;
    },
    isChatClosed() {
      return this.chatSession.state == CHAT_STATES.CLOSED;
    },
    chatterName() {
      if (this.chatSession.participant.firstName) {
        return (
          this.chatSession.participant.firstName +
          " " +
          this.chatSession.participant.lastName
        );
      } else {
        return this.chatSession.participant.phoneNumber;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agc-chat-window {
  margin: auto;
  min-height: 400px;
  margin-right: 30px;
  margin-bottom: 30px;
  font-size: 1.3em;
  transition: height 5s;
}
.agc-chat-window.minimized {
  height: unset;
}

.agc-chat-window.rounded {
  border-radius: 10px !important;
}

.agc-chat-window.rounded .agc-chat-header {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

.agc-chat-header {
  /* background-color: rgb(98, 60, 234); */
  color: white;
}
.agc-separator {
  border: 1px solid #f0f0f0;
}
</style>
