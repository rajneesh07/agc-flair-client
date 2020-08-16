<template>
  <widget title="Call Disposition">
    <template v-slot:body>
      <mdb-container fluid>
        <div v-if="isAgentInAcw">
          <mdb-row>
            <mdb-col col="8">
              <span>
                Please dispose the call on the CRM to clear this call and go on "Ready"<br />In case of issues, use the
                DISPOSE button here
              </span>
            </mdb-col>
            <mdb-col col="4">
              <mdb-btn class="float-right" color="mdb-color" @click="disposeCall">Dispose</mdb-btn>
            </mdb-col>
          </mdb-row>
        </div>
        <div v-else>
          <h4 class="grey-text">Available when call ends</h4>
        </div>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbContainer, mdbBtn, mdbRow, mdbCol } from "mdbvue";
import { CALL_STATES, CALL_TYPES } from "@/defines.js";

import Widget from "@/components/agc/Widget";
export default {
  name: "DgftDisposition",
  components: {
    Widget,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn
  },
  beforeMount() {
    /**************************************************************************************
     *  if the calling number is an internal number, or if the number is not an inbound call,
     *  dispose the call before displaying the dispose card
     **************************************************************************************/
    if (
      this.call.callingAddress.length < this.$store.getters["session/getConfig"].INTERNAL_NUMBERS_MAX_LENGTH ||
      !this.isCallTypeInbound(this.call)
    ) {
      console.log("auto disposing call since it is either an internal call, or is not an inbound call:" + this.callId);
      this.$store.dispatch("disposeQuessCall", { ucid: this.ucid, callId: this.callId });
    }
  },
  mounted() {},
  props: {
    ucid: null,
    callId: null
  },

  data() {
    return {
      showWidget: false,
      showTimer: false,
      disposition: null,
      sub_disposition: null
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
    disposeCall() {
      this.$store.dispatch("disposeQuessCall", { ucid: this.ucid, callId: this.callId });
    },
    isCallTypeInbound(call) {
      return call.type === CALL_TYPES.INBOUND;
    }
  },

  computed: {
    call() {
      return this.$store.getters.getCallByCallId(this.callId);
    },
    callStatus() {
      return this.call.status;
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
