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
        @click="setDialogComponent('Search')"
        >
        </v-text-field>
        
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title to="/home">{{  appName  }}</v-toolbar-title>
        <!-- v-spacer pembatas -->
        <v-spacer></v-spacer>
      <v-btn icon 
        @click.native="setDialogComponent('Cart')" >
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
        overlap
        @click.native="setDialogComponent('Cart')"
        >
        <v-icon >mdi-cart</v-icon>
      </v-badge>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">      
      <v-list-item >
        <v-list-item-avatar>
          <v-img :src="getImage(user.avatar)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>  {{  user.name }} </v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>
      <div class=" pa-2" v-if="guest">
        <v-btn block color="primary" class=" mb-2"
          @click="setDialogComponent('Login')">
            <v-icon left>mdi-lock</v-icon>
            Login
        </v-btn>
        <v-btn block color="success" class=" mb-4"
          @click="setDialogComponent('Register')">
            <v-icon left>mdi-account</v-icon>
            Register
        </v-btn>
      </div>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn 
            v-if="!guest"
            block color="red" 
            dark
            @click="logout">
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
      <!-- 
        v-dialog adalah dynemic component,
        walaupun pembungkusnya satu tapi isinya bisa dinamis
       -->
      <keep-alive>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition">
           <!--@closed kita menggunakan component artinya tutup fullscrean -->
          <component :is="currentComponent" @closed="setDialogStatus"></component>
        </v-dialog>
      </keep-alive>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    //import compoennt denggan teknik lazyload
    Alert: () => import('@/components/Alert.vue'),
    Search : () => import('@/components/Search.vue'),
    Login : () => import('@/views/Login.vue'),
    Register : () => import('@/views/Register.vue'),
    Cart: () => import('@/components/Cart.vue')
  },
  data: () => ({
    drawer: false, //togler btn
    menus: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'About', icon: 'mdi-account', route: '/about' },
    ],
  }),
  methods: {
    ...mapActions({
      setDialogStatus: 'dialog/setStatus',
      setDialogComponent: 'dialog/setComponent',
      setAuth: 'auth/set',
      setAlert: 'alert/set'
    }),
    /* function logout */
    logout() {
      let tokenLogout = {
        headers: {
          'Authorization' : 'Bearer ' + this.user.api_token
        }
      }
      /* response API logout */
      this.axios.post('/logout', {}, tokenLogout)
        .then(() => {
          this.setAuth({}) //kosongkan auth ketika logout
          this.setAlert({
            status: true,
            color: 'orange',
            text: 'logout successfully'
          })
          this.drawer = false
        })
        .catch((error) => {
          let { data } = error.response
          this.setAlert({
            status: true,
            color: 'error',
            text: data.message
          })
        })
    },
  },
  computed: {
    //menampilkan dihalaman home saja
    isHome() { 
      return (this.$route.path === '/')
    },
    ...mapGetters({
      countCart : 'cart/countCarts', //menampilkan jumlh cart
      guest : 'auth/guest',
      user : 'auth/user',
      dialogStatus : 'dialog/status',
      currentComponent : 'dialog/component'
    }),
    dialog: {
      get() {
        return this.dialogStatus
      },
      set (value) {
        this.setDialogComponent(value)
      }
    }
  },
};
</script>
