<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showSelectFile="false"
      :showSeePicture="false"
      @addInputContact="incInput"
      @saveContact="save"
      @updateContact="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.contactDataCount;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputContact", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseContact", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseContact", data);
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

