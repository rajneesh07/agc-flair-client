<template>
  <widget title="Agent Note">
    <template v-slot:body>
      <div class="list-group px-3">
        <div class="form-group">
          <label for="exampleFormControlTextarea2">Small textarea</label>
          <textarea
            v-model="Notevalue"
            class="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div>
        <a href="#" class="btn btn-danger btn-block" @click="agentNoteUpdate">Add Note</a>
      </div>
    </template>
  </widget>
</template>

<script>
import Widget from "@/components/agc/Widget";
import { CALL_STATES } from "@/defines.js";
export default {
  name: "AgentNote",
  components: {
    Widget
  },
  mounted() {},
  props: {
    msg: String
  },

  data() {
    return {
      showWidget: true,
      Notevalue: ""
    };
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    },
    async agentNoteUpdate() {
      let resp = await this.$store.dispatch("updateAgentNotes", this.Notevalue);

      if (resp === "Success") {
        this.empidvalid = "Congrats";
      } else {
        this.empidvalid = "Sorry";
      }
    }
  },
  computed: {
    myCall() {
      //let index = this.$store.getters.getCallIndex("1234");

      let myCall = this.$store.getters.getCallByIndex(0);
      if (myCall) {
        return myCall;
      } else {
        return null;
      }
    },
    currentCallState() {
      if (this.myCall) {
        return this.myCall.status;
      } else {
        return null;
      }
    }
  },
  watch: {
    currentCallState(newState, oldState) {
      console.log("call state changed from:" + oldState + " to " + newState);
      if(newState !==null){
          if(newState===CALL_STATES.DROPPED){
              this.agentNoteUpdate()
            //  this.$store.dispatch("updateAgentNotes", this.Notevalue);
          }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>