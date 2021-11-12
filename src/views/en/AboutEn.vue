<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputAboutEn="incInput"
      @saveAboutEn="save"
      @updateAboutEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AboutEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.aboutDataCountEn;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputAboutEn", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseAboutEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseAboutEn", data);
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

