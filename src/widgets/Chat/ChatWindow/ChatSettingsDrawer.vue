<template>
  <div class="agc-chat-settings d-flex align-items-center flex-column w-100">
    <div class="w-100 d-flex align-items-center">
      <mdb-btn
        class="agc-chat-settings-toggler mx-auto"
        :class="{'closed':!showSettings}"
        outline="none"
        flat
        @click="showSettings = !showSettings"
      >
        <mdb-icon
          :icon="showSettings?'chevron-down':'cog'"
          class="agc-chat-settings-toggler-icon z-depth-5"
        ></mdb-icon>
      </mdb-btn>
    </div>

    <CollapseTransition>
      <mdb-container fluid v-show="showSettings" class="agc-chat-settings-button-bar py-3">
        <mdb-row>
          <mdb-col>
            <mdb-btn
              outline="info"
              block
              class="agc-chat-settings-btn"
              @click.native="emitToggleHistory"
            >
              <mdb-icon icon="cog" class="cyan-text mr-3"></mdb-icon>history
            </mdb-btn>
          </mdb-col>

          <mdb-col>
            <mdb-btn
              outline="danger"
              block
              class="agc-chat-settings-btn"
              @click.native="onEndChatButtonClicked"
            >
              <mdb-icon icon="trash" class="danger-text mr-3"></mdb-icon>end chat
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </CollapseTransition>
  </div>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn, mdbContainer, mdbIcon } from "mdbvue";
import { CollapseTransition } from "vue2-transitions";
export default {
  name: "ChatSettingsDrawer",
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    CollapseTransition
  },
  props: {
    chatId: String
  },
  data() {
    return {
      showSettings: false
    };
  },
  methods: {
    emitToggleHistory() {
      this.$emit("toggleHistory");
    },
    onEndChatButtonClicked() {
      this.$store.dispatch("emitEndChatRequest", this.chatId);
    }
  }
};
</script>


<style scoped>
.agc-chat-settings {
  position: absolute;
  bottom: 80px;
  right: 0px;
}
.agc-chat-settings-button-bar {
  /* width: 85%; */
  background-color: white;
  /* border-radius: 14px; */
}
.agc-chat-settings-toggler {
  border-radius: 14px 14px 0 0;
  opacity: 1;
  box-shadow: none;
}
.agc-chat-settings-toggler:hover,
.agc-chat-settings-toggler:focus,
.agc-chat-settings-toggler:active {
  box-shadow: none;
}

.agc-chat-settings-toggler.closed {
  opacity: 0.5;
}
.agc-chat-settings-btn {
  
  border-radius: 28px;
  font-weight: bold;
}

.agc-chat-settings-toggler-icon {
  font-size: 2em;
}
</style>