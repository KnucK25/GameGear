import { ref } from "vue"

const searchQuery = ref("")
const activeQuery = ref("")

function applySearch() {
  activeQuery.value = searchQuery.value.trim()
}

export default function useSearch() {
  return {
    searchQuery,
    activeQuery,
    applySearch
  }
}
