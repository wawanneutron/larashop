<template>
  <div>
    <v-container class="ma-0 pa-0" grid-list-md>
      <v-subheader class=" mt-3 mb-3">All Category</v-subheader>
      <v-layout wrap>
        <v-flex 
          v-for="(category) in categories"
          :key="`category` + category.id" xs6 md4 lg3>
          <card-category :category="category"></card-category>
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
      categories: [],
      page: 0,
      lengthPage: 0
    }),

    components: {
      CardCategory: () => import ('../components/CardCategory.vue')
    },

    created() {
      this.go()
    },
    methods: {
      go() {
        let url = '/categories?page=' + this.page
        this.axios.get(url)
        .then((response) => {
          let { data } = response.data
          let { meta } = response.data
          this.categories = data
          this.page = meta.current_page
          this.lengthPage = meta.last_page
        })
        .catch((error) => {
          let { response } = error
          console.log(response);
        })
      }
    },
    
}
</script>