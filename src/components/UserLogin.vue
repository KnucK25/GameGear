<script setup>
  import { ref } from "vue";
  import useUsers from "../composables/useUsers";
  import { useRouter } from "vue-router";

  const login = ref("");
  const password = ref("");

  const errors = ref({
    login: "",
    password: "",
    common: ""
  });

  const router = useRouter();

  //Функция которая проверяет пароль с логином и если всё ок, то перенаправляет на страничку с таблицей
  function handleLoginUser() {

    errors.value.login = "";
    errors.value.password = "";
    errors.value.common = "";

    if (!login.value.trim()) {
      errors.value.login = "Введите логин";
    }

    if (!password.value.trim()) {
      errors.value.password = "Введите пароль";
    }

    if (errors.value.login || errors.value.password) {
      return;
    }

    //Вот тут вызываем функцию из useUsers.js
    if (useUsers().login(login.value, password.value)) {
      router.push("Home");
    } else {
      errors.value.common = "Неверный логин или пароль";
    }
  };
</script>

<template>
  <div class="main-container">
    <div class="form-wrapper">
      <h2 class="form-title">Авторизация</h2>

      <div class="form-group">
        <input v-model="login"
               placeholder="Логин"
               :class="{ 'input-error': errors.login }">
        <span class="err">{{ errors.login }}</span>
      </div>

      <div class="form-group">
        <input type="password"
               v-model="password"
               placeholder="Пароль"
               :class="{ 'input-error': errors.password }">
        <span class="err">{{ errors.password }}</span>
      </div>

      <button @click="handleLoginUser">Войти</button>

      <div class="err">{{ errors.common }}</div>
    </div>
  </div>
</template>

<style>
</style>
