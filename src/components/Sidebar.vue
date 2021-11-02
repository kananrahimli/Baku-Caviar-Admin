<template>
  <v-navigation-drawer v-model="drawer" app>

    <v-img
    class="mx-auto my-5"
       width="50%"
      position="center center"
      src="../assets/logotype.png" 
      aspect-ratio="2"
    >
      
    </v-img>
    <v-list>
      <v-list-item v-for="(item,index) in navItems" :key="index" link class="pl-8 mt-6">
        
          <i :class="item.icon"></i>
          &nbsp; &nbsp;

        <v-list-item-content>
          <v-list-item-title><router-link class="navbar-list__link text-dark font-weight-bold" :to="item.link" >{{item.item}}</router-link></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      navItems:[
                {item:'Ana-sehife',link:'home',icon:'fas fa-home'},
                {item:'Biz kimik',link:'about',icon:'fas fa-users'},
                {item:'İrsimiz',link:'heritage',icon:'fas fa-bookmark'},
                {item:'Bizim Kürümüz',link:'our-caviar',icon:'fas fa-fish'},
                {item:'Əlaqə',link:'contact',icon:'fas fa-phone'}
            ]
    };
  },
};
</script>

<style scoped></style>
