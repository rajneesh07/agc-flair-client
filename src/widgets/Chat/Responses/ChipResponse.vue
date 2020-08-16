<template>
  <v-chip-group active-class="primary--text" class="mx-0" show-arrows>
    <v-chip
      v-for="chip in message.content.suggestionChips"
      :key="chip.id"
      class="mx-2"
      @click.native="sendMessage(chip)"
    >
      <v-avatar left>
        <v-icon>mdi-{{chip.icon}}</v-icon>
      </v-avatar>
      {{ chip.label }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: "ChipResponse",
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
    sendMessage(chip) {
      if (chip.postBack && chip.postBack.length > 0) {
        const newMessage = {
          chatId: this.chatId,
          type: "text",
          isInteractive: false,
          content: {
            text: chip.postBack
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
  }
};
</script>
