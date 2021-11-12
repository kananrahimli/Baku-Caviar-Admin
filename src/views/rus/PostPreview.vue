<template>
  <div>
      <image-modal :show="true" @close="closeModal">
          <slot></slot>
      </image-modal>
  </div>
</template>

<script>
import ImageModal from '../components/ImageModal.vue'
export default {
    emits:['closeModal'],
    components:{
        ImageModal
    },
    methods:{
        closeModal(){
             this.$emit('closeModal')
        }
       
    }
    
}
</script>

<style lang="scss" scoped>

</style>