<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-text-field
        hide-details="mdi-microphone"
        flat
        :autofocus="true"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        v-model="keyword"
        @input="doSearch">
      </v-text-field>
    </v-toolbar>
    <v-card-text>
      <v-subheader v-if="keyword.length > 0">
        Result search "{{ keyword }}"
      </v-subheader>
      <!-- alert jika buku tidak titemukan -->
      <v-alert 
        :value="books.length == 0 && keyword.length > 0"
        color="warning">
        Sorry, but no result were found.
      </v-alert>
      <!-- hasil pencarian disini -->
      <v-container class=" ma-0 pa-0" grid-list-lg>
        <v-layout wrap>
          <v-flex 
            v-for="book of books"
            :key="`book-` + book.id"
            class=" mt-5"
            xs6 md4 lg3>
            <card-book :book="book"></card-book>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'search',
  components: {
    CardBook: () => import('@/components/CardBook.vue')
  },
  data () {
    return {
      keyword: '',
      books: []
    }
  },
  methods: {
    doSearch(){
      let keyword = this.keyword
      if (keyword.length > 0) {
        this.axios.get('/books/search/' + keyword)
          .then((response) => {
            let { dataBooks } = response.data.data
            this.books = dataBooks
          })
          .catch((responses) => {
            let { error } = responses.error
            console.log(error);
          })
      }else {
        this.books = []
      }
    },
    close(){
      this.$emit('closed', false)
    }
  }
}
</script>