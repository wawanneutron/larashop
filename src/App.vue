<template>
  <v-app>
    <!-- menampilkan di halaman home saja dengan methos isHome -->
    <v-app-bar
      app
      color="primary"
      dark
      v-if="isHome"
    >
      <!--form pencarian -->
      <v-text-field 
        slot="extension"
        hide-details
        append-icon="mdi-microphone"
        flat
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        @click="dialog = true"
        >
        </v-text-field>
        
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title to="/home">{{  appName  }}</v-toolbar-title>
        <!-- v-spacer pembatas -->
        <v-spacer></v-spacer>
      <v-btn icon to="/about" >
        <v-badge
          color="pink"
          :content="countCart"
          :value="countCart"
          overlap>
        <v-icon >mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <!-- jika halaman bukan home tampilan panah back -->
    <v-app-bar 
      app
      color="success"
      dark
      v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-badge 
        color="pink"
        :content="countCart"
        :value="countCart"
        overlap>
        <v-icon >mdi-cart</v-icon>
      </v-badge>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">      
      <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Wawan Setiawan</v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>
      <div class=" pa-2" v-if="guest">
        <v-btn block color="primary" class=" mb-2">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn block color="success" class=" mb-4">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>
      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark>
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
        
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menus" 
          :key="`menu-` + index"
          :to="item.route"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- alert notification -->
      <alert></alert>
      <!-- search fullscrean -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="scale-transition">
          <search @closed="closeDialog"></search>
      </v-dialog>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Alert: () => import('@/components/Alert.vue'),
    Search : () => import('@/components/Search.vue')
  },
  data: () => ({
    drawer: false,
    guest: false,
    dialog: false,

    menus: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'About', icon: 'mdi-account', route: '/about' },
    ],
  }),
  computed: {
    //menampilkan dihalaman home saja
    isHome() { 
      return (this.$route.path === '/')
    },
    // menampilkan data pada cart
    ...mapGetters({
      countCart : 'cart/count'
    })
  },
  methods:{
    closeDialog(value){
      this.dialog = value      
    }
  }
};
</script>
