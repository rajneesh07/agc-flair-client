<template>
  <section class="agc-chat-drawer d-flex flex-row-reverse justify-content-bottom">
    <div v-for="chat in chatSessions" :key="chat.chatId">
      <scale-transition origin="bottom right">
        <chat-window v-if="chat.show" :width="320" :height="400" :chatId="chat.chatId"></chat-window>
      </scale-transition>
    </div>
  </section>
</template>

<style></style>

<script>
// import _ from "lodash.debounce";
import ChatWindow from "@/widgets/Chat/ChatWindow/ChatWindow.vue";
import { ScaleTransition } from "vue2-transitions";
export default {
  name: "ChatDrawer",
  components: { ChatWindow, ScaleTransition },

  props: {},

  data() {
    return {};
  },
  methods: {},
  computed: {
    chatSessions() {
      return this.$store.getters.getChatSessions;
    }
  },
  watch: {}
};
</script>
<style scoped>
.agc-chat-drawer {
  /* position: absolute; */
  position: absolute;
  bottom: 0;
  right: 100px;
}
</style>
