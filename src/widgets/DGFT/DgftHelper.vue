<template>
  <widget title="DGFT Helper">
    <template v-slot:body>
      <mdb-container fluid>
        <h4 v-if="!inboundCallList || (inboundCallList && inboundCallList.length === 0)">Waiting for calls</h4>
        <select
          class="browser-default custom-select mb-5"
          v-model="dropdownSelectedCallId"
          v-if="inboundCallList && inboundCallList.length > 1"
        >
          <option selected disabled>Open this select menu</option>
          <option :value="callid" v-for="callid in inboundCallList" :key="callid.id">{{ callid }}</option>
        </select>
        <div class="mb-5 w-100" v-if="inboundCallList && inboundCallList.length === 1">
          <div class="text-center py-2">The following Call is being used to perform Screenpop</div>
          <h3 class="text-center">{{ inboundCallList[0] }}</h3>
        </div>

        <dl class="row mb-1 no-gutters fl_dl" v-for="(value, name) in dgftUui" :key="value.id">
          <dt class="col-sm-6 fl_dt">{{ name }}</dt>
          <dd class="col-sm-6 fl_dd">{{ value }}</dd>
        </dl>
        <div class="w-100">
          <mdb-btn
            v-if="inboundCallList && inboundCallList.length > 0"
            color="green"
            class="mx-auto btn-block"
            @click.native="onSurveyTransferBtnClicked"
          >
            Transfer to Survey
          </mdb-btn>
        </div>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbContainer, mdbBtn } from "mdbvue";
import { AGENT_STATES } from "@/defines.js";
import Widget from "@/components/agc/Widget";

export default {
  name: "DgftHelper",
  components: {
    Widget,
    mdbContainer,
    mdbBtn
  },
  mounted() {},
  props: {},

  data() {
    return {
      showWidget: false,
      currentInboundCallList: [],
      dropdownSelectedCallId: null
    };
  },

  computed: {
    inboundCallList() {
      return this.$store.getters.getInboundCallList;
    },
    latestCallId() {
      return this.inboundCallList[this.inboundCallList.length - 1];
    },

    selectedCallId() {
      if (this.inboundCallList.length > 1) {
        return this.dropdownSelectedCallId;
      } else {
        return this.latestCallId;
      }
    },
    selectedCall() {
      let call = this.$store.getters.getCallByCallId(this.selectedCallId);
      if (call) {
        return call;
      } else {
        return null;
      }
    },
    agentState() {
      return this.$store.getters["getAgentState"];
    },
    dgftUui() {
      let callIndex = this.inboundCallList.indexOf(this.selectedCallId);
      if (callIndex > -1) {
        return {
          UCID: this.selectedCall.ucid,
          uniqueID: "1234",
          lang: "en",
          RMN: "YES",
          IEC: "YES",
          ConplaintNo: "1234",
          LastShortCode: "A1001"
        };
      }
      return this.$store.getters.getDgftUuiByCallIndex(callIndex);
    },
    dgftUuiKeys() {
      return this.$store.getters["session/getConfig"].DGFT.UUI_KEYS;
    }
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    },
    onSurveyTransferBtnClicked() {
      this.$store.dispatch("requestDgftSurveyIvrTransfer", this.selectedCallId);
    }
  },
  watch: {
    inboundCallList(newInCallList) {
      //if the call list increases, fetch the screenpop url for the latest call
      if (newInCallList.length > this.currentInboundCallList.length) {
        this.currentInboundCallList.push(this.latestCallId);
        if (this.selectedCall.callingAddress.length > 5) {
          this.$store.dispatch("processNewDgftCall", this.latestCallId);
        } else {
          console.log("caller length < 5, so this call was not processed. callId=" + this.latestCallId);
        }
      }

      //if the call list decreases, it means a call was dropped, so reset the screenpop URL
      else if (newInCallList.length < this.currentInboundCallList.length) {
        console.log("DgftHelper/watch(inboundCallList): call was removed");
        
        let droppedCalls = this.currentInboundCallList.filter(function(el) {
          return newInCallList.indexOf(el) < 0;
        });
        console.log("DgftHelper/watch(inboundCallList): droppedCalls=" + droppedCalls);
        /*****************************************************************************************
         * Assumption: only one call will drop at a time. if multiple calls get dropped in a
         * single watch state, we will need to add the logic
         *****************************************************************************************/
        const droppedCallIndex = this.currentInboundCallList.indexOf(droppedCalls[0]);
        console.log("DgftHelper/watch(inboundCallList): droppedCallIndex=" + droppedCallIndex);
        if (droppedCalls.length === 1) {
          this.currentInboundCallList.splice(droppedCallIndex, 1);
          this.$store.dispatch("processDgftCallCleared", droppedCallIndex);
        } else {
          this.$store.dispatch("processDgftCallCleared", droppedCallIndex);
        }
      } else {
        console.log("Dgfthelper/watch(allCalls): call list remained the same. new length=" + newInCallList.length);
      }
    },
    agentState(newAgentState) {
      if (newAgentState === AGENT_STATES.READY) {
        if (this.selectedCallId && this.selectedCall)
          this.$store.dispatch("disposeQuessCall", { callId: this.selectedCallId, ucid: this.selectedCall.ucid });
      }
    }
  }
};
</script>
