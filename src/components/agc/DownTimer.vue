<template>
  <span id="time" class="time text-unique-color">{{time}}</span>
</template>

<style>
</style>

<script>
import { TIMER_STATES } from '@/defines.js'
export default {
  name: 'DownTimer',
  props: {
    name: String
  },
  data() {
    return {
      state: 'started',
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null,
      secondTicks: this.$store.getters.getTimerExpiry(this.name),
      expiry: 0
    }
  },
  mounted() {
    console.log('DownTimer/mounted(): timerName = ' + this.name)
    this.expiry = this.$store.getters.getTimerExpiry(this.name)
    this.secondTicks = this.$store.getters.getTimerExpiry(this.name)
    this.startTicking()
  },
  destroyed() {},
  computed: {
    secondDisplay() {
      return this.padNumber(this.secondTicks % 60)
    },
    minuteDisplay() {
      return this.padNumber(Math.floor((this.secondTicks / 60) % 60))
    },
    hourDisplay() {
      return this.padNumber(Math.floor((this.secondTicks / 3600) % 60))
    },
    time() {
      return (
        this.hourDisplay + ':' + this.minuteDisplay + ':' + this.secondDisplay
      )
    },

    timer() {
      return this.$store.getters.getTimerStatus(this.name)
    }
  },
  watch: {
    timer(newTimerCommand, oldTimerCommand) {
      if (oldTimerCommand === TIMER_STATES.STOP) {
        if (newTimerCommand === TIMER_STATES.START) {
          this.startTicking()
        }
      } else if (oldTimerCommand === TIMER_STATES.START) {
        if (newTimerCommand === TIMER_STATES.STOP) {
          this.stopTicking()
        } else if (newTimerCommand === TIMER_STATES.PAUSE) {
          this.pauseTicking()
        } else if (newTimerCommand === TIMER_STATES.START) {
          this.resetTicking()
        }
      } else if (oldTimerCommand === TIMER_STATES.PAUSE) {
        if (newTimerCommand === TIMER_STATES.STOP) {
          this.stopTicking()
        } else if (newTimerCommand === TIMER_STATES.START) {
          this.resumeTicking()
        }
      }
    }
  },
  methods: {
    startTicking() {
      this.updateTicks()
      this.interval = setInterval(this.updateTicks, 1000)
    },
    stopTicking() {
      clearInterval(this.interval)
      this.secondTicks = this.expiry
    },
    resetTicking() {
      this.secondTicks = this.expiry
    },
    pauseTicking() {
      clearInterval(this.interval)
    },
    resumeTicking() {
      this.interval = setInterval(this.updateTicks, 1000)
    },
    updateTicks() {
      if (this.secondTicks > 0) {
        if (this.secondTicks === 1) {
          this.$emit('timer-expired')
          this.$store.dispatch('stopTimer', 'acwTimer')
        }
        this.secondTicks = this.secondTicks - 1
      } else {
        this.secondTicks = 0
      }

      if (this.secondTicks === 0) {
      }
    },

    padNumber(i) {
      return i < 10 ? '0' + i : i
    }
  }
}
</script>
