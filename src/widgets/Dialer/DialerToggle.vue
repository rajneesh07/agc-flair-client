<template>
  <div>
    <mdb-tooltip trigger="hover" :options="{ placement: 'left' }" :disabled="isAgentInOutboundAuxState">
      <span slot="tip">Switch to "Outbound Call" to enable dialer</span>

      <span slot="reference">
        <mdb-btn
          v-if="isOutCallingEnabled"
          class="btn-circle btn-lg"
          :class="{ fl_disabledWidget: !isAgentInOutboundAuxState }"
          :color="showOutboundDialerDropdown ? 'cyan' : 'mdb-color'"
          @click.native="showOutboundDialerDropdown = !showOutboundDialerDropdown"
        >
          <mdb-icon
            icon="phone"
            style="font-size:1em"
            class="white-text fl_rotating_icon"
            :class="{ active: showOutboundDialerDropdown }"
          />
        </mdb-btn>
      </span>
    </mdb-tooltip>

    <!-- <transition name="fade" mode="out-in"> -->
    <scale-transition origin="top right">
      <div class=" fl_dropdown" v-if="showOutboundDialerDropdown">
        <mdb-card class="roundedCard">
          <mdb-card-header color="cyan darken-1" class="pt-4 roundedCardHeader">
            <h4><strong> Make Outbound Call </strong></h4>
          </mdb-card-header>
          <mdb-card-body>
            <outbound-dialer></outbound-dialer>
          </mdb-card-body>
        </mdb-card>
      </div>
    </scale-transition>
    <!-- </transition> -->
  </div>
</template>
<script>
import OutboundDialer from "@/widgets/Dialer/OutboundDialer.vue";
import { ScaleTransition } from "vue2-transitions";
import { mdbCard, mdbCardHeader, mdbCardBody, mdbBtn, mdbIcon, mdbTooltip } from "mdbvue";
import { AGENT_STATES } from "@/defines";
export default {
  name: "DialerToggle",
  components: {
    OutboundDialer,
    ScaleTransition,
    mdbCard,
    mdbCardHeader,
    mdbCardBody,
    mdbBtn,
    mdbIcon,
    mdbTooltip
  },
  data() {
    return {
      showOutboundDialerDropdown: false
    };
  },
  computed: {
    isOutCallingEnabled() {
      return this.$store.getters["session/getConfig"].ALLOW_OUTBOUND_DIALING;
    },
    isAgentInOutboundAuxState() {
      const outCallReasonCode = this.$store.getters["session/getConfig"].OUTCALLING_REASON_CODE;
      return (
        this.$store.getters["getAgentState"] === AGENT_STATES.NOT_READY &&
        this.$store.getters["getAgentAuxState"].reasonCode === outCallReasonCode
      );
    }
  }
};
</script>
<style lang="css">
.roundedCard {
  border-radius: 10px;
}
.roundedCardHeader {
  border-radius: 10px 10px 0px 0px !important;
}
</style>
