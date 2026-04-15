<script setup>
  import useGoods from "../composables/useGoods"
  import useCart from "../composables/useCart"
  import useUsers from "../composables/useUsers"
  import { useRouter } from "vue-router"

  const router = useRouter()
  const { latestGoods } = useGoods()
  const users = useUsers()
  const { addToCart } = useCart()
  function handleAdd(product) {
    if (!users.currentUser.value) {
      router.push({ name: "Login" })
      return
    }
    addToCart(product, users.currentUser.value.login)
  }
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__content">
        <h1>Игровые аксессуары нового уровня</h1>
        <p>Геймпады, клавиатуры, контроллеры и другие аксессуары для ПК и консолей</p>
        <router-link class="btn btn--large" :to="{ name: 'Store' }">Перейти в каталог</router-link>
      </div>
    </div>
  </section>

  <!-- PRODUCTS -->
  <section class="products">
    <div class="container">
      <h2 class="section-title">Последние товары</h2>

      <div class="products__grid">
        <router-link v-for="product in latestGoods" class="product-card" :to="{ name: 'ProductPage', params: { id: product.id } }">
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
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about">
    <div class="container about__inner">
      <div class="about__text">
        <h2>О магазине</h2>
        <p>
          GameGear — магазин игровых аксессуаров для профессиональных и
          любительских игроков. Мы предлагаем только проверенные устройства
          с гарантией качества.
        </p>
      </div>
      <div class="about__image"><img :src="/img/img5.png" alt="IMG" /></div>
    </div>
  </section>

</template>
