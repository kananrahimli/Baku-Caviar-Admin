<template>
  <div class="home">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputHome="incInput"
      @saveHome="save"
      @updateHome="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.dataCount;
    },
  },

  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputHome", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBase", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseHome", data);
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
