<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
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
        >
        </v-text-field>
        
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Vueshop</v-toolbar-title>
        <!-- v-spacer pembatas -->
        <v-spacer></v-spacer>
      <v-btn icon>
        <v-badge color="orange" overlap>
          <template v-slot:badge>
            <span>3</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
