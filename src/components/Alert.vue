<template>
  <v-snackbar 
    v-model="alert"
    :color="color"
    right
    rounded="pill"
    top>
    {{ text }}
     <template v-slot:action="{ attrs }">
        <v-btn dark text @click="closeAlert" v-bind="attrs">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
     </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'alert',
  computed: {
    ...mapGetters({
      status : 'alert/status',
      color : 'alert/color',
      text : 'alert/text'
    }),
    alert: {
      get() { //get method bawaan vue js
        return this.status
      },
    }
  }, 
  methods: {
    ...mapActions({
      setAlert : 'alert/set'
    }),
    closeAlert() {
      this.setAlert({
        status : false
      })
    },
    
  }
}
</script>