<template>
  <div id="navbar" class="navigation py-5" >
      <h5 class="navbar-title text-center font-weight-bold">Baku Caviar <br> <br> Admin Dashboard</h5>
      <ul class="navbar-list">
          <li class="navbar-list__item p-4" v-for="(item,index) in navItems" :key="index" ><i :class="item.icon"></i>&nbsp; &nbsp;<router-link class="navbar-list__link" :to="item.link" >{{item.item}}</router-link></li>
      </ul>

     <p class="log-out" @click="logOut">Log Out &nbsp; <i class="fas fa-sign-out-alt"></i></p>
  </div>
</template>

<script>
export default {
    data(){
        return{
            navItems:[
                {item:'Ana-sehife',link:'home',icon:'fas fa-home'},
                {item:'Biz kimik',link:'about',icon:'fas fa-users'},
                {item:'İrsimiz',link:'heritage',icon:'fas fa-bookmark'},
                {item:'Bizim Kürümüz',link:'our-caviar',icon:'fas fa-fish'},
                {item:'Əlaqə',link:'contact',icon:'fas fa-phone'}
            ]
        }
    },

    methods:{
       async logOut(){
         await this.$store.dispatch('logOut')
         await this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
    .navigation{
        height: 97vh;
        background: #ffffff;
        margin: 10px;
        border-radius: 10px;
        position: fixed;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
        @media screen and (max-width:768px) {
            position: relative;
        }
        .navbar-list{
           
           &__item{
               
           }
        }

        .log-out{
            position: absolute;
            bottom: 0;
            left: 50%;
            cursor: pointer;
        }
    }
</style>