<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="true"
      :showInput="true"
      @addInputWhereBuyRu="incInput"
      @saveWhereBuyRu="save"
      @updateWhereBuyRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "WhereBuyRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.whereBuyDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputWhereBuyRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseWhereBuyRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseWhereBuyRu", data);
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

