<template>
  <div class="home">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputHomeEn="incInput"
      @saveHomeEn="save"
      @updateHomeEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.dataCountEn;
    },
  },

  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputHomeEn", data);

      console.log(this.$store.state.dataCountEn);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseHomeEn", data);
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
