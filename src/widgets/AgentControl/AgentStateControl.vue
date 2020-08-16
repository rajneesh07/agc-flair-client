<template>
  <mdb-dropdown tag="li" class="nav-item">
    <!--Selected State-->
    <mdb-dropdown-toggle tag="a" navLink color="special" slot="toggle">
      <mdb-icon
        icon="circle"
        :class="agentStateIndicatorColor(currentAgentAuxState.state)"
        class="mr-2"
      />
      <strong class="h6">{{ currentAgentAuxState.label }}</strong>
    </mdb-dropdown-toggle>

    <mdb-dropdown-menu left color="primary">
      <!--List of all possible agent states-->
      <mdb-dropdown-item
        class="p-1 fl_dropdown_item"
        :key="auxCode.id"
        v-for="auxCode in filteredAuxCodes"
      >
        <div
          @click="onAgentStateDropDownChanged(auxCode)"
          class="p-2"
          v-if="auxCode.userSelectable === true"
        >
          <!-- Round Icon to indicate the color of the agent's state-->
          <mdb-icon icon="circle" class="mr-1" :class="agentStateIndicatorColor(auxCode.state)" />
          <!-- Actual Agent State-->
          <span>{{ auxCode.label }}</span>
        </div>
      </mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import {
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbIcon,
  mdbDropdownToggle
} from "mdbvue";
import { AGENT_STATES } from "@/defines";

export default {
  name: "AgentStateControl",
  components: {
    mdbIcon,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle
  },
  props: {},
  data() {
    return {
      auxCodes: this.$store.getters.getFullAuxCodeList
    };
  },

  methods: {
    //This Method is called whenever the Agent Dropdown option is changed
    onAgentStateDropDownChanged(selectedAuxCode) {
      console.log(
        "onAgentStateDropDownChanged(): method entered. selectedAuxCode=" +
          JSON.stringify(selectedAuxCode)
      );
      this.$store.dispatch("setUpdatedAuxCode", selectedAuxCode);
      this.$store.commit("SET_AGENT_AUX_CODE", selectedAuxCode);

      //Depending on the selected state, update the store with the new state
      switch (selectedAuxCode.state) {
        case AGENT_STATES.READY:
        case AGENT_STATES.NOT_READY:
          this.$store
            .dispatch("sendAgentStateRequest", selectedAuxCode)
            .then(resp => {
              if (resp.responseCode === "0") {
                this.$store.commit("SET_AGENT_AUX_CODE", selectedAuxCode);
              }
            });
          break;

        default:
      }
    },
    agentStateIndicatorColor(state) {
      if (state) {
        //console.log('agentStateIndicatorColor(): state=', state)
        switch (state) {
          case AGENT_STATES.READY:
            return "green-text";

          case AGENT_STATES.NOT_READY:
            return "red-text";
          case AGENT_STATES.BUSY:
            return "amber-text";
          case AGENT_STATES.WORK_NOT_READY:
          case AGENT_STATES.LOG_IN:
            return "blue-text";
        }
      }
    }
  },
  computed: {
    currentAgentAuxState() {
      return this.$store.getters.getAgentAuxState;
    },
    filteredAuxCodes() {
      let filt = [];
      for (let auxCode of this.auxCodes) {
        if (auxCode.userSelectable) {
          filt.push(auxCode);
        }
      }
      return filt;
    }
  }
};
</script>

<style scoped>
#fl_agent_state_dropdown {
  min-width: 150px;
}
.fl_dropdown_item {
  font-size: 1rem !important;
}
.drop .dropdown-toggle-a {
  background-color: none;
}
.dropdown-toggle-a:after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}
.custom-select {
  height: unset !important;
  line-height: 1;
}
</style>
