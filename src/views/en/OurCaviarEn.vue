<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showInput="false"
      @addInputOurCaviarEn="incInput"
      @saveOurCaviarEn="save"
      @updateOurCaviarEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "OurCaviarEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.ourCaviarDataCountEn;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputOurCaviarEn", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseOurCaviarEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseOurCaviarEn", data);
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

