<template>
  <div>
    <v-container class="ma-0 pa-0" grid-list-lg>
      <v-subheader class="mt-3 mb-3">All Books</v-subheader>
      <v-layout wrap>
        <v-flex 
          v-for="book in books"
          :key="`Book-` + book.id" xs6 md4 lg3>
          <card-book :book="book"></card-book>
        </v-flex>
      </v-layout>
    </v-container>
    <v-pagination
      circle   
      v-model="page"
      @input="go"
      :length="lengthPage"
      :total-visible="5">
    </v-pagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    books: [],
    page: 0,
    lengthPage: 0
  }),
  /* ambil komponent book */
  components: {
    CardBook: () => import ('../components/CardBook.vue')
  },

  created() {
    this.go()
  },

  methods: {
    go() {
      let url = '/books?page=' + this.page
      console.log('all books');
      this.axios.get(url)
        .then((response) => {
          let { dataBooks } = response.data.data
          let { meta } = response.data

          this.books = dataBooks
          this.page = meta.current_page
          this.lengthPage = meta.last_page
        })
        .catch((error) => {
          let { response } = error
          console.log(response);
        })
    }
  }
}
</script>