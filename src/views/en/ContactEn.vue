<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showSelectFile="false"
      :showSeePicture="false"
      @addInputContactEn="incInput"
      @saveContactEn="save"
      @updateContactEn="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ContactEn",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.contactDataCountEn;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputContactEn", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseContactEn", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseContactEn", data);
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

