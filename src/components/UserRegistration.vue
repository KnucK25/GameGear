<script setup>
  import { ref, reactive } from "vue";
  import useUsers from "../composables/useUsers";
  import { useRouter } from "vue-router";

  const login = ref("");
  const email = ref("");
  const password = ref("");
  const phone = ref("");
  const info = ref("");
  const errors = reactive({
    login: "",
    email: "",
    password: "",
    phone: ""
});

  const router = useRouter();

  function register() {
    //Обнуляем все ошибки с каждым заходом в функцию
    errors.login = "";
    errors.email = "";
    errors.password = "";
    errors.phone = "";

    // Проверяет логин на пустоту. trim нужен для удаления лишних пробелов
    if (!login.value.trim()) {
      errors.login = "Введите логин";
    }

    // Проверяет email на наличие собаки и точки
    if (!email.value.includes("@") || !email.value.includes(".")) {
      errors.email = "Некорректный email";
    }

    // Проверяет пароль на длину меньше 3
    if (password.value.length < 3) {
      errors.password = "Пароль слишком короткий";
    }

    //Если есть хоть одна ошибка (Длина одного из элементов больше 0), то обнуляем строку с успехом и выходим из функции досрочно
    if (Object.values(errors).some(e => e.length > 0)) {
      return;
    }

    //Вызываем функцию из useUsers.js которая проверяет логин, email и телефон на наличие в базе
    const result = useUsers().registerFind(login.value, email.value, phone.value);

    //Записываем все ошибки, если они есть, то что-то будет показывать. Если нет, то просто пустая строка
    errors.login = result.login;
    errors.email = result.email;
    errors.phone = result.phone;

    if (Object.values(errors).some(e => e.length > 0)) {
      return;
    }

    //После успешного прохождения всех проверок пихаем наши данные в массив через функцию в useUsers.js
    useUsers().registerPush({
      login: login.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      info: info.value
    });

    //Сразу авторизуем нового пользователя, по сути просто берём последнего из списка
    useUsers().currentUser.value = useUsers().users.value[useUsers().users.value.length - 1];

    //И перенаправляем на главную страницу
    router.push("Home");
  };
</script>

<template>
  <!-- Тут ничё интересного, просто ошибки которых нет, пока не присвоим значение. Ну и по нажатию кнопки будет вызов функции register -->
  <div class="main-container">
    <div class="form-wrapper">
      <h2 class="form-title">Регистрация</h2>

      <div class="form-group">
        <input v-model="login" placeholder="Логин" :class="{ 'input-error': errors.login }">
        <span class="err">{{ errors.login }}</span>
      </div>

      <div class="form-group">
        <input v-model="email" placeholder="Email" :class="{ 'input-error': errors.email }">
        <span class="err">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <input type="password" v-model="password" placeholder="Пароль" :class="{ 'input-error': errors.password }">
        <span class="err">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <input v-model="phone" placeholder="Телефон (необязательно)" :class="{ 'input-error': errors.phone }">
        <span class="err">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <input v-model="info" placeholder="Доп. информация (необязательно)">
      </div>

      <button @click="register">Зарегистрироваться</button>
    </div>
  </div>
</template>

<style scoped>
</style>
