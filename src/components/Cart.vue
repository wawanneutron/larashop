<template>
  <v-card>
    <v-toolbar dark color="pink">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Your Shopping Cart</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <div v-if="countCart == 0">
        <v-alert
          outlined
          color="warning"
          icon="mdi-cart-off">
          Keranjang belanja kosong
        </v-alert>
      </div>
      <v-list three-line v-if="countCart > 0">
        <template v-for="cart of carts">
          <v-list-item :key="'cart-' + cart.id">
            <v-list-item-avatar>
              <v-img :src="getImage(cart.cover)"></v-img>
            </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="cart.title"></v-list-item-title>
                <v-list-item-subtitle>
                  Rp. {{ cart.price.toLocaleString('id-ID') }}.00,- 
                  ({{ cart.weight }} kg)
                  <span style="float:right">
                    <v-btn color="red" icon small rounded depressed
                      @click.stop="removeCart(cart)">
                      <v-icon>mdi-minus-circle</v-icon>
                    </v-btn>
                    {{ cart.quantity }}
                    <v-btn color="success" icon small rounded depressed
                      @click.stop="addCart(cart)">
                      <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-card>
        <v-card-text>
          <v-layout wrap>
            <v-flex pa-1 xs6>
              Total Price ({{ totalQuantity }} items) <br>
              <span class="title">Rp. {{ totalPrice.toLocaleString('id-ID') }}.00,- </span>
            </v-flex>
            <v-flex pa-1 xs6 text-right>
              <v-btn color="yellow" @click="checkout" :disabled="totalQuantity == 0">
                <v-icon>mdi-cart-arrow-right</v-icon> &nbsp; Checkout
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'cart',
  computed: {
    ...mapGetters({
      carts         : 'cart/carts',
      countCart     : 'cart/countCarts',
      totalPrice    : 'cart/totalPrice',
      totalQuantity : 'cart/totalQuantity',
      totalWeight   : 'cart/totalWeight'
    })
  },
  methods: {
    ...mapActions({
      setAlert    : 'alert/set',
      addCart     : 'cart/addCart',
      removeCart  : 'cart/removeCart',
      setCart     : 'cart/set'
    }),
    checkout() {
      this.close()
      this.$router.push({path: '/checkout'})
    },
    close() {
      this.$emit('closed', false)
    }
  }
}

</script>