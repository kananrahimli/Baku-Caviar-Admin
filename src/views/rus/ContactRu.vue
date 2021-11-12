<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount"
      :showWithProps="false"
      :showSelectFile="false"
      :showSeePicture="false"
      @addInputContactRu="incInput"
      @saveContactRu="save"
      @updateContactRu="update"
    >
    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ContactRu",

  data() {
    return {};
  },
  computed: {
    currentInputsCount() {
      return this.$store.state.contactDataCountRu;
    },
  },
  methods: {
    incInput(data) {
      this.$store.dispatch("increaseInputContactRu", data);
    },
    async save(data) {
      await this.$store.dispatch("saveToDataBaseContactRu", data);
    },
    async update(data) {
      await this.$store.dispatch("updateDataBaseContactRu", data);
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

