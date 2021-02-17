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
          <v-card :to="'/category/' + category.slug">
            <v-img 
              :src="category.image" 
              class=" white--text"
              >
              <v-card-title 
                class=" fill-height align-end"
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
          :key="`book-` + book.id">
          <v-card :to="'/books/' + book.slug">
            <v-img :src="book.cover" class=" white--text">
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
    categories: [
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'Ekonomi',
        slug: 'ekonomi'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/150',
        name: 'Agama',
        slug: 'agama' 
      },
      
    ],
     books: [
      {
        id: 1,
        cover: 'https://via.placeholder.com/150',
        title: 'Laravel 7',
        slug: 'laravel-7'

      },
      {
        id: 2,
        cover: 'https://via.placeholder.com/150',
        title: 'Vue 2.6',
        slug: 'vue-2-6'

      },
      {
        id: 3,
        cover: 'https://via.placeholder.com/150',
        title: 'PHP 7.4',
        slug: 'php-7-4'

      },
      {
        id: 4,
        cover: 'https://via.placeholder.com/150',
        title: 'NodeJS 12',
        slug: 'nodejs-12'
      }
      
    ]
  })
}
</script>
