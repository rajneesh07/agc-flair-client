<template>
  <div class="fl_container_dialer black-text" >
    <mdb-container fluid>
      <div @click.stop>
        <mdb-row class="px-3 py-4" @click.stop>
          <mdb-col class="d-flex align-items-baseline">
            <!--Input Textbox for digits-->

            <input
              class="fl_inp_dialedDigits line light-blue-text px-3"
              type="text"
              v-model="dialedDigits"
              @click.stop
            />
          </mdb-col>

          <!--Delete Single Digit-->
          <a
            class="black-text align-self-baseline mr-3 fl_btn_btnIcon"
            @click="deleteSingleDigit"
            @click.stop
            v-longclick="() => clearDigits()"
          >
            <mdb-icon icon="backspace" size="1p5x" />
          </a>
        </mdb-row>
      </div>

      <mdb-row>
        <!--For Loop for cycling through array of digits to for a grid of dialpad digits-->
        <mdb-col col="4" v-for="digit in digits" :key="digit.id">
          <div
            class="fl_button_dialerDigit btn-block transparent-color text-center fl_btn_btnIcon"
            @click="appendDigit(digit.text)"
            @click.stop
          >
            <div class="number">{{digit.text}}</div>
            <div class="subText">{{digit.subText}}</div>
          </div>
        </mdb-col>
      </mdb-row>
      <div @click.stop>
        <mdb-row class @click.stop>
          <transition name="fade">
            <mdb-btn  class="mx-2 py-3 btn-block" color="cyan darken-2" @click="onMakeCallButtonClicked">
              <span class="spinner-border text-info float-left" v-if="spinner.show"></span>
              <span>Call</span>
            </mdb-btn>
          </transition>
          <transition name="fade">
          
          </transition>
        </mdb-row>
      </div>
    </mdb-container>
  </div>


</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
 
  mdbIcon
} from 'mdbvue'


export default {
  name: 'OutboundDialer',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
  
    mdbIcon
  },
  mounted() {},
  props: {},
  //digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'],
  data() {
    return {
      dialedDigits: '',

      digits: [
        {
          text: 1,
          subText: ''
        },
        {
          text: 2,
          subText: 'ABC'
        },
        {
          text: 3,
          subText: 'DEF'
        },
        {
          text: 4,
          subText: 'GHI'
        },
        {
          text: 5,
          subText: 'JKL'
        },
        {
          text: 6,
          subText: 'MNO'
        },
        {
          text: 7,
          subText: 'PQRS'
        },
        {
          text: 8,
          subText: 'TUV'
        },
        {
          text: 9,
          subText: 'WXYZ'
        },
        {
          text: '*',
          subText: ''
        },
        {
          text: 0,
          subText: '+'
        },
        {
          text: '#',
          subText: ''
        }
      ],
      digitSubText: [
        '',
        'ABC',
        'DEF',
        'GHI',
        'JKL',
        'MNO',
        'PQRS',
        'TUV',
        'WXYZ',
        '',
        '+',
        ''
      ],
      interval: false,
      digitDeleteSpeed: 200,
      initialDeleteSpeed: 500,
      spinner: {
        show: false
      }
    }
  },

  methods: {
    showSpinner() {
      this.spinner.show = true
    },
    hideSpinner() {
      this.spinner.show = false
    },

    appendDigit(digit) {
      this.dialedDigits += digit
    },
    deleteSingleDigit() {
      console.log('deleteSingleDigits')
      this.dialedDigits = this.dialedDigits.slice(
        0,
        this.dialedDigits.length - 1
      )
    },
    startDeletingDigits() {
      this.interval = setInterval(
        () => this.deleteSingleDigit(),
        this.digitDeleteSpeed
      )
    },
    stopDeletingDigits() {
      clearInterval(this.interval)
    },
    clearDigits() {
      this.dialedDigits = ''
    },

    onMakeCallButtonClicked() {
      this.$store.dispatch('updateDialedDigits', this.dialedDigits)
      this.showSpinner()
      this.$store.dispatch('requestOutboundCall').then(resp => {
        console.log('onMakeCallButtonClicked(): resp=' + JSON.stringify(resp))
        this.hideSpinner()
        if (resp.responseCode === '0') {
          this.$emit('close-self')
          this.$store.dispatch('setCallStateDialing', resp)
          this.$store.dispatch('processNewOutboundCall', resp)
        }
      })
    },
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  display: block;
  border: none;
  color: #333;
  background: transparent;
  border-bottom: 1px dotted black;
  padding: 5px 2px 0 2px;
  font-size: 1.5em;
}

.line:focus {
  outline: none;
  border-color: #51cbee;
}

.line::-webkit-inner-spin-button,
.line::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.fl_inp_dialedDigits {
  height: 25px;
  width: 100%;
  border-bottom: 1px solid grey;
  font-family: 'Unica One', san-serif;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.75);
}

.fl_inp_dialedDigits input {
  font-size: 2em;
  color: rgba(0, 0, 0, 0.75);
}

.fl_button_dialerDigit {
  padding: 8px;
  cursor: pointer;

  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}

.fl_button_dialerDigit .number {
  font-family: 'Unica One', san-serif;
  font-size: 1.3rem;
  font-weight: 400;
}

.fl_button_dialerDigit .subText {
  font-size: 0.9rem;
  font-weight: 300;
}

.fl_button_dialerDigit:hover {
  color: #03a9f4;

  background-color: rgba(240, 240, 240, 0.05);
}
.fl_button_dialerDigit:hover .number {
  font-size: 1.3rem;
  font-weight: 700;
}
.fl_button_dialerDigit:active {
  color: #0097a7;
  background-color: rgba(200, 200, 200, 0.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
