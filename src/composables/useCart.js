import { ref, watch} from "vue"

const cart = ref([])

try {
  if (localStorage.getItem("cart")) {
    cart.value = JSON.parse(localStorage.getItem("cart"))
  }
  else {
    cart.value = []
  }
} catch {
  cart.value = []
}

watch(cart, (newValue) => {localStorage.setItem("cart", JSON.stringify(newValue))}, { deep: true })

function addToCart(product, userLogin) {
  const item = cart.value.find(
    i => i.id === product.id && i.user === userLogin
  )

  if (item) {
    item.quantity++
  } else {
    cart.value.push({
      ...product,
      user: userLogin,
      quantity: 1
    })
  }
}
function removeFromCart(id, userLogin) {
  const index = cart.value.findIndex(i => i.id === id && i.user === userLogin)

  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}
function getUserCart(userLogin) {
  return cart.value.filter(i => i.user === userLogin)
}
function getTotal(userLogin) {
  return getUserCart(userLogin)
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
}

function decreaseQuantity(id, userLogin) {
  const item = cart.value.find(
    i => i.id === id && i.user === userLogin
  )

  if (!item) return

  item.quantity--

  if (item.quantity <= 0) {
    const index = cart.value.findIndex(
      i => i.id === id && i.user === userLogin
    )

    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }
}

export default function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    getUserCart,
    getTotal
  }
}
