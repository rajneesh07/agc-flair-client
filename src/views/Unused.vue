<template>
  <mdb-navbar class="flexible-navbar white" position="top" scrolling>
    <mdb-navbar-brand href="/" target="_blank">AGC Flair</mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav left>
        <agent-control></agent-control>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <mdb-nav-item waves-fixed active class="active" router>Log Out</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<style>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
main {
}

.flexible-content {
  transition: padding-left 0.3s;
  /* padding-left: 170px; */
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 0;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 170px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 0rem;
  padding-top: 0;
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

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler
} from "mdbvue";
export default {
  name: "SideNavbar",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler
  },

  props: {},

  data() {
    return {};
  }
};
</script>
