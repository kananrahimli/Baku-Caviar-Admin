<template>
  <div class="about ">
    <dashboard
      :currentInputsCount="currentInputsCount" @addInputHeritage="incInput" @saveHeritage="save" @updateHeritage="update"
     >

    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Heritage',
 

  data(){
    return{
     
    }
   
  },
  computed:{
     currentInputsCount(){
      return this.$store.state.heritageDataCount
    },
  },
   methods:{
    incInput(data){
      console.log(data.dataAbout);
      this.$store.dispatch('increaseInputHeritage',data)
    },
   async save(data){
       await this.$store.dispatch('saveToDataBaseHeritage',data)
    },
      async update(data){
      await this.$store.dispatch('updateDataBaseHeritage',data)
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

