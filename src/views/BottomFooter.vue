<template>
  <mdb-navbar text="white" color="special" position="bottom" dark :toggler="false">
    <!-- <mdb-navbar-nav>
      <web-socket-indicator class="white-text mr-4 pr-4"></web-socket-indicator>
    </mdb-navbar-nav>-->

    <mdb-navbar-nav left>
      <web-socket-indicator class="white-text mr-4 pr-4"></web-socket-indicator>
      <span class="white-text">SessionID: {{ sessionId }}</span>
      <span class="white-text pl-5 ml-5 float-right">ver: 1.0.0</span>
    </mdb-navbar-nav>
    <!-- <chatbar-toggle></chatbar-toggle> -->
  </mdb-navbar>
</template>
<style></style>

<script>
import WebSocketIndicator from "@/components/agc/WebSocketIndicator";
import { mdbNavbar, mdbNavbarNav } from "mdbvue";

export default {
  name: "UtilityBar",
  components: {
    WebSocketIndicator,

    mdbNavbar,
    mdbNavbarNav
  },

  props: {},

  data() {
    return {};
  },
  methods: {},
  computed: {
    sessionId() {
      return this.$store.getters["session/getSessionId"];
    }
  }
};
</script>
