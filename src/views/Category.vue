<template>
  <div>
    <v-card :to="'/category/' + category.slug"  v-if="category.slug">
      <v-img 
        :src="getImage(category.image)">
        <v-card-title 
          class="fill-height align-end blue--text"
          v-text="category.name">
        </v-card-title>
      </v-img>
    </v-card>
    <v-container class=" ma-0 pa-0" grid-list-lg v-if="books">
      <v-subheader>All Books</v-subheader>
      <v-layout wrap>
        <v-flex 
          v-for="book in books"
          :key="`book-` + book.id" xs6 md4 lg3>
          <card-book :book="book"></card-book>
        </v-flex>
      </v-layout>
    </v-container>
    <template>
      <div class="text-center">
        <v-pagination 
          v-model="page"
          @input="go"
          :length="lengthPage"
          :total-visible="4">
        </v-pagination>
      </div>
    </template>
  </div> 
</template>

<script>
export default {
  data: () => ({
    category: {}, //object category
    books: [], //array books
    page: 0,
    lengthPage: 0
  }),

  components: {
    CardBook: () => import ('../components/CardBook.vue')
  },
  
  created() {
    this.go()
  },

  methods: {
    go() {
      let { slug } = this.$route.params
      let url = '/categories/slug/' + slug
      url = url + '?page=' + this.page
      url = encodeURI(url)

      this.axios.get(url)
        .then((respons) => {
          let { data } = respons.data
          let category = data
          this.category = category
          this.books = category.books.data
          this.page = category.books.current_page
          this.lengthPage = category.books.last_page
        })
        .catch((error) => {
          let { responses } = error
          console.log(responses);
        })
    }
  }
}
</script>