<script>
</script>

<template>
  <div class="admin-page container">
    <h1 class="section-title">Админ панель</h1>

    <div class="admin-tabs">
      <router-link :to="{ name: 'AdminUsers' }"
                   class="admin-tab">
        Пользователи
      </router-link>

      <router-link :to="{ name: 'AdminGoods' }"
                   class="admin-tab">
        Товары
      </router-link>
    </div>

    <router-view />
  </div>
</template>
