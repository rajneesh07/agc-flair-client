<template>
  <widget title="Call Details">
    <template v-slot:body>
      <mdb-container>
        <mdb-row>
          <mdb-col col="lg-12 mt-2">
            <dl class="row mb-1 no-gutters fl_dl" v-for="element in callerData" :key="element.key">
              <dt class="col-sm-6 fl_dt">{{element.key}}</dt>
              <dd class="col-sm-6 fl_dd">{{element.value.length>0?element.value : "-"}}</dd>
            </dl>
          </mdb-col>
        </mdb-row>
        <hr />
        <mdb-row>
          <mdb-col col="lg-12">
            <dl class="row mb-1 no-gutters fl_dl" v-for="element in uuiElements" :key="element.key">
              <dt class="col-sm-6 fl_dt">{{element.key}}</dt>
              <dd class="col-sm-6 fl_dd">{{element.value.length>0?element.value : "-"}}</dd>
            </dl>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </template>
  </widget>
</template>

<script>
import { mdbRow, mdbCol, mdbContainer } from "mdbvue";

import Widget from "@/components/agc/Widget";

export default {
  name: "CallerDetails",
  components: {
    Widget,
    mdbRow,
    mdbCol,
    mdbContainer
  },
  props: {},
  data() {
    return {
      showWidget: true,
      uui: [
        {
          key: "Current Call Time",
          value: ""
        },
        {
          key: "CLI",
          value: ""
        },
        {
          key: "UCID",
          value: ""
        },
        {
          key: "Collected Digits",
          value: "-"
        },
        {
          key: "Split/Skill",
          value: ""
        }
      ],
      callerData: [
        {
          key: "Name",
          value: "Suraj Raval"
        },
        {
          key: "RMN",
          value: "8879708222"
        },
        {
          key: "Account No.",
          value: "987698769876"
        },
        {
          key: "Account Type",
          value: "Savings"
        }
      ]
    };
  },
  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    }
  },
  computed: {
    uuiLabels() {
      return this.$store.state.uui.labels;
    },
    // callerData() {
    //   return this.$store.getters.getCallerData;
    // },
    uuiElements() {
      return this.$store.getters.getUui;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl_dd,
.fl_dt {
  height: 10px;
}
</style>
