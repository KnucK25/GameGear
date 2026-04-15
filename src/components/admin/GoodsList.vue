<script setup>
  import { ref } from "vue"
  import useGoods from "../../composables/useGoods"

  const { goods, addGood, updateGood, deleteGood } = useGoods()
  const error = ref("")
  const editingId = ref(null)

  const emptyForm = () => ({
    id: null,
    name: "",
    price: "",
    image: "",
    description: "",
    specs: {
      connection: "",
      compatibility: "",
      warranty: ""
    }
  })

  const form = ref(emptyForm())

  function startEdit(product) {
    editingId.value = product.id
    form.value = JSON.parse(JSON.stringify(product))
  }

  function saveProduct() {
    error.value = ""

    if (!form.value.name.trim() || !form.value.price) {
      error.value = "Введите название и цену товара"
    } else {
      if (editingId.value) {
        updateGood(form.value)
      } else {
        addGood({ ...form.value })
      }

      resetForm()
    }
  }

  function resetForm() {
    editingId.value = null
    form.value = emptyForm()
  }
</script>

<template>
  <div class="table-card">
    <h2 class="form-title">Управление товарами</h2>

    <!-- Форма -->
    <div class="admin-form">
      <input v-model="form.name" placeholder="Название" />
      <input v-model="form.price" type="number" placeholder="Цена" />
      <input v-model="form.image" placeholder="URL изображения" />
      <input v-model="form.description" placeholder="Описание" />

      <input v-model="form.specs.connection" placeholder="Тип подключения" />
      <input v-model="form.specs.compatibility" placeholder="Совместимость" />
      <input v-model="form.specs.warranty" placeholder="Гарантия" />

      <button class="btn" @click="saveProduct">
        {{ editingId ? "Сохранить" : "Добавить" }}
      </button>

      <button v-if="editingId"
              class="btn btn--ghost"
              @click="resetForm">
        Отмена
      </button>
    </div>

    <div v-if="error" class="admin-error">
      {{ error }}
    </div>

    <!-- Таблица -->
    <table>
      <tr>
        <th>ID</th>
        <th>Название</th>
        <th>Цена</th>
        <th>Описание</th>
        <th>Подключение</th>
        <th>Совместимость</th>
        <th>Гарантия</th>
        <th>Действия</th>
      </tr>

      <tr v-for="g in goods">
        <td data-label="ID">{{ g.id }}</td>
        <td data-label="Название">{{ g.name }}</td>
        <td data-label="Цена">{{ g.price }} ₽</td>
        <td data-label="Описание">{{ g.description }}</td>
        <td data-label="Подключение">{{ g.specs.connection }}</td>
        <td data-label="Совместимость">{{ g.specs.compatibility }}</td>
        <td data-label="Гарантия">{{ g.specs.warranty }}</td>
        <td data-label="Действия">
          <button class="btn btn--ghost" @click="startEdit(g)">Ред.</button>
          <button class="btn btn--ghost" @click="deleteGood(g.id)">Удалить</button>
        </td>
      </tr>
    </table>
  </div>

  <div class="admin-cards">
    <div class="admin-card" v-for="g in goods" :key="g.id">
      <h3>{{ g.name }}</h3>

      <p><strong>ID:</strong> {{ g.id }}</p>
      <p><strong>Цена:</strong> {{ g.price }} ₽</p>
      <p><strong>Описание:</strong> {{ g.description || "—" }}</p>

      <p><strong>Подключение:</strong> {{ g.specs.connection || "—" }}</p>
      <p><strong>Совместимость:</strong> {{ g.specs.compatibility || "—" }}</p>
      <p><strong>Гарантия:</strong> {{ g.specs.warranty || "—" }}</p>

      <div class="admin-card__actions">
        <button class="btn btn--ghost" @click="startEdit(g)">
          Редактировать
        </button>
        <button class="btn btn--ghost" @click="deleteGood(g.id)">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>
