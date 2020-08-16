<template>
  <v-card class="mx-auto mt-5" max-width="300" elevation="2">
    <v-img
      v-if="message.content.imageUrl && message.content.imageUrl.length > 0"
      :src="message.content.imageUrl"
      height="150px"
    ></v-img>

    <v-card-title>{{ message.content.title }}</v-card-title>

    <v-card-subtitle>{{ message.content.subTitle }}</v-card-subtitle>

    <v-card-actions>
      <v-btn
        :disabled="!isThisTheLastMessage"
        text
        v-for="button of message.content.buttons"
        :key="button.id"
        @click.native="sendMessage(button)"
      >{{ button.text }}</v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>{{ message.content.text }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "CardResponse",
  props: {
    message: {
      chatId: String,
      text: String,
      self: Boolean,
      content: {
        title: String,
        subTitle: String,
        buttons: [],
        imageUrl: String,
        text: String
      }
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    sendMessage(button) {
      if (button.text && button.text.length > 0) {
        const newMessage = {
          chatId: this.chatId,
          type: "text",
          isInteractive: false,
          content: {
            text: button.text
          },
          self: true
        };
        this.$store.dispatch("addLocalMessage", newMessage);
        this.typedMessage = "";
      }
    },
    getMessageAlignment(isSelf) {
      if (isSelf === true) {
        return "end";
      } else {
        return "start";
      }
    },
    getMessageColor(isSelf) {
      if (isSelf === true) {
        return "#636363";
      } else {
        return "#f3f3f3";
      }
    }
  },
  computed: {
    isThisTheLastMessage() {
      return (
        this.message.index === this.$store.getters.getMessageListLength - 1
      );
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
