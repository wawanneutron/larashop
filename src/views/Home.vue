<template>
  <div>
    <!--tamplate kategories  -->
    <v-container class="ma-0 pa-0" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/categories" class=" blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap class=" mt-3">
        <v-flex
          v-for="category in categories"
          :key="`category` + category.id" xs6 md4 lg3>
          <CardCategory :category="category"></CardCategory>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- template book -->
    <v-container class=" ma-0 pa-0 mt-3" grid-list-lg>
      <div class="text-right">
        <v-btn small text to="/books" class=" blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap class="mt-3">
        <v-flex 
          v-for="book in books" 
          :key="`book-` + book.id" xs6 lg3 md4>
          <card-book :book="book"></card-book>
        </v-flex>
      </v-layout>
    </v-container>
  </div>  
</template>

<script>
export default {
  data: () => ({
    categories: [],
    books:[],
  }),
  /* panggil component */
  components: {
    CardCategory: () => import('@/components/CardCategory.vue'),
    CardBook: () => import('@/components/CardBook.vue')
  },

  created() {
    console.log('get data categories');
    this.axios.get('/categories/4')
      .then((response) => {
        let { data } = response.data
        this.categories = data 
      })
      .catch((error) => {
        let { response } = error
        console.log(response);
      })

    console.log('get data books');
    this.axios.get('books/top-books/4')
      .then((response) => {
        let { dataBooks } = response.data.data
        this.books = dataBooks
      })
      .catch((error) => {
        let { response } = error
        console.log(response);
      })
  },
  
}
</script>
