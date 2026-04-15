<script setup>
  import useCart from "../composables/useCart"
  import useUsers from "../composables/useUsers"

  const {
    getUserCart,
    removeFromCart,
    decreaseQuantity,
    addToCart,
    getTotal
  } = useCart()

  const users = useUsers()
  const user = users.currentUser.value
</script>

<template>
  <section class="cart-page">
    <div class="container">

      <h2 class="section-title">Корзина</h2>

      <div v-if="!user">
        <p>Нужно войти в аккаунт</p>
      </div>

      <div v-else>

        <div v-if="getUserCart(user.login).length === 0">
          <p>Корзина пуста</p>
        </div>

        <!-- LIST -->
        <div v-else class="cart-list">

          <div class="cart-item"
               v-for="item in getUserCart(user.login)"
               :key="item.id">

            <img class="cart-img"
                 :src="item.image || 'img/placeholder.jpg'" />

            <div class="cart-info">
              <h4>{{ item.name }}</h4>
              <p>{{ item.price }} ₽</p>
            </div>

            <div class="cart-actions">

              <button class="qty-btn" @click="decreaseQuantity(item.id, user.login)">
                -
              </button>

              <span class="qty">{{ item.quantity }}</span>

              <button class="qty-btn" @click="addToCart(item, user.login)">
                +
              </button>

            </div>

            <button class="remove-btn"
                    @click="removeFromCart(item.id, user.login)">
              ✕
            </button>

          </div>

        </div>

        <h3 class="cart-total">
          Итого: {{ getTotal(user.login) }} ₽
        </h3>

      </div>

    </div>
  </section>
</template>
