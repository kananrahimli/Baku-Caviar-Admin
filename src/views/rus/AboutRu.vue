<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputAboutRu="incInput"
      @saveAboutRu="save"
      @updateAboutRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AboutRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.aboutDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputAboutRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseAboutRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseAboutRu", data);
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

