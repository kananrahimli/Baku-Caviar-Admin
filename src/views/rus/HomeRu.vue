<template>
  <div class="home">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputHomeRu="incInput"
      @saveHomeRu="save"
      @updateHomeRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.dataCountRu;
    },
  },

  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputHomeRu", data);
      console.log(this.$store.state.dataCountRu);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseHomeRu", data);
    },
  },
  created() {
    if (this.$route.fullPath === "/login") {
      this.$store.state.showNavigation = false;
    } else {
      this.$store.state.showNavigation = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}

// input{
//   background: #000;
// }
</style>
