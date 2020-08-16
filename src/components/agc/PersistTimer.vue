<template>
  <div>
    <span>{{showTickTimer?tickTime:formattedTime}}</span>
  </div>
</template>

<script>
import { TIMER_STATES } from "@/defines.js";
export default {
  name: "PersistTimer",
  props: {
    timerName: String,
    showTickTimer: Boolean
  },
  data() {
    return {
      formattedTime: "00:00:00",
      tickTime: "00:00:00",
      numTicks: 0,
      timerInterval: null
    };
  },
  mounted() {},
  beforeDestroy() {
    this.stopTicking();
  },
  destroyed() {
    clearInterval(this.timerInterval);
  },

  methods: {
    resetFormattedTime() {
      this.formattedTime = "00:00:00";
      this.tickTime = "00:00:00"
      this.numTicks = 0;
    },
    startTicking() {
      if (this.timer && this.timerState && this.refTime) {
        this.updateTicks();
        this.timerInterval = setInterval(this.updateTicks, 1000);
      }
    },
    stopTicking() {
      clearInterval(this.timerInterval);
      this.resetFormattedTime();
    },
    pauseTicking() {
      clearInterval(this.timerInterval);
      // this.resetFormattedTime();
    },
    updateTicks() {
      this.numTicks++;
      let secondMillis = new Date().getTime() - this.refTime;
      let seconds = Math.floor(secondMillis / 1000) % 60;

      let minutes = Math.floor(secondMillis / 1000 / 60) % 60;
      let hours = Math.floor(minutes / 60) % 12;

      let tickSeconds = Math.floor(this.numTicks) % 60;
      let tickMinutes = Math.floor(tickSeconds / 60) % 60;
      let tickHours = Math.floor(tickMinutes / 60) % 12;

      this.formattedTime =
        "" +
        this.padNumber(hours) +
        ":" +
        this.padNumber(minutes) +
        ":" +
        this.padNumber(seconds);

      this.tickTime =
        "" +
        this.padNumber(tickHours) +
        ":" +
        this.padNumber(tickMinutes) +
        ":" +
        this.padNumber(tickSeconds);
    },
    padNumber(i) {
      return i < 10 ? "0" + i : i;
    },
    setTimer(timer) {
      this.timerState = timer.state;
      this.refTime = timer.refTime;
    }
  },
  computed: {
    timer() {
      let index = this.$store.getters.getTimerIndex(this.timerName);
      let timer = this.$store.getters.getTimers[index];
      return timer;
    },
    timerState() {
      if (this.timer) {
        return this.timer.state;
      } else {
        this.stopTicking();
        return null;
      }
    },
    refTime() {
      if (this.timer) {
        return this.timer.refTime;
      } else {
        this.stopTicking();
        return null;
      }
    }
  },
  watch: {
    refTime() {
      this.resetFormattedTime();
    },
    timer: {
      deep: true,
      immediate: true,
      handler: function(newState) {
        if (newState.state === TIMER_STATES.START) {
          this.startTicking();
        } else if (newState.state === TIMER_STATES.STOP) {
          this.stopTicking();
        } else if (newState.state === TIMER_STATES.PAUSE) {
          this.pauseTicking();
        }
      }
    }
  }
};
</script>
