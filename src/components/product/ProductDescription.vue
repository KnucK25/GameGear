<script setup>
  import { useRoute } from "vue-router"
  import useGoods from "../../composables/useGoods"

  const route = useRoute()
  const { getGoodById } = useGoods()

  const product = getGoodById(route.params.id)
</script>

<template>
  <div class="product-section" v-if="product">
    <p>{{ product.description }}</p>
  </div>
</template>
