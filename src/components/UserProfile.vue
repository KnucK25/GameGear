<script setup>
  import { ref, watch } from "vue"
  import useUsers from "../composables/useUsers"

  const users = useUsers()

  const isEditing = ref(false)

  const form = ref({
    login: "",
    email: "",
    phone: "",
    info: ""
  })

  watch(
    () => users.currentUser.value,
    (newUser) => {
      if (newUser) {
        form.value = { ...newUser }
      }
    },
    { immediate: true }
  )

  function toggleEdit() {
    isEditing.value = !isEditing.value

    if (!isEditing.value && users.currentUser.value) {
      form.value = { ...users.currentUser.value }
    }
  }

  function save() {
    const current = users.currentUser.value

    if (!current) return

    const index = users.users.value.findIndex(
      u => u.login === current.login
    )

    if (index !== -1) {
      users.users.value[index] = {
        ...users.users.value[index],
        ...form.value
      }

      users.currentUser.value = users.users.value[index]
    }

    isEditing.value = false
  }
</script>

<template>
  <div class="main-container">
    <h2 class="form-title">Личный кабинет</h2>

    <div v-if="!users.currentUser.value">
      <p>Вы не авторизованы</p>
    </div>

    <div v-else class="profile">

      <!-- ===== ПРОСМОТР ===== -->
      <div v-if="!isEditing" class="profile-view">
        <p><strong>Логин:</strong> {{ users.currentUser.value.login }}</p>
        <p><strong>Email:</strong> {{ users.currentUser.value.email }}</p>
        <p><strong>Телефон:</strong> {{ users.currentUser.value.phone || "—" }}</p>
        <p><strong>Инфо:</strong> {{ users.currentUser.value.info || "—" }}</p>

        <button @click="toggleEdit">Редактировать</button>
      </div>

      <!-- ===== РЕДАКТИРОВАНИЕ ===== -->
      <div v-else class="profile-edit">

        <div class="form-group">
          <label>Логин</label>
          <input v-model="form.login" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" />
        </div>

        <div class="form-group">
          <label>Телефон</label>
          <input v-model="form.phone" />
        </div>

        <div class="form-group">
          <label>Инфо</label>
          <input v-model="form.info" />
        </div>

        <div class="profile-actions">
          <button @click="save">Сохранить</button>
          <button class="btn--ghost" @click="toggleEdit">Отмена</button>
        </div>
      </div>

    </div>
  </div>
</template>
