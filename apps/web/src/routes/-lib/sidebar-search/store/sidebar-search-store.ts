import { create } from 'zustand'

interface SidebarSearchStore {
  search: string
  setSearch: (search: string) => void
}

export const useSidebarSearchStore = create<SidebarSearchStore>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
}))

