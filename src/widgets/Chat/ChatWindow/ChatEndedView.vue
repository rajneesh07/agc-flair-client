<template>
  <mdb-container style>
    <div
      class="h5 pb-5 pt-5 mt-5"
    >Chat Requested from {{chatterName}} has been closed. Please dispose the chat to end this session</div>
  </mdb-container>
</template>
<script>
import {
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbListGroup,
  mdbListGroupItem
} from "mdbvue";
export default {
  name: "ChatEndedView",
  components: {
    mdbBtn,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbListGroup,
    mdbListGroupItem
  },
  props: {
    interactionHistory: {},
    chatterName: String,
    chatId: String
  },
  methods: {
    onAcceptChatButtonClicked() {
      this.$store.dispatch("acceptChatRequest", this.chatId);
    },
    onRejectChatButtonClicked() {
      this.$store.dispatch("rejectChatRequest", this.chatId);
    }
  }
};
</script>