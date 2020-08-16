<template>
  <mdb-navbar
    color="special-color"
    class="white-text flexible-navbar fl_topNav"
    position="top"
    navIconClass="white-text"
    :toggler="false"
  >
    <span class="fl_navbar_item mr-auto">
      <div class="light-color" style="opacity:1">
        <img
          src="@/assets/flair_logo_white.png"
          class="mx-0"
          alt="Responsive image"
          style="width: 75px; opacity:1 !important"
        />
      </div>
    </span>
    <span class="fl_navbar_item">
      <agent-state-control></agent-state-control>
    </span>

    <span class="fl_navbar_item">
      <agent-profile></agent-profile>
    </span>
    <!-- <span class="fl_navbar_item">
       
    </span>-->
  </mdb-navbar>
</template>

<script>
import AgentStateControl from "@/widgets/AgentControl/AgentStateControl.vue";
import AgentProfile from "@/widgets/AgentControl/AgentProfile.vue";

import { mdbNavbar } from "mdbvue";
export default {
  name: "TopNavbar",
  components: {
    AgentProfile,
    AgentStateControl,
    mdbNavbar
  },

  props: {},

  data() {
    return {
      showOutboundDialerModal: false
    };
  },
  methods: {}
};
</script>

<style>
.fl_navbar_item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 100px;
}
.divider-vertical {
  height: 50px;
  margin: 0 9px;
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #fff;
}
.fl_topNav{
justify-content: unset;
}
.fl_topNav::after {
  content: "";
  line-height: 0;
  font-size: 0;
  width: 0;
  height: 0;
  border-top: 45px solid #37474f;
  border-bottom: 45px solid transparent;
  border-left: 0px solid transparent;
  border-right: 50px solid transparent;
  position: absolute;
  top: 0;
  right: -50px;
}
.navbar-login {
  width: 305px;
  padding: 10px;
  padding-bottom: 0px;
}

.navbar-login-session {
  padding: 10px;
  padding-bottom: 0px;
  padding-top: 0px;
}

.icon-size {
  font-size: 87px;
}

.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}

.flexible-navbar {
  user-select: none;
  transition: padding-left 0.5s;
  padding-left: 0;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
