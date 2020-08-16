<template>
  <li :key="message.id" class="text-left agc-message-container">
    <text-response v-if="message.type === 'text'" :message="message" :chat-id="chatId"></text-response>
    <image-response v-if="message.type === 'image'" :message="message" :chat-id="chatId"></image-response>
    <card-response v-if="message.type === 'card'" :message="message" :chat-id="chatId"></card-response>
  </li>
</template>

<script>
import TextResponse from "./../Responses/TextResponse";
import CardResponse from "./../Responses/CardResponse";
import ImageResponse from "./../Responses/ImageResponse";
export default {
  name: "Message",
  components: {
    TextResponse,
    CardResponse,
    ImageResponse
  },
  props: {
    chatId: String,
    message: {}
  },
  methods: {
    // getMessageAlignment(isSelf) {
    //   if (isSelf === true) {
    //     return "end";
    //   } else {
    //     return "start";
    //   }
    // },
    // getMessageColor(isSelf) {
    //   if (isSelf === true) {
    //     return "mdb-color";
    //   } else {
    //     return "#f3f3f3";
    //   }
    // }
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
