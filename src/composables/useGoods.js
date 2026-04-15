import { ref, computed, watch } from "vue";

const goods = ref([])
const currentPage = ref(1)
const perPage = ref(4)

try {
  if (localStorage.getItem("goods")) {
    goods.value = JSON.parse(localStorage.getItem("goods"))
  } else {
    goods.value = [
      {
        id: 1,
        name: "Геймпад Pro X",
        price: 4990,
        image: "img/img1.jpg",
        description: "Эргономичный геймпад с высокоточными стиками на эффекте Холла, программируемыми задними лепестками и тактильной отдачей. Идеальный выбор для киберспорта.",
        specs: {
          connection: "Bluetooth / USB-C",
          compatibility: "PC, PS5",
          warranty: "12 месяцев"
        }
      },
      {
        id: 2,
        name: "Механическая клавиатура",
        price: 7490,
        image: "img/img2.jpg",
        description: "Клавиатура на механических переключателях с настраиваемой RGB-подсветкой, алюминиевой верхней панелью и съёмным кабелем USB-C. Подходит для игр и работы.",
        specs: {
          connection: "Bluetooth / USB-C",
          compatibility: "PC",
          warranty: "8 месяцев"
        }
      },
      {
        id: 3,
        name: "Контроллер Wireless (Sonic Edition)",
        price: 14990,
        image: "img/img3.png",
        description: "Официально лицензированный беспроводной контроллер в стиле Соника. Выполнен в культовом синем цвете с изображением ёжика и звёздами на корпусе. Эргономичная форма, низкая задержка сигнала и встроенный аккумулятор до 20 часов работы.",
        specs: {
          connection: "Bluetooth / USB-C",
          compatibility: "PC, Xbox Series X|S, Xbox One",
          warranty: "12 месяцев"
        }
      },
      {
        id: 4,
        name: "Аркадный стик",
        price: 9990,
        image: "img/img4.png",
        description: "Профессиональный аркадный контроллер с японскими компонентами: 8-позиционный джойстик и крупные антивандальные кнопки. Оптимален для файтингов и ретро-игр.",
        specs: {
          connection: "USB-C",
          compatibility: "PC, PS5",
          warranty: "6 месяцев"
        }
      }
    ]
  }
} catch {
  goods.value = []
}

watch(goods, (newValue) => {localStorage.setItem("goods", JSON.stringify(newValue))}, { deep: true })

const totalPages = computed(() =>
  Math.ceil(goods.value.length / perPage.value)
)

const paginatedGoods = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return goods.value.slice(start, end)
})

const latestGoods = computed(() => {
  return [...goods.value].slice(-4).reverse()
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
function generateId() {
  let newId
  if (goods.value.length === 0) {
    newId = 1
  }
  else {
    newId = Math.max(...goods.value.map(g => g.id)) + 1
  }
  return newId
}

function addGood(product) {
  if (!product.name || !product.price) return

  if (!product.image) {
    product.image = "img/placeholder.jpg"
  }

  product.id = generateId()
  goods.value.push(product)
}

function updateGood(updatedProduct) {
  const index = goods.value.findIndex(g => g.id === updatedProduct.id)
  if (index !== -1) {
    goods.value[index] = { ...updatedProduct }
  }
}
function deleteGood(id) {
  const index = goods.value.findIndex(g => g.id === id)

  if (index !== -1) {
    goods.value.splice(index, 1)
  }

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1
  }
}

function getGoodById(id) {
  return goods.value.find(g => g.id === Number(id))
}

export default function useGoods() {
  return {
    goods,
    paginatedGoods,
    currentPage,
    totalPages,
    goToPage,
    addGood,
    getGoodById,
    updateGood,
    deleteGood,
    latestGoods,
    perPage
  }
}
