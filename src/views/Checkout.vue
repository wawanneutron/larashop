<template>
  <div>
    <v-subheader>Shipping Address</v-subheader>
      <v-card flat>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="name"
              v-model="name"
              required
              append-icon="mdi-user">
            </v-text-field>
            <v-textarea
              label="address"
              v-model="address"
              required
              auto-grow
              rows="3">
            </v-textarea>
            <v-text-field
              label="phone"
              v-model="phone"
              required
              append-icon="mdi-phone">
            </v-text-field>
            <v-select
              v-model="province_id"
              :items="provinces"
              item-text="province"
              item-value="id"
              label="province"
              persistent-hint
              single-line>
            </v-select>
            <v-select
              v-model="city_id"
              v-if="province_id > 0"
              :items="citiesByProvince"
              item-text="city_name"
              item-value="id"
              label="city"
              persistent-hint
              single-line>
            </v-select>
          </v-form>
          <v-card-actions>
            <v-btn
              color="success"
              dark
              @click="saveShipping">
              <v-icon>mdi-content-save</v-icon> 
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
  </div>
</template>

<script>
export default {
  name: 'Checkout'
}
</script>