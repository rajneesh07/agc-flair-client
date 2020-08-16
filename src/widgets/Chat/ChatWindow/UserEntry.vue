C<template>
  <div class="m-1 d-flex align-items-center agc-user-entry-area">
    <!-- <v-textarea
      class="px-2"
      no-resize
      auto-grow
      outlined
      dense
      hide-details
      row-height="1"
      name="user-entry-text"
      v-model="typedMessage"
      @keydown.enter="handleEnter"
      @keydown.enter.prevent
    ></v-textarea>-->
    <!-- <mdb-input outline type="textarea" @input="input" class="w-100 agc-user-entry-input" /> -->

    <textarea
      class="w-100 agc-user-entry-input m-0 px-4 py-2 m-3"
      @keydown.enter="handleEnter"
      @keydown.enter.prevent
      
     v-model="typedMessage"
    ></textarea>

    <!-- <v-btn rounded class="white--text info-color">o</v-btn> -->
    <mdb-btn class="btn-circle agc-chat-btn-send" tile color="cyan" @click.native="sendMessage">
      <mdb-icon @click.native="sendMessage" icon="paper-plane"></mdb-icon>
    </mdb-btn>
  </div>
</template>

<script>
import { mdbIcon, mdbInput, mdbBtn } from "mdbvue";
export default {
  name: "UserEntry",
  components: {
    mdbIcon,
    mdbInput,
    mdbBtn
  },
  props: {
    chatId: String
  },
  data() {
    return {
      typedMessage: null
    };
  },
  computed:{
     isUserTyping() {
      return this.typedMessage && this.typedMessage.length > 0;
    },
  },
  methods: {
    input(e) {
      this.typedMessage = e;
    },
    handleEnter(e) {
      if (e.shiftKey) return console.log("New line", e);
      // else {
      // }
      this.sendMessage();
    },
    sendMessage() {
      if (this.typedMessage && this.typedMessage.length > 0) {
        const newMessage = {
          type: "text",
          chatId: this.chatId,
          isInteractive: false,
          content: {
            text: this.typedMessage
          },
          self: true
        };
        this.$store.dispatch("addLocalMessage", newMessage);
        this.typedMessage = "";
      }
    },
    
  },
  watch:{
    isUserTyping(isTyping) {
      if (isTyping) {
        this.$store.dispatch("emitAgentTypingStarted",this.chatId);
      } else {
        this.$store.dispatch("emitAgentTypingStopped",this.chatId);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agc-user-entry-area {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
}
.agc-user-entry-input {
  border-radius: 28px;
  background-color: #f3f3f3;
  border: 1px solid rgba(0, 0, 0, 0.1);
  resize: none;
}
.agc-user-entry-input:focus {
  outline: none;
}
.agc-chat-btn-send {
  width: 50px;
  height: 40px;
  font-size: 1em;
}

</style>
