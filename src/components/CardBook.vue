<template>
  <div>
    <v-card :to="'/book/' + book.slug">
      <v-img 
        :src="getImage(book.cover)" 
        class=" white--text"
        height="320"> 
      </v-img>
      <v-card-title 
        v-text="book.title" class=" subtitle-1">
      </v-card-title>
      <v-card-actions>
        <v-icon>mdi-cash</v-icon>
        <span class="orange--text">Rp {{ book.price.toLocaleString('id-ID') }} </span>
          <v-spacer></v-spacer>
        <v-icon>mdi-eye</v-icon>{{ book.views }}
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'card-book',
  props: ['book'],
}
</script>