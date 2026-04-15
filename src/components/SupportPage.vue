<script setup>
import { ref } from "vue"

const email = ref("")
const message = ref("")
const success = ref("")

function sendMessage() {
  if (!email.value || !message.value) {
    success.value = "Заполните все поля"
    return
  }

  success.value = "Сообщение отправлено!"
  email.value = ""
  message.value = ""
}
</script>

<template>
  <section class="support-page">
    <div class="container">
      <h1 class="section-title">Поддержка</h1>

      <div class="main-container">
        <div class="form-wrapper">
          <h2 class="form-title">Связаться с нами</h2>

          <div class="form-group">
            <input v-model="email" placeholder="Ваш email">
          </div>

          <div class="form-group">
            <textarea v-model="message" placeholder="Ваше сообщение" class="textarea"></textarea>
          </div>

          <button @click="sendMessage">Отправить</button>

          <p class="success">{{ success }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
