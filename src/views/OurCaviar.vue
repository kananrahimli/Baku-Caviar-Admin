<template>
  <div class="about">
    <dashboard
      :currentInputsCount="currentInputsCount" :showWithProps="false" :showInput="false" @addInputOurCaviar="incInput" @saveOurCaviar="save" @updateOurCaviar="update"
     >

    </dashboard>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'OurCaviar',
 

  data(){
    return{
     
    }
   
  },
  computed:{
     currentInputsCount(){
      return this.$store.state.ourCaviarDataCount
    },
  },
   methods:{
    incInput(data){
      this.$store.dispatch('increaseInputOurCaviar',data)
    },
   async save(data){
       await this.$store.dispatch('saveToDataBaseOurCaviar',data)
    },
      async update(data){
      await this.$store.dispatch('updateDataBaseOurCaviar',data)
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

