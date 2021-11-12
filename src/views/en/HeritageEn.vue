<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount" @addInputHeritageEn="incInput" @saveHeritageEn="save" @updateHeritageEn="update"
     >

    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HeritageEn',
 

  data(){
    return{
     
    }
   
  },
  computed:{
     currentInputsCount(){
      return this.$store.state.heritageDataCountEn
    },
  },
   methods:{
    incInput(data){
      console.log(data.dataAbout);
      this.$store.dispatch('increaseInputHeritageEn',data)
    },
   async save(data){
       await this.$store.dispatch('saveToDataBaseHeritageEn',data)
    },
      async update(data){
      await this.$store.dispatch('updateDataBaseHeritageEn',data)
    }
  }
 
}
</script>

<style lang="scss" scoped>
.about{
  
  height: 100vh;
}

// input{
//   background: #000;
// }


</style>

