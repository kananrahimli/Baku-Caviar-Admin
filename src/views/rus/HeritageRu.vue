<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      @addInputHeritageRu="incInput"
      @saveHeritageRu="save"
      @updateHeritageRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HeritageRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.heritageDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      console.log(data.dataAbout);
      this.$store.dispatch("increaseInputHeritageRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseHeritageRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseHeritageRu", data);
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

