<template>
  <widget title="Quick Links">
    <template v-slot:body>
      <div class="list-group px-3">
        <a
          :href="link.href"
          class="list-group-item list-group-item-action my-2 text-black"
          target="_blank"
          v-for="(link,i) in quicklinkList"
          :key="i"
        >
          <strong>{{link.label}}</strong>
        </a>
      </div>
    </template>
  </widget>
</template>

<script>
import Widget from "@/components/agc/Widget";
export default {
  name: "QuickLinks",
  components: {
    Widget
  },
  mounted() {},
  props: {
    msg: String
  },

  data() {
    return {
      showWidget: true
      // quicklinkList: [
      //   {
      //     label: "Salesforce",
      //     href: "http://login.salesforce.com"
      //   },
      //   {
      //     label: "Finnacle",
      //     href: "http://login.salesforce.com"
      //   },
      //   {
      //     label: "Google",
      //     href: "http://google.com"
      //   }
      // ]
    };
  },

  methods: {
    toggleShowWidget() {
      this.showWidget = !this.showWidget;
    }
  },
  computed: {
    quicklinkList() {
      return this.$store.getters["session/getConfig"].QUICK_LINK_LIST;
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
