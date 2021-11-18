<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showInput="true"
      @addInputCareNatureEn="incInput"
      @saveCareNatureEn="save"
      @updateCareNatureEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CareNatureEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.careNatureDataCountEn;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputCareNatureEn", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseCareNatureEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseCareNatureEn", data);
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

