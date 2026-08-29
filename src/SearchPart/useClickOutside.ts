import { onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, callback: () => void): void {
  function handleMouseDown(event: MouseEvent): void {
    if (target.value && !target.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('mousedown', handleMouseDown))
  onUnmounted(() => document.removeEventListener('mousedown', handleMouseDown))
}
