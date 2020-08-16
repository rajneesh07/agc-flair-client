<template>
  <mdb-container fluid class="d-flex justify-content-between">
    <span>
      <strong>{{chatterName}}</strong>
      <span v-if="isUserTyping" class="agc-chat-typing-message ml-4">typing ....</span>
    </span>
    <span class="float-right">
      <a>
        <mdb-icon
          dark
          small
          right
          class="pt-2 mr-5"
          icon="history"
          :class="{'pink-text':showChatHistory, 'blue-grey-text':!showChatHistory}"
          @click.native="showChatHistory=!showChatHistory"
        ></mdb-icon>
      </a>

      <a>
        <mdb-icon dark small right @click.native="onCloseBtnClick" icon="window-minimize"></mdb-icon>
        <ZoomYTransition origin="top right">
          <div
            class="agc-chat-history-container white p-3 black-text z-depth-2 mx-auto"
            v-if="showHistory"
          >
            <p class="pb-3 h5">Interaction History</p>
            <mdb-list-group class="pb-3">
              <mdb-list-group-item
                v-for="(interaction, i) in interactionHistory"
                :key="i"
              >{{i+'. '+interaction}}</mdb-list-group-item>
            </mdb-list-group>
          </div>
        </ZoomYTransition>
      </a>
    </span>
  </mdb-container>
</template>

<script>
import { ZoomYTransition } from "vue2-transitions";
import {
  mdbIcon,
  mdbContainer,
  mdbBtn,
  mdbListGroup,
  mdbListGroupItem
} from "mdbvue";
export default {
  name: "ChatHeader",
  components: {
    mdbIcon,
    mdbContainer,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    ZoomYTransition
  },
  props: {
    minimized: Boolean,
    chatterName: String,
    interactionHistory: Array,
    showHistory: Boolean,
    chatId: String
  },
  data() {
    return {
      showChatHistory: false
    };
  },
  computed: {
    isUserTyping() {
      return this.$store.getters.getIsTyping(this.chatId);
    }
  },
  methods: {
    onHeaderClick() {
      if (this.minimized) {
        this.$emit("minimize");
      }
    },
    onCloseBtnClick() {
      this.$emit("close");
    },
    onMinimizeBtnClick() {
      this.$emit("minimize");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}

.agc-chat-history-container {
  border-width: 0px;
  width: 100%;
  position: absolute;
  top: 45px;
  right: 0px;
  z-index: 99;
  /* border-radius: 10px; */
  border: solid rgba(0, 0, 0, 0.03) 1px;
  max-height: 200px;
  overflow: auto;
}
</style>
