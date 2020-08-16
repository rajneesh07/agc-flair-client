<template>
  <mdb-container fluid class="d-flex fl_corner_bg">
    <!-- Material form login -->
    <mdb-row class="d-flex flex-fill justify-content-center">
      <mdb-col col="lg-6" class style>
        <!--Logout button only for testing. Remove it for production-->
        <a class="text-white" @click="forceLogoutButtonClicked">Logout</a>
        <mdb-card>
          <div class="pt-3 d-flex justify-content-around">
            <img
              src="@/assets/flair_logo.png"
              class="ml-2 mr-5"
              alt="Responsive image"
              style="width: 33%; height: 33%"
            />
            <img src="@/assets/agc-logo_v2.jpg" class="mr-2 ml-5 pb-5" alt="Responsive image" style="width: 33%" />
          </div>
          <p class="h4 text-center my-4 py-3 fl-color-agc white-text">
            <span class="float-left pl-4">Login</span>
          </p>
          <mdb-card-body class="p-4">
            <form class="grey-text" @submit.prevent>
              <mdb-input
                required
                label="Agent ID"
                icon="user"
                type="text"
                v-model="credentials.agentId"
              />
              <mdb-input
                required
                label="Station ID"
                icon="phone"
                type="text"
                v-model="credentials.deviceId"
              />
              <mdb-input
                required
                label="Password"
                icon="lock"
                type="password"
                v-model="credentials.password"
              />
              <div class="d-flex justify-content-center mb-1">
                <div class="custom-control custom-radio custom-control-inline mr-5">
                  <input
                    type="radio"
                    class="custom-control-input"
                    id="auto-in"
                    name="login-type"
                    value="auto"
                    v-model="credentials.workMode"
                    checked
                  />
                  <label class="custom-control-label" for="auto-in">Auto-in</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    class="custom-control-input"
                    id="manual-in"
                    name="login-type"
                    value="manual"
                    v-model="credentials.workMode"
                  />
                  <label class="custom-control-label" for="manual-in">Manual-in</label>
                </div>
              </div>
              <span class="spinner-border text-info float-left" v-if="spinner.show"></span>
              <div class="btn-group text-center my-3 w-100 pl-4 ml-3">
                <mdb-btn
                  color="mdb-color"
                  class="btn white-text mr-3"
                  @click="agentLoginBtnClicked"
                  @keydown="handleEnterKeyForLogin"
                >Log in</mdb-btn>
              </div>
            </form>
          </mdb-card-body>
          <mdb-alert :color="loginAlert.color" v-if="loginAlert.show">{{loginAlert.message}}</mdb-alert>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <mdb-modal class="pt-5" v-if="showLogoutModal" @close="showLogoutModal = false" elegant>
      <mdb-modal-header>
        <mdb-modal-title>Modal title</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>You are already logged-in as an agent. Would you like to logout from the previous session?</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="showLogoutModal = false">Cancel</mdb-btn>
        <mdb-btn color="primary" @click.native="forceLogoutButtonClicked">Force Log-out</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

<script>
// import Utils from "@/services/Utils.js" 
import {
  mdbAlert,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbCard,
  mdbCardBody,

  mdbInput,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter
} from "mdbvue";

export default {
  name: "LoginPage",
  components: {
    mdbAlert,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,

    mdbInput,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
  },
  mounted() {
    this.credentials = this.$store.getters.getAgentCredentials;
  },
  props: {},

  data() {
    return {
      loginResponse: "",
      loginAlert: {
        message: "",
        color: "",
        show: false
      },
      credentials: {
        agentId: "",
        deviceId: "",
        password: "",
        workMode: "auto"
      },
      spinner: {
        show: false
      },
      ipAddress: "",
      showLogoutModal: false
    };
  },
  sockets: {},
  methods: {
    handleEnterKeyForLogin(e) {
      if (e.keyCode === 13) {
        this.agentLoginBtnClicked();
      }
    },
    async agentLoginBtnClicked() {
      this.$store.dispatch("setAgentLoginCredentials", this.credentials);
      console.log("agentLoginBtnClicked(): login button clicked");
      this.$store.dispatch("processAgentLogin")
      // this.showSpinner();
      // let sendAgentLoginRequest = () => {
      //   this.$store.dispatch("sendAgentLoginRequest").then(resp => {
      //     console.log(resp);
      //     this.hideSpinner();
      //     if (resp && resp.responseCode) {
      //       if (resp.responseCode === "0") {
      //         this.$store.dispatch("showErrorBanner", [
      //           "Welcome",
      //           "You are successfully logged in"
      //         ]);
      //       } else if (resp.responseCode === "35") {
      //         this.showLogoutModal = true;
      //       }
      //     }
      //   });
      // };

      // this.$store.dispatch("setAgentLoginCredentials", this.credentials);
      // console.log("agentLoginBtnClicked(): login button clicked");

      // let currentSessionId = this.$store.getters["session/getSessionId"];

      // if (!currentSessionId) {
      //   this.$store.dispatch("session/requestSessionFromServer").then(resp => {
      //     if (resp.sessionId) {
      //       sendAgentLoginRequest();
      //     } else {
      //       if (resp.responseCode === "05") {
      //         this.$store.dispatch("showErrorBanner", [
      //           "Agent Login Failed",
      //           resp.responseMessage
      //         ]);
      //       } else {
      //         this.$store.dispatch("showErrorBanner", [
      //           "Agent Login Failed",
      //           "COuld not retrieve session ID from the server"
      //         ]);
      //       }
      //     }
      //   });
      // } else {
      //   sendAgentLoginRequest();
      // }
    },

    forceLogoutButtonClicked() {
      this.showLogoutModal = false;
      this.$store.dispatch("setAgentLoginCredentials", this.credentials);
      this.$store.dispatch("sendAgentLogoutRequest");
    },

    hideAlert() {
      this.loginAlert.message = "";
      this.loginAlert.color = "";
      this.loginAlert.show = false;
    },
    showAlert(color, message) {
      this.loginAlert.message = message;
      this.loginAlert.color = color;
      this.loginAlert.show = true;
    },
    showSpinner() {
      this.spinner.show = true;
    },
    hideSpinner() {
      this.spinner.show = false;
    }
  },
  computed: {
    socketRequest() {
      return this.$store.state.socketRequest;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .fl_corner_bg {
} */
.fl_login_banner {
  background: rgba(204, 0, 0, 1);
  background: -moz-linear-gradient(
    left,
    rgba(204, 0, 0, 1) 0%,
    rgba(255, 102, 0, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(204, 0, 0, 1)),
    color-stop(100%, rgba(255, 102, 0, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(204, 0, 0, 1) 0%,
    rgba(255, 102, 0, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(204, 0, 0, 1) 0%,
    rgba(255, 102, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(204, 0, 0, 1) 0%,
    rgba(255, 102, 0, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(204, 0, 0, 1) 0%,
    rgba(255, 102, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( 
    startColorstr='#cc0000', endColorstr='#ff6600', 
    GradientType=1 );
}
.login-radio-container {
  align-content: center;
  justify-content: space-around;
  display: flex;
  width: 50%;
  margin: auto;
  padding-bottom: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
