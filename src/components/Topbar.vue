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

      <button @click="az">
        <router-link to="/admin/home" class="d-block text-dark mx-2"
          >Aze</router-link
        >
      </button>
      <button @click="ru">
        <router-link to="/admin/rus/home" class="d-block text-dark mx-2"
          >Rus</router-link
        >
      </button>

      <button @click="en">
        <router-link to="/admin/en/home" class="d-block text-dark mx-2"
          >Eng</router-link
        >
      </button>
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
          <v-list-item-title @click="logOut">
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
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      await this.$router.push("/login");
    },

    az() {
      this.$store.dispatch("changeSidebarLinks", {
        payload: [
          { item: "Ana səhifə", link: "home", icon: "fas fa-home" },
          { item: "Biz kimik", link: "about", icon: "fas fa-users" },
          { item: "İrsimiz", link: "heritage", icon: "fas fa-bookmark" },
          { item: "Bizim kürümüz", link: "our-caviar", icon: "fas fa-fish" },
          {item:'Təbiətə qayğı',link:'care-nature',icon:'fas fa-leaf'},
      {item:'Haradan almaq olar',link:'where-buy',icon:'fas fa-location-arrow'},
          { item: "Əlaqə", link: "contact", icon: "fas fa-phone" },
        ],
      });
    },
    ru() {
      this.$store.dispatch("changeSidebarLinks", {
        payload: [
          { item: "Домашняя страница", link: "home", icon: "fas fa-home" },
          { item: "О нас", link: "about", icon: "fas fa-users" },
          { item: "Наследие", link: "heritage", icon: "fas fa-bookmark" },
          { item: "Наша икра", link: "our-caviar", icon: "fas fa-fish" },
          {item:'Забота о природе',link:'care-nature',icon:'fas fa-leaf'},
      {item:'Где купить',link:'where-buy',icon:'fas fa-location-arrow'},
          { item: "Контакт", link: "contact", icon: "fas fa-phone" },
        ],
      });
    },
    en() {
      this.$store.dispatch("changeSidebarLinks", {
        payload: [
          { item: "Home Page", link: "home", icon: "fas fa-home" },
          { item: "Who we are", link: "about", icon: "fas fa-users" },
          { item: "Our heritage", link: "heritage", icon: "fas fa-bookmark" },
          { item: "Our caviar", link: "our-caviar", icon: "fas fa-fish" },
          {item:'Care to nature',link:'care-nature',icon:'fas fa-leaf'},
      {item:'Where to buy',link:'where-buy',icon:'fas fa-location-arrow'},
          { item: "Contact", link: "contact", icon: "fas fa-phone" },
        ],
      });
    },
  },
};
</script>

<style scoped lang="scss">
$mdi-font-path: "~@mdi/font/fonts" !default;
@import "~@mdi/font/scss/materialdesignicons";
</style>
