C<template>
  <div fluid class="agc-chat-body d-flex flex-colum" ref="agcChatBody">
    <ul class="p-0 mb-4 w-100">
      <message
        v-for="message in staticMessageList"
        :key="message.id"
        :message="message"
        :chat-id="chatId"
      ></message>
    </ul>
    
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "ChatBody",
  components: {
    Message
  },
  props: {
    chatId: String
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    
    messageList() {
      return this.$store.getters.getMessageList(this.chatId);
    },
    staticMessageList() {
      const tempArr = [];
      if (this.messageList.length > 0) {
        for (let i = 0; i < this.messageList.length; i++) {
          if (!this.messageList[i].isInteractive) {
            tempArr.push(this.messageList[i]);
          }
        }
      }

      return tempArr;
    }
  },
  watch: {
    messageList() {
      const that = this;
      setTimeout(function() {
        const container = that.$refs.agcChatBody;
        let firstTime = true;
        if (firstTime) {
          container.scrollTop = container.scrollHeight - container.clientHeight;
          firstTime = false;
        } else if (
          container.scrollTop + container.clientHeight ===
          container.scrollHeight
        ) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agc-chat-body {
  flex: 1;
  overflow-y: auto;
  min-height: 300px;
  max-height: 300px;
}
.interactive-response {
  position: relative;
  top: 450px;
}
</style>
