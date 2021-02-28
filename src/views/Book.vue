<template>
  <div>
    <v-card v-if="book.slug" >
      <v-img
        :src="getImage(book.cover)"
        class=" white--text" height="500" width="100%"
        >
      </v-img>
      <v-card-title
        class="fill fill-height align-end"
        v-text="book.title">
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <tbody>
            <tr>
              <td><v-icon>mdi-account-tie</v-icon></td>
              <td>{{ book.author }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-bullhorn</v-icon></td>
              <td>{{ book.publisher }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-weight</v-icon></td>
              <td>{{ book.weight }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-format-list-bulleted</v-icon>Stock</td>
              <td v-if="book.stock == 0"> <span>stock kosong</span></td>
              <td v-else> {{ book.stock }} </td>
            </tr>
            <tr>
              <td><v-icon>mdi-eye</v-icon>Views</td>
              <td>{{ book.views }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-cash</v-icon>Price</td>
              <td class=" orange--text">Rp {{ book.price.toLocaleString('id-ID') }} ,-</td>
            </tr>
            <tr>
              <td>Categories</td>
              <td>
                <v-chip 
                  v-for="category in book.categories"
                  :key="category.id"
                  :to="'/category/' + category.slug" small>
                  {{ category.name }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div class=" mt-3">
           <h3>Description</h3>
           <p> {{ book.description }} </p>
        </div>
      </v-card-text>
      <!-- btn cte buy product-->
      <v-card-actions>
        <v-btn block color="success"
         @click="buy"
         :disabled="book.stock == 0">
          <v-icon>mdi-cart-plus</v-icon>
          &nbsp;
          Buy
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    book: {}
  }),

  created() {
    let { slug } = this.$route.params
    let url = '/book/slug/' + slug
    url = encodeURI(url)
    this.axios.get(url)
      .then((response) => {
        let { data } = response.data
        let book = data
        this.book = book
      })
      .catch((error) => {
        let { responses } = error
        console.log(responses);
      })
  },
  methods: {
    // maping
    ...mapActions({
      addCart: 'cart/add',
      setAlert : 'alert/set'
    }),
    // ketika tombol buy diklik
    buy(){
      this.addCart(this.book)
      this.setAlert({
        status : true,
        color : 'deep-purple',
        text : 'Added to cart',
      })
    }
  }

}
</script>