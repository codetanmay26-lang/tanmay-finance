import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockTransactions'
import { mockUsers } from '../data/mockUsers'
import { createMockJwt, validateMockJwt } from '../utils/auth'

const createId = () => `txn-${Date.now()}`

export const useFinanceStore = create(
  persist(
    (set) => ({
      authToken: '',
      currentUser: null,
      darkMode: false,
      transactions: mockTransactions,
      search: '',
      typeFilter: 'all',
      selectedCategories: [],
      dateFrom: '',
      dateTo: '',
      sortBy: 'dateDesc',
      login: ({ email, password }) => {
        const account = mockUsers.find(
          (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
        )
        if (!account) {
          return { ok: false, message: 'Invalid email or password' }
        }
        const authToken = createMockJwt(account)
        set({
          authToken,
          currentUser: {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
          },
        })
        return { ok: true }
      },
      logout: () => set({ authToken: '', currentUser: null }),
      hydrateAuth: () =>
        set((state) => {
          if (!state.authToken) {
            return { authToken: '', currentUser: null }
          }
          const payload = validateMockJwt(state.authToken)
          if (!payload) {
            return { authToken: '', currentUser: null }
          }
          if (state.currentUser) {
            return {}
          }
          return {
            currentUser: {
              id: payload.sub,
              name: payload.name,
              email: payload.email,
              role: payload.role,
            },
          }
        }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setSearch: (search) => set({ search }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((item) => item !== category)
            : [...state.selectedCategories, category],
        })),
      clearCategories: () => set({ selectedCategories: [] }),
      setDateFrom: (dateFrom) => set({ dateFrom }),
      setDateTo: (dateTo) => set({ dateTo }),
      setSortBy: (sortBy) => set({ sortBy }),
      addTransaction: (payload) =>
        set((state) => ({
          transactions: [{ ...payload, id: createId() }, ...state.transactions],
        })),
      updateTransaction: (id, payload) =>
        set((state) => ({
          transactions: state.transactions.map((item) =>
            item.id === id ? { ...item, ...payload } : item,
          ),
        })),
      resetFilters: () =>
        set({
          search: '',
          typeFilter: 'all',
          selectedCategories: [],
          dateFrom: '',
          dateTo: '',
          sortBy: 'dateDesc',
        }),
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (state) => ({
        authToken: state.authToken,
        currentUser: state.currentUser,
        darkMode: state.darkMode,
        transactions: state.transactions,
      }),
    },
  ),
)
