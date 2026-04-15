import { ref } from "vue";
import { watch } from "vue";

//Наш массив с пользователями
const users = ref([])

//Текущий пользователь
const currentUser = ref(null);

//Обрабатываем ошибки, если новый пользователь без данных или если просто какая-то ошибка
try {
  if (localStorage.getItem("users")) {
    //Делаем локальное хранилище для хранения данных в браузере
    users.value = JSON.parse(localStorage.getItem("users"))
  }
  else {
    users.value = [{
      login: "admin",
      email: "admin@mail.com",
      password: "admin",
      phone: "",
      info: "Главный администратор",
      admin: true
    },
      {
        login: "manager",
        email: "manager@mail.com",
        password: "manager",
        phone: "",
        info: "Менеджер магазина",
        admin: true
      },
      {
        login: "user",
        email: "user@mail.com",
        password: "user",
        phone: "",
        info: "",
        admin: false
      }]
  }
}
catch {
  users.value = []
}

try {
  if (localStorage.getItem("currentUser")) {
    currentUser.value = JSON.parse(localStorage.getItem("currentUser"))
  }
  else {
    currentUser.value = null
  }
}
catch {
  currentUser.value = null
}

//Вот это для постоянного обновления данных
watch(users, (newValue) => { localStorage.setItem("users", JSON.stringify(newValue)) }, { deep: true })
watch(currentUser, (newValue) => { localStorage.setItem("currentUser", JSON.stringify(newValue)) }, { deep: true })

//Функция в которой запихиваем все данные в массив при регистрации
function registerPush(user) {
  users.value.push({ ...user, admin: false });
}

//Функция где мы проверяем данные на то, существуют ли они в нашем массиве. Возвращаем объект с ошибками, ну или с пустым местом если их нет
function registerFind(login, email, phone) {
  const errors = {
    login: "",
    email: "",
    phone: ""
  };

  if (users.value.find(u => u.login == login)) {
    errors.login = "Данный логин уже зарегистрирован";
  }
  if (users.value.find(u => u.email == email)) {
    errors.email = "Данный email уже зарегистрирован";
  }
  if (users.value.find(u => u.phone == phone)) {
    errors.phone = "Данный телефон уже зарегистрирован";
  }

  return errors;
}

//Функция в которой также проверяем на значения в массиве. Если есть такое, то обновляем пользователя с null и вернём true
function login(login, password) {
  const found = users.value.find(
    u => u.login === login && u.password === password
  );

  if (found) {
    currentUser.value = found;
    return true;
  }

  return false;
}

//Функция для выхода, где обнуляем пользователя
function logout() {
  currentUser.value = null;
}

//Экспортируем все данные для пользования в других частях приложения
export default function useUsers() {
  return { users, currentUser, registerPush, registerFind, login, logout }
}
