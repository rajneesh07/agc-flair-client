<template>
  <persist-timer timer-name="loginTimer"></persist-timer>
</template>

<style>
.time {
  font-size: 1rem;
}
</style>

<script>
import { AGENT_STATES, TIMER_STATES } from "@/defines.js";
import PersistTimer from "@/components/agc/PersistTimer.vue";

export default {
  name: "LoginTimer",
  components: {
    PersistTimer
  },
  data() {
    return {};
  },
  beforeMount() {
    this.$store.dispatch("addUpTimer", "loginTimer");
  },
  mounted() {},
  destroyed() {},
  computed: {
    agentStatus() {
      return this.$store.getters.getAgent.agentState;
    }
  },
  watch: {
    agentStatus: {
      immediate: true,
      handler: function(newAgentStatus) {
        console.log("Agent Status Changed to:" + newAgentStatus);
        if (newAgentStatus === AGENT_STATES.LOG_IN) {
          console.log("-----------","1")
          console.log("+++++++++++",this.$store.getters.getTimerStatus("loginTimer"))
          if (
            this.$store.getters.getTimerStatus("loginTimer") !==
            TIMER_STATES.START
          ) {
            this.$store.dispatch("startTimer", "loginTimer");
            console.log("Timer started");
          } else {
            console.log(
              "skipping startTimer(login timer) since timer is already running "
            );
          }
        } else if (newAgentStatus === AGENT_STATES.LOG_OUT) {
          this.$store.dispatch("removeTimer", "loginTimer");
          console.log("Timer stopped");
        } else {
          // this.reset();
        }
      }
    }
  },
  methods: {
    reset() {
      this.$data.state = "started";
      this.$data.startTime = Date.now();
      this.$data.currentTime = Date.now();
    },
    pause() {
      this.$data.state = "paused";
    },
    resume() {
      this.$data.state = "started";
    },
    updateCurrentTime() {
      if (this.$data.state === "started") {
        this.currentTime = Date.now();
      }
    }
  }
};
</script>
