<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputAbout="incInput"
      @saveAbout="save"
      @updateAbout="update"
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
      return this.$store.state.aboutDataCount;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputAbout", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseAbout", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseAbout", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  height: 100vh;
}

// input{
//   background: #000;
// }
</style>

