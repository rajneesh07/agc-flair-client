<template>
  <div class="chat-body">
    <mdb-list-group-item
      v-if="chatSessions.length===0"
      href="#"
      tag="a"
      class="my-2 px-5 chat-list-item d-flex justify-content-start z-depth-5"
    >
      <span class="h5 mx-auto grey-text">No Active Chats</span>
    </mdb-list-group-item>
    <mdb-list-group>
      <mdb-list-group-item
        v-for="chat in chatSessions"
        :key="chat.id"
        :action="true"
        href="#"
        tag="a"
        class="my-2 pr-5 chat-list-item d-flex justify-content-start z-depth-5"
        @click.native="toggleChatWindow(chat.chatId)"
      >
        <!--test-->
        <span class="chat-avatar mr-1">PR</span>
        <!-- <span class="chat-avatar mr-1">{{chat.participant.initials}}</span> -->
        <!-- <img></img> -->
        <span class="h5">{{chat.participant.firstName+''+chat.participant.lastName}}</span>
      </mdb-list-group-item>
    </mdb-list-group>
  </div>
</template>

<script>
import { mdbListGroup, mdbListGroupItem } from "mdbvue";
import { ScaleTransition } from "vue2-transitions";
export default {
  name: "ChatList",
  components: { ScaleTransition, mdbListGroup, mdbListGroupItem },

  props: {},

  data() {
    return {
      slimCollapsed: true
    };
  },
  methods: {
    toggleChatWindow(chatId) {
      console.log("toggling chat window");
      this.$store.dispatch("toggleChatWindow", chatId);
    }
  },
  computed: {
    showChatSideBar() {
      return this.$store.getters.getChatSidebarState;
    },
    chatSessions() {
      return this.$store.getters.getChatSessions;
    }
  }
};
</script>

<style scoped>
.chat-body {
  min-width: 170px;
  border-radius: 14px;
}
.chat-list {
  padding-left: 0;
}
.chat-avatar {
  border-radius: 50%;
  border: solid 1px rgba(0, 0, 0, 0.3);
  height: 40px !important;
}
.chat-list-item {
  border-radius: 28px !important;
}

.chat-list-item:hover {
  background-color: #5c6780;
  color: white;
}
.chat-list-item:hover .chat-avatar {
  border-color: rgba(255, 255, 255, 0.3);
}

.chat-list-item a:active {
  background-color: #0247e9;
}
.chat-link {
  color: white;
  font-size: 1.2em;
}
.chat-avatar {
  font-size: 1.3em;
  padding: 10px;
  height: 30px;
  margin-right: 10px;
}
@-webkit-keyframes sidebarAnim {
  0% {
    width: 220px;
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    visibility: visible;
  }
  50% {
    width: 220px;
  }
  100% {
    width: 0;
    opacity: 0;
    -webkit-transform: translateX(-220px);
    transform: translateX(-220px);
    visibility: hidden;
  }
}

@keyframes sidebarAnim {
  0% {
    width: 220px;
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    visibility: visible;
  }
  50% {
    width: 220px;
  }
  100% {
    width: 0;
    opacity: 0;
    -webkit-transform: translateX(-220px);
    transform: translateX(-220px);
    visibility: hidden;
  }
}
</style>
