import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'

//Ну тут думаю понятно, мы чисто приложение создаём для работы с ним и подключаем плагин для маршрутов
createApp(App).use(router).mount('#app')
