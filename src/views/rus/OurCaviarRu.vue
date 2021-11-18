<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showInput="true"
      @addInputOurCaviarRu="incInput"
      @saveOurCaviarRu="save"
      @updateOurCaviarRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "OurCaviarRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.ourCaviarDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputOurCaviarRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseOurCaviarRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseOurCaviarRu", data);
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

