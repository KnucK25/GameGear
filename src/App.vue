<script setup>
  import { ref } from "vue"
  import useUsers from "./composables/useUsers";
  import { router } from "./router";

  const users = useUsers()
  const search = ref("")
  const hasSearched = ref(false)

  function handleLogout() {
    router.push({ name: "Home" })
    users.logout()
  }

  function handleSearch() {
    router.push({
      name: "Store",
      query: { q: search.value.trim() }
    })

    hasSearched.value = true
  }

  function clearSearch() {
    search.value = ""
    hasSearched.value = false

    router.push({
      name: "Store"
    })
  }
</script>

<template>
  <div class="layout">
    <!-- HEADER -->
    <header>
      <div class="container header__inner">
        <router-link :to="{ name: 'Home' }" class="logo no-active-style">
          Game<span>Gear</span>
        </router-link>

        <nav class="nav">
          <router-link :to="{ name: 'Home' }">Главная</router-link>
          <router-link :to="{ name: 'Store' }">Каталог</router-link>
          <router-link :to="{ name: 'Support' }">Поддержка</router-link>
          <router-link :to="{ name: 'Contacts' }">Контакты</router-link>
          <router-link v-if="users.currentUser.value?.admin" :to="{ name: 'AdminPanel' }">Админ</router-link>
        </nav>

        <div class="auth">
          <template v-if="!users.currentUser.value">
            <router-link class="btn btn--ghost" :to="{ name: 'Login' }">Войти</router-link>
            <router-link class="btn" :to="{ name: 'Registration' }">Регистрация</router-link>
          </template>

          <template v-else>
            <router-link :to="{ name : 'Profile' }" class="auth-user">
              {{ users.currentUser.value?.login }}
            </router-link>
            <router-link class="btn" :to="{ name: 'Cart' }">Корзина</router-link>
            <button class="btn" @click="handleLogout">Выйти</button>
          </template>
        </div>
      </div>

      <div class="search-bar">
        <div class="container search-bar__inner">
          <input v-model="search"
                 class="search-input"
                 placeholder="Поиск товаров..."
                 @keyup.enter="handleSearch" />

          <button v-if="$route.query.q"
                  class="btn btn--ghost"
                  @click="clearSearch">
            Сбросить
          </button>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer>
      <div class="container footer__inner">
        <div class="footer__logo">Game<span>Gear</span></div>
        <div class="footer__copy">© 2026 GameGear. Все права защищены.</div>
      </div>
    </footer>
  </div>
</template>

  <style scoped>
  </style>
