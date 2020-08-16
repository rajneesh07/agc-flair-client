<template>
  <widget :title="'CRM: ' + crmUrl" fillHeight height="100%">
    <template v-slot:toolbar>
      <!-- <mdb-btn size="sm" class="btn-circle" @click.native="loadDefaultCrmUrl"
        ><mdb-icon icon="home"> </mdb-icon
      ></mdb-btn> -->
    </template>
    <template v-slot:body>
      <div class="wrapper ">
        <iframe :src="crmUrl" class="w-100 fl_crm_window"></iframe>
      </div>
    </template>
  </widget>
</template>

<script>
import { CALL_STATES } from "@/defines";
import Widget from "@/components/agc/Widget";
// import { mdbBtn, mdbIcon } from "mdbvue";
export default {
  name: "DgftCrmFrame",
  components: {
    Widget
    // mdbBtn,
    // mdbIcon
  },
  props: {},
  mounted() {
    this.crmUrl = this.defaultUrl;
  },
  data() {
    return {
      manualShowWidget: true,
      iframeError: false,
      crmUrl: ""
    };
  },
  methods: {
    toggleShowWidget() {
      if (this.autoShowWidget === false) {
        this.manualShowWidget = !this.manualShowWidget;
      }
    },
    loadDefaultCrmUrl() {
      this.crmUrl = this.defaultUrl;
    }
  },
  computed: {
    defaultUrl() {
      return this.$store.getters["session/getConfig"].DGFT.CRM.URL + "/";
    },
    autoShowWidget() {
      return (
        this.$store.activeCall.status === CALL_STATES.RINGING || this.$store.activeCall.status === CALL_STATES.TALKING
      );
    },
    activeCall() {
      let callId = this.$store.getters.getActiveCallCallId;

      return this.$store.getters.getCallByCallId(callId);
    },
    callingAddress() {
      return this.activeCall ? this.activeCall.callingAddress : null;
    },
    calledAddress() {
      return this.activeCall ? this.activeCall.calledAddress : null;
    },
    agentCredentials() {
      return this.$store.getters.getAgentCredentials;
    },
    showWidget() {
      return this.manualShowWidget || this.autoShowWidget;
    },
    sessionId() {
      return this.$store.getters["session/getSessionId"];
    },

    CRM_URL() {
      if (this.$store.getters.getSelectedDgftCrmUrl) {
        return this.$store.getters.getSelectedDgftCrmUrl;
      } else {
        return this.defaultUrl;
      }

      // }
    }
  },
  watch: {
    CRM_URL(newUrl) {
      this.crmUrl = newUrl;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl_crm_window {
  border: none;
}

.wrapper {
  position: relative;

  border: none;
  height: 100%;
}
.wrapper > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wrapper > iframe.error {
  width: 0%;
  height: 0%;
}
</style>
