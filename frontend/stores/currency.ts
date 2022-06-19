import { defineStore } from 'pinia'
import { Currency } from '~/entities'

type CurrencyState = {
  currency: Currency | null
}

export const useCurrencyStore = defineStore<
  '[currencySymbol].vue', CurrencyState
  >('[currencySymbol].vue', {
  state: () => ({
    currency: null
  })
})