<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="true"
      :showInput="true"
      @addInputWhereBuyEn="incInput"
      @saveWhereBuyEn="save"
      @updateWhereBuyEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "WhereBuyEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.whereBuyDataCountEn;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputWhereBuyEn", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseWhereBuyEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseWhereBuyEn", data);
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

