<template>
  <v-sheet
    class="py-2 px-4 ma-3 agc-message-bubble"
    :dark="!message.self"
    :color="getMessageColor(message.self)"
    :class="{ 'left-aligned': !message.self, 'right-aligned': message.self }"
  >
    <a :href="message.content.imageUrl" target="_blank">
      <v-img
        v-if="message.content.imageUrl && message.content.imageUrl.length > 0"
        :src="message.content.imageUrl"
        width="300px"
        class="mb-2"
      ></v-img>
    </a>
    {{ message.content.caption }}
  </v-sheet>
</template>

<script>
export default {
  name: "ImageResponse",
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
        return "#636363";
      } else {
        return "#f3f3f3";
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
  border: 1px solid black;
  max-width: 70%;
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
