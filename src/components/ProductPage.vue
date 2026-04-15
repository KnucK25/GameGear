<script setup>
  import { useRoute } from "vue-router"
  import useGoods from "../composables/useGoods"
  import useCart from "../composables/useCart"
  import useUsers from "../composables/useUsers"
  import { computed } from "vue"
  import { router } from "../router";

  const route = useRoute()
  const { getGoodById } = useGoods()
  const users = useUsers()
  const { addToCart } = useCart()

  const product = computed(() => {
    return getGoodById(route.params.id)
  })

  function handleAdd(product) {
    if (!users.currentUser.value) {
      router.push({ name: "Login" })
      return
    }
    addToCart(product, users.currentUser.value.login)
  }
</script>

<template>
  <section v-if="product" class="product-page">
    <div class="container product-page__inner">

      <div class="product-page__image">
        <img :src="product.image || '/img/placeholder.jpg'"  alt="IMG" />
      </div>

      <div class="product-page__info">
        <h1>{{ product.name }}</h1>

        <p class="price">
          {{ product.price.toLocaleString() }} ₽
        </p>

        <button class="btn btn--large" @click.prevent="handleAdd(product)">
          В корзину
        </button>

        <!-- Навигация по разделам -->
        <div class="product-tabs">
          <router-link :to="{ name: 'ProductDescription', params: { id: product.id } }"
                       class="tab">
            Описание
          </router-link>

          <router-link :to="{ name: 'ProductSpecs', params: { id: product.id } }"
                       class="tab">
            Характеристики
          </router-link>
        </div>

        <!-- Дочерний маршрут -->
        <router-view :product="product" />

      </div>

    </div>
  </section>

  <section v-else class="container">
    <h2>Товар не найден</h2>
  </section>
</template>
