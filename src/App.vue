<template>
 <v-app id="inspire">
    <Sidebar :drawer="drawer" v-if="this.$store.state.isLogin && this.$store.state.showNavigation"/>
    <Topbar @drawerEvent="drawer = !drawer" v-if="this.$store.state.isLogin && this.$store.state.showNavigation" />
    <v-main >
      <v-container class="" >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
 
</template>

<script>
// import Navigation from "./components/Navigation.vue"
import firebase from 'firebase/app'
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
export default {
  data(){
    return{
      drawer: null,
    }
  },
  components:{
   
    Topbar,
    Sidebar
  },
  created(){
  this.$store.dispatch('getData');
  firebase.auth().onAuthStateChanged((user)=>{
      if(user){
         this.$store.commit('isLogged',true)
      }
    })

       if (
      this.$route.fullPath ==="/login"
    ) {
      this.$store.state.showNavigation=false
    }else{
      this.$store.state.showNavigation=true
    }
  },
  updated(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
         this.$store.commit('isLogged',true)
      }
    })
  }
}
</script>

<style lang="scss">
body{
  // overflow-x: hidden;
  background: #edf1f5;

}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a{
  color: #000;
}

ul{
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
