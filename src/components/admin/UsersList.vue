<script setup>
  import useUsers from "../../composables/useUsers";

  const users = useUsers().users
</script>

<template>
  <!-- Тут чисто таблица с пользователями -->
  <div class="table-card">
    <h2 class="form-title">Список пользователей</h2>

    <table>
      <tr>
        <th>Логин</th>
        <th>Email</th>
        <th>Телефон</th>
        <th>Инфо</th>
        <th>Админ</th>
      </tr>

      <tr v-for="u in users" :key="u.login">
        <td>{{ u.login }}</td>
        <td>{{ u.email }}</td>
        <td>{{ u.phone }}</td>
        <td>{{ u.info }}</td>
        <td>
          <span class="role-badge">
            {{ u.admin ? "Да" : "Нет" }}
          </span>
        </td>
      </tr>
    </table>
  </div>

  <div class="admin-cards">
    <div class="admin-card" v-for="u in users" :key="u.login">
      <h3>{{ u.login }}</h3>

      <p><strong>Email:</strong> {{ u.email }}</p>
      <p><strong>Телефон:</strong> {{ u.phone || "—" }}</p>
      <p><strong>Админ:</strong> {{ u.admin ? "Да" : "Нет" }}</p>
    </div>
  </div>
</template>

<style>
</style>
