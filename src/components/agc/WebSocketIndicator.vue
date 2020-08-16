<template>
  <a class="dropdown-toggle-a primary-text" slot="toggle">

    <mdb-icon icon="circle" :class="socketStateIndicatorColor" class="mr-1"/>Server Connectivity

  </a>
</template>

<script>
import { mdbIcon } from "mdbvue";
import { SOCKET_STATES } from "@/defines.js";

export default {
  name: "WebSocketIndicator",
  components: {
    mdbIcon
  },
  socket: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    socketStatus() {
      return this.$store.getters.getSocketStatus;
    },
    socketStateIndicatorColor() {
      return this.socketStatus === SOCKET_STATES.CONNECTED
        ? "light-green-text"
        : "red-text";
    }
  }
};
</script>
<style>
</style>
