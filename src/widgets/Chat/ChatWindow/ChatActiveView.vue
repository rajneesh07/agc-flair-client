<template>
  <div>
    <chat-body :chatId="chatId"></chat-body>
    <!-- <hr class="agc-separator" /> -->
    <div class="interactive-response" v-if="isLastMessageInteractive">
      <chip-response v-if="isLastMessageInteractive" :message="lastMessage"></chip-response>
    </div>
    
    <chat-settings-drawer @toggleHistory="showHistory=!showHistory" :chatId="chatId"></chat-settings-drawer>
    <user-entry :chatId="chatId"></user-entry>
  </div>
</template>
    

<script>
import ChatBody from "./ChatBody.vue";
import ChatSettingsDrawer from "./ChatSettingsDrawer";
import ChipResponse from "./../Responses/ChipResponse";
import UserEntry from "./UserEntry.vue";
export default {
  name: "ChatActiveView",
  components: {
    ChatBody,
    ChatSettingsDrawer,
    ChipResponse,
    UserEntry
  },
  props: {
    chatId: String
  },
  computed: {
    
    lastMessage() {
      if (this.messageList.length > 0) {
        return this.messageList[this.messageList.length - 1];
      } else {
        return null;
      }
    },
    isLastMessageInteractive() {
      if (this.messageList.length > 0) {
        return this.lastMessage.isInteractive;
      } else {
        return false;
      }
    },
    messageList() {
      return this.$store.getters.getMessageList(this.chatId);
    }
  }
};
</script>
<style scoped>
.agc-chat-typing-message {
  position: absolute;
  bottom: 20px;
}
</style>