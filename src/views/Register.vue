<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Create your account</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="255"
          label="name"
          required
          append-icon="mdi-user">
        </v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="email"
          required
          append-icon="mdi-email">
        </v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="password"
          hint="At least 6 characters"
          counter
          @click:append="showPassword = !showPassword">
        </v-text-field>
        <v-checkbox
          label="Do You agree with our Privacy Policy?"
          v-model="checkbox"
          :rules="checkboxRules">
        </v-checkbox>
        <div class="text-xs-center mt-4">
          <v-btn 
            color="accent"
            :disabled="!valid"
            @click="submit">
              Register
              <v-icon right dark>mdi-account-plus</v-icon> 
          </v-btn>
          <v-btn
          @click="clear">
              <v-icon right dark>mdi-lock-reset</v-icon> 
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'register',
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 255) || 'Name must be less than 255 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'email is required',
        v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
      ],
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password required.',
        v => (v && v.length >= 6) || 'Min 6 characters',
      ],
      checkbox: false,
      checkboxRules: [
        v => !!v || 'You must agree to continue...'
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set',
      setAlert: 'alert/set'
    }),
    submit() {
      if(this.$refs.form.validate()) {
        let formData = new FormData()
        formData.set('name',this.name)
        formData.set('email', this.email)
        formData.set('password', this.password)

        this.axios.post('/register', formData)
          .then((response) => {
            let { data } = response.data
            this.setAuth(data)
            this.setAlert({
              status: true,
              color: 'success',
              text: 'register is successfully'
            })
            this.close()
          })
          .catch(() => {
              this.setAlert({
                status : true,
                text : 'The email has already been taken',
                color : 'error'
              })
          })
      }      
    },
    //clear form
    clear(){
      this.$refs.form.reset()
    },
    //close fullscrean
    close(){
      this.$emit('closed', false)
    }
  }
}
</script>