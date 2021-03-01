<template>
  <v-card :to="'/category/' + category.slug">
    <v-img 
      :src="getImage(category.image)" 
      width="130" height="130"
      >
    </v-img>
    <v-card-title 
      class="subtitle-1"
      v-text="category.name">
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'category',
  props: ['category']
}
</script>