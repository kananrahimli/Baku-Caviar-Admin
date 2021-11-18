<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="true"
      :showInput="true"
      @addInputWhereBuy="incInput"
      @saveWhereBuy="save"
      @updateWhereBuy="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "WhereBuy",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.whereBuyDataCount;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputWhereBuy", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseWhereBuy", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseWhereBuy", data);
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

