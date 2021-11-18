<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showInput="true"
      @addInputCareNature="incInput"
      @saveCareNature="save"
      @updateCareNature="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CareNature",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.careNatureDataCount;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputCareNature", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseCareNature", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseCareNature", data);
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

