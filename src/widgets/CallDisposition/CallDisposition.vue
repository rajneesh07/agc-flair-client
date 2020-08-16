<template>
  <widget title="Call Disposition">
    <template v-slot:body>
      <mdb-container fluid>
        <div v-if="isAgentInAcw">
          <!-- <div class="h5 grey-text" v-if="showTimer">
            Time Left:
            <down-timer name="acwTimer" @timer-expired="onAcwTimerExpired"></down-timer>
            <hr />
          </div>-->

          <!-- <label>Call Reason</label> -->
          <select class="browser-default custom-select mb-3" v-model="disposition">
            <option selected value="null">Select Disposition Reason</option>
            <option value="1">Account Inquiry</option>
            <option value="2">Product Information</option>
            <option value="3">Technical Support</option>
          </select>
          <!-- <label class>Outcome</label> -->

          <select class="browser-default custom-select mb-4" v-model="sub_disposition">
            <option selected value="null">Select Outcome</option>
            <option value="1">Successful</option>
            <option value="2">Transfered to IVR</option>
            <option value="3">Disconnected</option>
          </select>
          <mdb-btn block color="mdb-color" @click="onDisposeChatButtonClick">Dispose</mdb-btn>
        </div>
        <div v-else>
          <h4 class="grey-text">Available when call ends</h4>
        </div>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbContainer, mdbBtn } from "mdbvue";
import { CALL_STATES } from "@/defines.js";

import Widget from "@/components/agc/Widget";
export default {
  name: "CallDisposition",
  components: {
    Widget,
    mdbContainer,

    mdbBtn
  },
  mounted() {},
  props: {
    ucid: null,
    callId: null,
    chatId: String
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
      // let dispositionRequest = {
      //   callId: this.callId,
      //   ucid: this.ucid,
      //   cli : this.call.callingAddress,
      //   dnis : this.call.calledAddress,

      //   call_start_date_time: this.call.callStartTime,
      //   call_end_date_time: this.call.callEndTime,
      //   disposition : this.disposition,
      //   sub_disposition : this.sub_disposition

      // }
      //this.$store.dispatch('requestCallDisposition')
      this.$store.dispatch("removeCallFromActiveCalls", [
        this.ucid,
        this.callId
      ]);
    }
  },

  computed: {
    call() {
      if (this.callId) {
        return this.$store.getters.getCallByCallId(this.callId);
      } else {
        return null;
      }
    },
    activeChatSessions() {
      return null;
    },
    callStatus() {
      if (this.call) {
        return this.call.status;
      } else {
        return null;
      }
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
