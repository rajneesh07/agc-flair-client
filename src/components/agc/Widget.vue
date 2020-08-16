<template>
  <mdb-container fluid :style="{ height: height }">
    <mdb-card
      class="mb-0 fl_widget_card z-depth-1"
      :class="{ maximized: showWidget }"
      style="border-radius:10px"
    >
      <mdb-card-header
        class="fl_widget_card_header"
        
        :class="{ minimized: showWidget == false, 'mdb-color white-text':showWidget==true }"
        style="border-radius:5px 5px 0 0"
      >
        <strong>{{ title }}</strong>

        <a @click="toggleShowWidget">
          <transition name="fade" mode="in-out">
            <mdb-icon v-if="showWidget" icon="window-minimize" class="float-right"></mdb-icon>
            <mdb-icon v-else icon="bars" class="float-right"></mdb-icon>
          </transition>
        </a>
        <div class="float-right pr-5">
          <slot name="toolbar"></slot>
        </div>
      </mdb-card-header>
      <mdb-card-body
        class="fl_widget_card_body"
        v-show-slide="showWidget"
        :class="{ maximized: showWidget }"
      >
        <slot name="body"></slot>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardHeader,
  mdbIcon
} from "mdbvue";

export default {
  name: "Widget",
  components: {
    mdbContainer,

    mdbCard,
    mdbCardBody,
    mdbCardHeader,

    mdbIcon
  },
  mounted() {},
  props: {
    title: String,
    color: {
      type: String,
      default: "#7283a7 text-white"
    },
    height: {
      type: String,
      default: ""
    },
    fillHeight: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showWidget: true
    };
  },

  computed: {
    widgetColor() {
      return "background-color: " + this.color;
    }
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    }
  }
};
</script>
<style scoped>
.fl_widget_card {
  height: 30px;
  transition: all 0.2s linear;
}
.fl_widget_card.maximized {
  height: 100%;
}
.fl_widget_card_body {
  padding: 0px;
  opacity: 0;
  transition: all 1s ease;
}
.fl_widget_card_body.maximized {
  padding: 8px;
  opacity: 1;
}
.fl_widget_card_header {
  transition: all 0.2s ease;
}
.fl_widget_card_header.minimized {
  background-color: #7283a7 !important;
  /* color: black !important; */
}
.fl_widget_card_header.maximized {
  background-color: #7283a7 !important;
  color: white !important;
}
</style>
