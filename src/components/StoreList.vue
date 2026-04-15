<script setup>
  import useGoods from "../composables/useGoods"
  import useCart from "../composables/useCart"
  import useUsers from "../composables/useUsers"
  import { computed, watch } from "vue"
  import { useRouter } from "vue-router"
  import { useRoute } from "vue-router"

  const route = useRoute()
  const router = useRouter()
  const users = useUsers()
  const { addToCart } = useCart()
  const {
    goods,
    currentPage,
    totalPages,
    goToPage,
    perPage
  } = useGoods()

  function handleAdd(product) {
    if (!users.currentUser.value) {
      router.push({ name: "Login" })
      return
    }
    addToCart(product, users.currentUser.value.login)
  }

  const searchQuery = computed(() =>
    (route.query.q || "").toString().toLowerCase()
  )

  const filteredGoods = computed(() => {
    const q = searchQuery.value

    if (!q) return goods.value

    return goods.value.filter(g =>
      g.name.toLowerCase().includes(q)
    )
  })

  const paginatedFilteredGoods = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value

    return filteredGoods.value.slice(start, end)
  })

  const filteredTotalPages = computed(() =>
    Math.ceil(filteredGoods.value.length / perPage.value)
  )

  watch(filteredGoods, () => {
    currentPage.value = 1
  })
</script>

<template>
  <section class="products">
    <div class="container">
      <h2 class="section-title">Каталог товаров</h2>

      <div v-if="filteredGoods.length" class="products__grid">
        <router-link v-for="product in paginatedFilteredGoods" class="product-card" :to="{ name: 'ProductPage', params: { id: product.id } }">
          <div class="product-card__image">
            <img :src="product.image || '/img/placeholder.jpg'" alt="IMG" />
          </div>

          <h3>{{ product.name }}</h3>

          <p class="price">
            {{ product.price }} ₽
          </p>

          <button class="btn btn--full" @click.prevent="handleAdd(product)">
            В корзину
          </button>
        </router-link>
      </div>

      <p v-else class="empty-message">
        Ничего не найдено 😢
      </p>

      <!-- Пагинация -->
      <div v-if="filteredTotalPages > 1" class="pagination">
        <button class="btn btn--ghost"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)">
          Назад
        </button>

        <button v-for="page in filteredTotalPages"
                class="pagination__item"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)">
          {{ page }}
        </button>

        <button class="btn btn--ghost"
                :disabled="currentPage === filteredTotalPages"
                @click="goToPage(currentPage + 1)">
          Вперёд
        </button>
      </div>

    </div>
  </section>
</template>
