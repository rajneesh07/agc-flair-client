<template>
  <!-- <v-sheet
    class="py-2 px-4 agc-message-bubble"
    :dark="!message.self"
    :color="getMessageColor(message.self)"
    
  >{{ message.content.text }}</v-sheet>-->

  <mdb-card
    class="w-75 mx-2 agc-message-bubble"
    :color="getMessageColor(message.self)"
    :class="{ 'left-aligned': !message.self, 'right-aligned': message.self }"
  >
    <mdb-card-body>{{ message.content.text }}</mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "TextResponse",
  components: {
    mdbCard,
    mdbCardBody
  },
  props: {
    message: {
      text: String,
      self: Boolean
    }
  },
  methods: {
    getMessageAlignment(isSelf) {
      if (isSelf === true) {
        return "end";
      } else {
        return "start";
      }
    },
    getMessageColor(isSelf) {
      if (isSelf === false) {
        return "cyan lighten-5";
      } else {
        return "grey lighten-5";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agc-message-container {
  list-style: none;
  width: 100%;
  clear: both;
}

.agc-message-bubble {
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 70%;
  margin-bottom: 10px;
  box-shadow: none !important;
  border-radius: 10px;
  color: black !important;
}
.agc-user-img-container {
  display: inline-block;
  height: 15px;
  width: 15px;
  background-color: red;

  border-radius: 50%;
}

.left-aligned {
  float: left;
}
.right-aligned {
  float: right;
}
</style>
