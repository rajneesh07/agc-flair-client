<template>
  <mdb-dropdown class="d-flex align-items-center">
    <a class="dropdown-toggle-a unique-color-text" slot="toggle">
      <strong>
        <mdb-icon icon="user" class="mr-2" size="1x" />
        <span class="h6">Suraj Raval</span>
      </strong>
    </a>
    <mdb-dropdown-menu right>
      <mdb-dropdown-item>
        <li>
          <div class="navbar-login">
            <div class="row">
              <div class="col-lg-4">
                <p class="text-center">
                  <mdb-icon icon="user" class="mr-2" size="5x" />
                </p>
              </div>
              <div class="col-lg-8">
                <div class="mb-2 d-flex justify-content-around">
                  <span class="text-left fl_agentProfile_details mb-3">
                    Agent:
                    <strong>{{credentials.agentId}}</strong>
                  </span>
                  <span class="text-left fl_agentProfile_details">
                    Station:
                    <strong>{{credentials.deviceId}}</strong>
                  </span>
                </div>
                <span class="text-left">
                  <a href="#" class="btn white-text unique-color btn-block btn-sm">Settings</a>
                </span>
              </div>
            </div>
          </div>
        </li>
        <div class="dropdown-divider"></div>
        <li>
          <div class="navbar-login navbar-login-session">
            <div class="row">
              <div class="col-lg-12">
                <p>
                  <a
                    href="#"
                    class="btn btn-danger btn-block"
                    @click="agentLogoutBtnClicked"
                  >Log Out</a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </mdb-dropdown-item>
    </mdb-dropdown-menu>
  </mdb-dropdown>
</template>

<script>
import { SOCKET_EVENTS } from '@/defines.js'
import {
  mdbRow,
  mdbCol,
  mdbContainer,
  mdbBtn,
  mdbDropdown,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbCardText,
  mdbIcon,
  mdbTbl
} from 'mdbvue'

export default {
  name: 'AgentProfile',
  components: {
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbCardText,
    mdbIcon,
    mdbTbl,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbDropdownMenu
  },
  props: {},
  data() {
    return {
      agentName: ''
    }
  },
  mounted() {
    this.agentName = this.$store.getters.getAgent.fullName
  },
  methods: {
    agentLogoutBtnClicked() {
      this.$store.dispatch('sendAgentLogoutRequest')
    }
  },
  computed: {
    credentials() {
      return this.$store.getters.getAgentCredentials
    },
    socketRequest() {
      return this.$store.state.socketRequest
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
