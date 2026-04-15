<script setup>
  import { useRoute } from "vue-router"
  import useGoods from "../../composables/useGoods"

  const route = useRoute()
  const { getGoodById } = useGoods()

  const product = getGoodById(route.params.id)
</script>

<template>
  <div class="product-section" v-if="product">
    <ul class="specs-list">
      <li><strong>Подключение:</strong> {{ product.specs.connection }}</li>
      <li><strong>Совместимость:</strong> {{ product.specs.compatibility }}</li>
      <li><strong>Гарантия:</strong> {{ product.specs.warranty }}</li>
    </ul>
  </div>
</template>
