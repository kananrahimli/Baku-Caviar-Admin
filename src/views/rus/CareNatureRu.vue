<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showInput="true"
      @addInputCareNatureRu="incInput"
      @saveCareNatureRu="save"
      @updateCareNatureRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CareNatureRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.careNatureDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputCareNatureRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseCareNatureRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseCareNatureRu", data);
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

