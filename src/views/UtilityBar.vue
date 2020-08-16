<template>
  <mdb-navbar color="unique" position="bottom" dark>
    <web-socket-indicator></web-socket-indicator>
    <span class="white-text">SessionID: {{sessionId}}</span>
  </mdb-navbar>
</template>
<style>
</style>

<script>
import WebSocketIndicator from '@/components/agc/WebSocketIndicator'
import {

  mdbNavbar,
  
} from 'mdbvue'
export default {
  name: 'UtilityBar',
  components: {

    WebSocketIndicator,
    mdbNavbar,
   
  },

  props: {},

  data() {
    return {}
  },
  methods: {},
  computed: {
    sessionId() {
      return this.$store.getters['session/getSessionId']
    }
  }
}
</script>
