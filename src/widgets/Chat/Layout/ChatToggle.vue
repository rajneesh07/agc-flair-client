<template>
  <div class="d-flex flex-row" style="z-index:999">
    <!-- <transition name="fade" mode="out-in"> -->
    <scale-transition origin="bottom right">
      <div class="agc-chat-list" v-if="showChatList">
        <chat-list></chat-list>
      </div>
    </scale-transition>
    <div class="mdb-color agc-badge">{{activeChatSessionCount}}</div>
    <!--Hardcoded to always allow. Add the conditions to v-if and :class to only enable in certain conditions-->
    <mdb-btn
      v-if="true"
      class="btn-circle z-depth-5 btn-lg"
      :class="{ fl_disabledWidget: false }"
      :color="showChatList ? 'cyan' : 'mdb-color'"
      @click.native="showChatList = !showChatList"
    >
      <mdb-icon
        icon="comments"
        style="font-size:1em"
        class="white-text"
        :class="{ active: showChatList }"
      />
    </mdb-btn>
  </div>
</template>
<script>
import ChatList from "@/widgets/Chat/Layout/ChatList.vue";
import { ScaleTransition } from "vue2-transitions";
import {
  // mdbCard,
  // mdbCardHeader,
  // mdbCardBody,
  mdbBtn,
  mdbIcon
  // mdbTooltip,
  // mdbBadge
} from "mdbvue";

export default {
  name: "ChatToggle",
  components: {
    ChatList,
    ScaleTransition,
    // mdbCard,
    // mdbCardHeader,
    // mdbCardBody,
    mdbBtn,
    mdbIcon
    // mdbTooltip,
    // mdbBadge
  },
  data() {
    return {
      showChatList: false
    };
  },
  computed: {
    activeChatSessionCount() {
      return this.$store.getters.getChatSessionCount;
    }
  }
};
</script>
<style lang="css">
.roundedCard {
  border-radius: 10px;
}
.roundedCardHeader {
  border-radius: 10px 10px 0px 0px !important;
}
.agc-chat-list {
  border-width: 0px;
  position: absolute;
  bottom: 50px;
  right: 0px;
  z-index: 99;
}
.agc-badge {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;
  color: white;
  font-size: 1.2em;
  padding: 2px;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
