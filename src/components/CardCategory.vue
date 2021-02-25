<template>
  <di>
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
  </di>
</template>

<script>
export default {
  name: 'card-category',
  props: ['category']
}
</script>