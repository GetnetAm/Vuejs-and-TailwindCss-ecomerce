import { ref, computed, watch } from 'vue'
import type { Product } from '@/types'

const allProducts = ref<Product[]>([])
const productsLoaded = ref<boolean>(false)

async function loadProducts(): Promise<void> {
  if (productsLoaded.value) return // already fetched — don't re-fetch on every keystroke/mount
  try {
    const res = await fetch('/data/products.json')
    allProducts.value = (await res.json()) as Product[]
  } catch (err) {
    console.error('Failed to load products for search:', err)
  } finally {
    productsLoaded.value = true
  }
}

export function useProductSearch() {
  const query = ref<string>('')

  const dismissed = ref<boolean>(false)

  loadProducts()

  const results = computed<Product[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    return allProducts.value
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 6) // cap the dropdown at 6 matches so it never overwhelms the screen
  })

  const isOpen = computed<boolean>(() => query.value.trim().length > 0 && !dismissed.value)

  watch(query, () => {
    dismissed.value = false
  })

  function dismiss(): void {
    dismissed.value = true
  }

  function clear(): void {
    query.value = ''
    dismissed.value = false
  }

  return { query, results, isOpen, dismiss, clear }
}
