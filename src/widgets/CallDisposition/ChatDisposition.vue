<template>
  <widget title="Chat Disposition">
    <template v-slot:body>
      <mdb-container fluid>
        <div v-if="chatSessions.length<1">
          <h4 class="grey-text">There are no chats that need disposition</h4>
        </div>

        <div
          v-if="chatSessions.length===1"
          class="h4"
        >Dispose Chat for {{getChatterName(chatSessions[0]) }}</div>
        <div v-if="chatSessions.length>1">
          <select class="browser-default custom-select mb-3" v-model="selectedChatSession">
            <option selected :value="null" disabled>Select Chat Session</option>
            <option
              selected
              :value="chat"
              v-for="(chat, i) in chatSessions"
              :key="i"
            >{{getChatterName(chat)}}</option>
          </select>
        </div>

        <div v-if="chatSessions.length>0">
          <select
            class="browser-default custom-select mb-3"
            v-model="selectedCategory"
            @change="resetSubCategory"
          >
            <option selected :value="null" disabled>Select Disposition Reason</option>
            <option
              :value="item.value"
              v-for="(item, i) in dispositionCategories"
              :key="i"
              
            >{{item.label}}</option>
          </select>
          <!-- <label class>Outcome</label> -->

          <select class="browser-default custom-select mb-4" v-model="selectedSubCategory">
            <option selected :value="null" disabled>Select Disposition Sub-Category</option>
            <option
              :value="item.value"
              v-for="(item, i) in subCatForSelectedCat"
              :key="i"
            >{{item.label}}</option>
          </select>
          <mdb-btn block color="mdb-color" @click="onDisposeChatButtonClick">Dispose</mdb-btn>
        </div>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbContainer, mdbBtn } from "mdbvue";
import { CALL_STATES, CHAT_STATES } from "@/defines.js";

import Widget from "@/components/agc/Widget";
export default {
  name: "ChatDisposition",
  components: {
    Widget,
    mdbContainer,

    mdbBtn
  },
  mounted() {},
  props: {
    ucid: null,
    callId: null
  },

  data() {
    return {
      showWidget: false,

      chatIndex: null,
      selectedChatSession: null,
      selectedCategory: null,
      selectedSubCategory: null,
      dispositionCategories: [
        {
          label: "Promotional Offers",
          value: "promo_offers"
        },
        {
          label: "Service Request",
          value: "service_request"
        },
        {
          label: "Technical Support",
          value: "tech_support"
        }
      ],
      dispositionSubCategories: {
        promo_offers: [
          { label: "4G Pack Pack", value: "a" },
          { label: "Social Media Pack", value: "b" },
          { label: "Special offers", value: "c" }
        ],
        service_request: [
          { label: "Balance Request", value: "a" },
          { label: "BCash Query", value: "b" },
          { label: "Mobile Financing", value: "b" }
        ],
        tech_support: [
          { label: "APN Settings", value: "a" },
          { label: "My BL App", value: "b" },
          { label: "Other Tech Support", value: "c" }
        ]
      }
    };
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    },
    onAcwTimerExpired() {
      this.showTimer = false;
      this.disposeCall();
    },
    getChatterName(chat) {
      return chat.participant.firstName + " " + chat.participant.lastName;
    },
    resetSubCategory() {
      this.selectedSubCategory = null;
    },
    disposeCall() {
      this.$store.dispatch("removeCallFromActiveCalls", [
        this.ucid,
        this.callId
      ]);
    },
    onDisposeChatButtonClick() {
      if (this.chatSessionToBeDisposed.chatState === CHAT_STATES.CLOSED) {
        this.$store.dispatch(
          "destoryChatSession",
          this.chatSessionToBeDisposed
        );
      } else {
        this.$store.dispatch("showErrorBanner", [
          "Chat cannot be disposed",
          "Make sure your chat has ended before attempting to dispose"
        ]);
      }
    }
  },

  computed: {
    chatSessionToBeDisposed() {
      if (this.isMoreThanOneChatActive) {
        return this.selectedChatSession.chatId;
      } else {
        return this.chatSessions[0].chatId;
      }
    },
    chatSessions() {
      return this.$store.getters.getChatSessions;
    },
    isMoreThanOneChatActive() {
      return this.chatSessions.length > 1;
    },
    subCatForSelectedCat() {
      if (this.selectedCategory) {
        return this.dispositionSubCategories[this.selectedCategory];
      } else {
        return null;
      }
    },
    isAgentInAcw() {
      return this.callStatus === CALL_STATES.DROPPED;
    }
  },

  watch: {
    callStatus(newCallStatus, oldCallStatus) {
      switch (oldCallStatus) {
        case CALL_STATES.TALKING:
        case CALL_STATES.HELD:
          if (newCallStatus === CALL_STATES.DROPPED) {
            console.log("timer changed from talking to dropped");
            this.showWidget = true;
            this.showTimer = true;
            this.$store.dispatch("startTimer", "acwTimer");
          }
          break;
        default:
          //this.$store.dispatch('stopTimer', 'acwTimer')
          break;
      }
    }
  }
};
</script>
