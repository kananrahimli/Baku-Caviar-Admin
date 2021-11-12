<template>
  <v-app-bar app elevate-on-scroll elevation="3" color="white">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-col lg="6" cols="12" class="d-flex justify-content-center">
      <!-- <v-form class="pb-4 pt-5">
        <v-text-field
          class="mt-5"
          label="Search"
            placeholder="Not working"
            filled
            rounded
            dense
        />
      </v-form> -->

      <router-link to="/home" class="d-block text-dark mx-2" >Aze</router-link>
      <router-link to="/rus/home" class="d-block text-dark mx-2">Rus</router-link>
      <router-link to="/en/home" class="d-block text-dark mx-2">Eng</router-link>
    </v-col>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
         
        </span>
      </template>
      
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span style="cursor: pointer" v-bind="attrs" v-on="on">
          <v-chip link>
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              <v-avatar size="40">
                <v-img src="../assets/avatar.jpg" />
              </v-avatar>
            </v-badge>
            <span class="ml-3">Admin</span>
          </v-chip>
        </span>
      </template>
      <v-list width="250" class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../assets/avatar.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link v-for="(menu, i) in menus" :key="i">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title  @click="logOut">
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  data() {
    return {
      menus: [
        // { title: "Profile", icon: "mdi-account" },
        // { title: "Change Password", icon: "mdi-key" },
        // { title: "Setting", icon: "mdi-cog" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      
    };
  },
   methods:{
       async logOut(){
         await this.$store.dispatch('logOut')
         await this.$router.push('/login')
        }
    }
};
</script>

<style scoped lang="scss">
  $mdi-font-path: "~@mdi/font/fonts" !default;
@import '~@mdi/font/scss/materialdesignicons';
</style>
