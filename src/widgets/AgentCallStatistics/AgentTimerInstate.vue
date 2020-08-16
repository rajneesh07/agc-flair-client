<template>
  <persist-timer name="agentTimerInstate"></persist-timer>
</template>

<style>
.time {
  font-size: 1rem;
}
</style>

<script>
import { AGENT_STATES } from '@/defines.js'
import PersistTimer from '@/components/agc/PersistTimer.vue'
export default {
  name: 'AgentTimerInstate',
  components: {
    PersistTimer
  },
  data() {
    return {}
  },
  mounted() {
    //TODO: add agent state timer
  },
  destroyed() {},
  computed: {
    agentStatus() {
      return this.$store.getters.getAgentState
    }
  },
  watch: {
    agentStatus(newAgentStatus, oldAgentStatus) {
      console.log(
        'CallTimerInstate()/watch(agentStatus): Changed from: ' +
          oldAgentStatus +
          ' to: ' +
          newAgentStatus
      )
      if (newAgentStatus !== AGENT_STATES.LOG_OUT) {
        this.$store.dispatch('startTimer', '','agentTimerInstate')
      } else {
        this.$store.dispatch('stopTimer', 'agentTimerInstate')
      }
    }
  },
  methods: {}
}
</script>
