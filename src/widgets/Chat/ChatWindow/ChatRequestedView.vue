<template>
  <mdb-container style>
    <div class="h3 pb-5">
      Chat Requested from
      <br />
      {{chatterName}}
    </div>

    <h3 class="pb-3">Interaction History</h3>
    <div style="height:180px;overflow:auto">
      <mdb-list-group class="pb-3">
        <mdb-list-group-item
          style="text-align: left !important;"
          v-for="(interaction, i) in interactionHistory"
          :key="i"
        >{{i+'. '+ interaction}}</mdb-list-group-item>
      </mdb-list-group>
    </div>
    <mdb-row class="mx-3 my-4">
      <mdb-col col="6">
        <mdb-btn class="btn-block" color="success" @click.native="onAcceptChatButtonClicked">Accept</mdb-btn>
      </mdb-col>
      <mdb-col col="6">
        <mdb-btn class="btn-block" color="danger" @click.native="onRejectChatButtonClicked">Reject</mdb-btn>
      </mdb-col>
    </mdb-row>
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
  name: "ChatRequestedView",
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