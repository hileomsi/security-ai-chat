import { useDebounce } from '@uidotdev/usehooks'
import { useSidebarSearchStore } from '../store/sidebar-search-store'

export function useSidebarSearch() {
  const search = useSidebarSearchStore((state) => state.search)
  const setSearch = useSidebarSearchStore((state) => state.setSearch)
  const debouncedSearch = useDebounce(search, 300)

  return {
    search,
    setSearch,
    debouncedSearch,
  }
}

