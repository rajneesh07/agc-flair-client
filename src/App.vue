<template>
  <div class="d-flex flex-column py-0 my-0" id="app">
    <div ref="topNavBar">
      <top-navbar v-if="isAgentLoggedIn" class></top-navbar>
    </div>
    <main class="d-flex flex-fill main-body pt-5 mt-4">
      <router-view v-if="isAgentLoggedIn" class="flex-fill"></router-view>
      <login-page v-else class="flex-fill pt-4"></login-page>
    </main>
    <bottom-footer></bottom-footer>

    <notifications group="warning" width="500" position="bottom center" :ignoreDuplicates="true" />
    <notifications group="info" width="500" position="bottom center" :ignoreDuplicates="true" />
    <notifications
      group="error"
      width="500"
      position="bottom center"
      :ignoreDuplicates="true"
      classes="vue-notification "
    />
    <chat-drawer></chat-drawer>
  </div>
</template>

<script>
// import {

//   waves
// } from 'mdbvue'

import TopNavbar from "@/views/TopNavbar";
import LoginPage from "@/views/Login";
import BottomFooter from "@/views/BottomFooter.vue";
import ChatDrawer from "@/widgets/Chat/Layout/ChatDrawer.vue";
import { AGENT_STATES, SOCKET_STATES } from "@/defines";

export default {
  name: "AdminTemplate",
  components: {
    LoginPage,
    TopNavbar,
    ChatDrawer,
    BottomFooter
  },
  data() {
    return {
      activeItem: 1,
      ipAddress: null
    };
  },
  sockets: {
    connect() {
      console.log("App/sockets/connect(): socket connected");
      this.$store.dispatch("processSocketConnected");
    },
    connect_error() {
      console.log("App/sockets/connect(): socket connect_error");
      if (this.$store.getters.getSocketStatus === SOCKET_STATES.CONNECTED) {
        this.$store.dispatch("showErrorBanner", [
          "Server Connection Lost!",
          "Server connection could not be established. Please make sure you have connectivity with the server before you attempt to log in."
        ]);
        this.$store.dispatch("setSocketStateDisconnected");
      }
    },
    connection_error() {
      console.log("App/sockets/connect(): socket connection_error");
      this.$store.dispatch("showErrorBanner", [
        "Server Connection Lost!",
        "WebSocket connection timed out. Please make sure the websocket server is running."
      ]);

      this.$store.dispatch("setSocketStateDisconnected");
    }
  },

  mounted() {
    this.$store.dispatch("session/addWindowRefreshReloadListener");
    // this.$store.dispatch('authenticateCrm').then(() => {
    //   //this.$store.dispatch('getAccountIdFromCli', '8879708222')
    // })

    if (this.$refs.topNavBar) {
      console.log(
        "App/mounted(): navbar height is" +
          JSON.stringify(this.$refs.topNavBar.clientHeight)
      );
    }
  },
  methods: {},
  computed: {
    isAgentLoggedIn() {
      if (
        this.$store.getters["getAgentState"] === AGENT_STATES.LOG_OUT ||
        this.$store.getters["getAgentState"] === AGENT_STATES.UNKNOWN
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch("session/loadConfigurations");
  },
  beforeMount() {
    // this.$store.dispatch("session/loadConfigurations");

    this.activeItem = this.$route.matched[0].props.default.page;
  }
  // mixins: [waves]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body > div > div:nth-child(1) > nav > ul > span > li > ul,
body > div > div:nth-child(1) > nav > ul > span > div > ul {
  transition: unset !important;
}
.test-cont {
  height: 280px;
  width: 280px;
  background: red;
}
@import url("https://fonts.googleapis.com/css?family=Unica+One&display=swap");
/* @import url('/static/fonts.css'); */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  font-size: 50%;
  font-size: 0.75em !important;
  color: rgba(0, 0, 0, 0.45);
}
@media (min-width: 600px) {
  html {
    font-size: 50%;
  }
}

@media (min-width: 800px) {
  html {
    font-size: 62.5%;
  }
}

@media (min-width: 1440px) {
  html {
    /* Never get larger than this */
    font-size: 75%;
  }
}
.main-body {
  height: calc(100vh - 30px);
  background: linear-gradient(#fff, rgb(243, 243, 243));
  overflow: scroll;
}
footer {
  height: 25px;
}
.dispFont {
  font-family: "Unica One", sans-serif;
}

@media (min-width: 992px) {
  .col-lg-2p5 {
    -ms-flex: 0 0 20.833333%;
    flex: 0 0 20.833333%;
    max-width: 20.833333%;
  }
}

.navbar-nav {
  flex-direction: row !important;
}
.fl_widget {
  margin-bottom: 10px !important;
}

.fl_btn_btnIcon i {
  color: #9e9e9e;
}
.fl_btn_btnIcon:hover i {
  color: #03a9f4;
}
.fl_btn_btnIcon:active i {
  color: #0097a7;
}

/* Hides the element */
.fl_hidden {
  display: none;
}
.fl-color-agc {
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
.fa-1p5x {
  font-size: 1.5em;
}
.fl_dropdown {
  border-width: 0px;
  position: absolute;
  right: 40px;
  z-index: 99;
}
.fl_rotating_icon {
  transform: rotate(225deg);
  transition: all 0.3s ease;
}
.fl_rotating_icon.active {
  transform: rotate(360deg);
}
.fl_container_dialer {
  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); */
  border-radius: 10px;
  max-width: 250px;
  margin: auto;
}

/************   Utility Styles   *******************/

.fl_disabledWidget {
  pointer-events: none;
  opacity: 0.5;
}
.btn-circle {
  width: 24px;
  height: 24px;
  text-align: center;
  padding: 6px 0 !important;
  line-height: 1.428571429;
  border-radius: 50% !important;
}
.btn-circle.btn-md {
  width: 32px;
  height: 32px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-lg {
  width: 40px;
  height: 40px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}

/******************Slide Animation Styles********************/

.slide-enter-active {
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  transition-duration: 0.4s;

  transition-timing-function: linear;
}

.slide-leave-active {
  -moz-transition-duration: 0.8s;
  -webkit-transition-duration: 0.8s;
  -o-transition-duration: 0.8s;
  transition-duration: 0.8s;
  -moz-transition-timing-function: linear;
  -webkit-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.flip-list-move {
  transition: transform 0.2s;
}

/******************Fade Animation Styles********************/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter, .fade-leave-to
/* .-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.card {
  box-shadow: 3px 2px 15px 2px rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
}
</style>
<style scoped>
main {
  /* background: url("https://cdn-images-1.medium.com/max/2000/1*AcYLHh0_ve4TNRi6HLFcPA.jpeg"); */
  background-size: cover;
}
.fl_topSpacing {
  padding-top: 64px;
}
</style>
