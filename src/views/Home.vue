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
          :key="`category` + category.id" xs6>
          <v-card :to="'/category/' + category.slug" class=" blue-grey">
            <v-img 
              :src="getImage(category.image)" 
              class=" blue--text" width="130" height="130"
              >
              <v-card-title 
                class=" fill-height align-end white--text"
                v-text="category.name">
              </v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- template book -->
    <v-container class=" ma-0 pa-0 mt-3" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/books" class=" blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap class="mt-3">
        <v-flex 
          v-for="book in books" 
          :key="`book-` + book.id" xs6>
          <v-card :to="'/books/' + book.slug">
            <v-img :src="getImage(book.cover)" class=" white--text"> 
              <v-card-title 
                class=" fill-height align-end"
                v-text="book.title">
              </v-card-title>
            </v-img>
          </v-card>
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
  created() {
    console.log('get data categories');
    this.axios.get('/categories/2')
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
