<template>
  <widget title="SMS Helper">
    <template v-slot:body>
      <mdb-container fluid :class="{'fl_disabledWidget': !isCallAvailable}">
        <div v-if="cli">
          <label>The SMS will be sent to:</label>
          <span v-if="cli.length>0">{{cli}}</span>
          <select class="browser-default custom-select mb-4" v-model="smsContentType">
            <option disabled selected value>SMS Content</option>
            <option value="0">Feedback Survey</option>
            <option value="1">Reset Password</option>
            <option value="2">Registration Link</option>
          </select>
          <mdb-btn block color="mdb-color" @click="onSendSmsClick">Send SMS</mdb-btn>
        </div>
        <div v-else>
          <h4 class="grey-text">Waiting for call</h4>
        </div>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbContainer , mdbBtn} from "mdbvue";
import { CALL_STATES } from "@/defines.js";
import Widget from "@/components/agc/Widget";

export default {
  name: "SmsHelper",
  components: {
    Widget,
    mdbContainer,
    mdbBtn
  },
  mounted() {},
  props: {},

  data() {
    return {
      smsContentType: "0",
      message: [
        "Dear Customer, your feedback is valuable to us. Please visit https://tinyurl.com/y44tb3sm",
        "Dear customer, to reset your password, please visit http://dummyurl.com/resetPassword",
        "Dear customer, you can begin your registration process by visiting http://dummyurl.com/register"
      ]
    };
  },

  computed: {
    showWidget() {
      return this.cli ? true : false;
    },
    cli() {
      let callId = this.$store.getters.getActiveCallCallId;
      let call = this.$store.getters.getCallByCallId(callId);
      let cli = call ? call.callingAddress : null;
      return cli;
    },
    isCallAvailable() {
      return (
        this.callStatus !== CALL_STATES.IDLE &&
        this.callStatus !== CALL_STATES.RINGING
      );
    }
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    },

    onSendSmsClick() {
      if (this.smsContentType.length > 0) {
        let request = {
          cli: this.cli,
          message: this.message[this.smsContentType]
        };
        this.$store.dispatch("requestSendSms", request);
      } else {
        this.$store.dispatch(
          "showErrorBanner"[
            ("Select SMS Type", "Please select an SMS type before sending")
          ]
        );
      }
    }
  }
};
</script>

