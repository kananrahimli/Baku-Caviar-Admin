<template>
<div>
  <div v-for="count in currentInputsCount" :key="count" class="list-item">
    <post-preview
      v-if="showPostPreview && currentPictureId.id == count.id"
      @closeModal="showPostPreview = false"
    >
      <img class="" :src="count.photo || photoUrl" alt="" />
    </post-preview>
    <div class="row justify-content-between" :id="count.id">
      <div class="banner-title col-md-4 "  v-if="showInput">
        <textarea
          name=""
          id=""
          v-model="count.title"
          cols="30"
          class="w-100 form-control mb-3"
          rows="0"
        ></textarea>
      </div>

      <div class="banner-img col-md-4 py-auto d-flex justify-content-center  " v-if="showSelectFile">
        <!-- <label v-model="count.id"  @click="clickInput" >Sekil sec</label> -->
        <div >
          <input
            type="file"
            name="select"
            :id="count.id"
            @change="selectFile"
          />
          <p class="mt-2">Cari Şəkil {{ count.imgName || "Yoxdur" }}</p>
        </div>

        <!-- <p>Sekil.jpg</p> -->
      </div>

      <div
        class="
          banner-actions
          col-md-4
          d-flex
          justify-content-md-end justify-content-start
          align-self-baseline
        "
      >
        <button
          class="px-3 py-2 btn btn-info"
          :disabled="!count.imgName && !photoUrl"
          @click="showPicture"
          v-if="showSeePicture"
        >
          See Photo <i class="far fa-eye"></i>
        </button>
        
          <i class="fas fa-edit px-2 mx-1 btn btn-warning pt-2"  @click="update"></i>
        
        
          <i class="fas fa-trash-alt px-2 mx-1 btn btn-danger pt-2"  @click="deleteInput"></i>
       
        
          <i class="fas fa-save px-2 mx-1 btn btn-success pt-2" @click="save"></i>
        
      </div>
    </div>
  </div>
  <button
    @click="addInput"
    v-if="showAddButton && showWithProps"
    class="px-3 my-2 btn btn-success"
  >
    <i class="fas fa-plus"></i>
  </button>
</div>
  
</template>

<script>
import PostPreview from "../views/PostPreview.vue";
export default {
  components: {
    PostPreview,
  },
  props:{
    currentInputsCount:{
      type:Object,
      required:true

    },
    showInput:{
      type:Boolean,
      default:true
    },
    showWithProps:{
      type:Boolean,
      default:true
    },
    showSelectFile:{
      type:Boolean,
      default:true
    },
    showSeePicture:{
      type:Boolean,
      default:true
    }

    
  },
  emits: [
    "addInputHome",
    "addInputAbout",
    "saveHome",
    "saveAbout",
    "updateHome",
    "updateAbout",
    "addInputHeritage",
    "saveHeritage",
    "updateHeritage",
    "addInputOurCaviar",
    "saveOurCaviar",
    "updateOurCaviar",
    "addInputContact",
    "saveContact",
    "updateContact",
  ],
  data() {
    return {
      image: null,
      imageUrl: null,
      showPostPreview: false,
      currentPictureId: null,
      showAddButton: true,
      savedInput:null
    };
  },
  computed: {
    photoUrl() {
      return this.$store.state.photoUrl;
    },

    photoName() {
      return this.$store.state.photoName;
    },
  },

  async created() {
    await this.$store.dispatch("getData");
  },

  methods: {
    addInput() {
      this.showAddButton = false;
      this.$emit("addInputHome", {
        id: this.$store.state.dataCount.length,
        title: "",
      });
      this.$emit("addInputAbout", {
        id: this.$store.state.aboutDataCount.length,
        title: "",
      });
      this.$emit("addInputHeritage", {
        id: this.$store.state.heritageDataCount.length,
        title: "",
      });
      this.$emit("addInputOurCaviar", {
        id: this.$store.state.ourCaviarDataCount.length,
        title: "",
      });
      this.$emit("addInputContact", {
        id: this.$store.state.contactDataCount.length,
        title: "",
      });
      //
    },

    async deleteInput(e) {
      console.log(this.$store.state.dataCount);
      await this.$store.dispatch("deleteInput", {
        id: e.target.parentElement.parentElement.id,
      });
      this.showAddButton = await true;
    },

    selectFile(e) {
      const fileReader = new FileReader();
      const files = e.target.files;
      fileReader.onloadend = () => {
        this.imageUrl = fileReader.result;
      };
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      setTimeout(() => {
        const fileName = files[0].name;
        this.$store.commit("setPhotoUrlandName", {
          fileName: fileName,
          url: this.imageUrl,
        });
      }, 1000);

    },

    showPicture(e) {
      this.showPostPreview = true;
      this.currentPictureId = this.currentInputsCount.find(
        (item) => item.id == e.target.parentElement.parentElement.id
      );

    },

    save(e) {
      let savedInput = this.currentInputsCount.find(
        (item) => item.id == e.target.parentElement.parentElement.id
      );

      this.$emit("saveHome", {
        title: savedInput.title,
        id: savedInput.id,
        img: this.image,
        imgName: this.photoName,
      });
      this.$emit("saveAbout", {
        title: savedInput.title,
        id: savedInput.id,
        img: this.image,
        imgName: this.photoName,
      });
      this.$emit("saveHeritage", {
        title: savedInput.title,
        id: savedInput.id,
        img: this.image,
        imgName: this.photoName,
      });
      this.$emit("saveOurCaviar", {
        title: savedInput.title,
        id: savedInput.id,
        img: this.image,
        imgName: this.photoName,
      });
      this.$emit("saveContact", {
        title: savedInput.title,
        id: savedInput.id,
      });
      this.showAddButton = true;
    },

    async update(e) {
      console.log(this.photoName);
      let imgName;
      this.savedInput = await this.currentInputsCount.find(
        (item) => item.id == e.target.parentElement.parentElement.id
      );
      if (this.photoName) {
        imgName = await this.photoName;
      } else {
        imgName = await this.savedInput.imgName;
      }

      await this.$emit("updateHome", {
        title: this.savedInput.title,
        id: this.savedInput.id,
        img: this.image,
        imgName: imgName,
      });
      await this.$emit("updateAbout", {
        title: this.savedInput.title,
        id: this.savedInput.id,
        img: this.image,
        imgName: imgName,
      });
      await this.$emit("updateHeritage", {
        title: this.savedInput.title,
        id: this.savedInput.id,
        img: this.image,
        imgName: imgName,
      });
      await this.$emit("updateOurCaviar", {
        title: this.savedInput.title,
        id: this.savedInput.id,
        img: this.image,
        imgName: imgName,
      });
        await this.$emit("updateContact", {
        title: this.savedInput.title,
        id: this.savedInput.id,
      });
      this.showAddButton = true;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

label {
  cursor: pointer;
  background: #000;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: #fff;
}

.list-item {
  background: #ffffff;
  margin: 2rem 0;
  // display: flex;
  padding: 1rem 1rem 0;
  border-radius: 10px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>