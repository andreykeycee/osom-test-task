export type BaseCurrency = {
  name: string
  symbol: string
}

export type Position = BaseCurrency & {
  amount: string
  amountEur: string
}

export type Currency = BaseCurrency & {
  price: string
  circulatingSupply: string
  maxSupply: string
  marketCap: string
  allTimeHigh: string
  description: string
  alerts: CurrencyAlert[]
  priceHistory: CurrencyPriceHistory
}

export type CurrencyAlert = {
  targetPriceEur: string,
  percentsToChange: string,
  isHigher: boolean
}

type CurrencyPriceHistory = {
  [K in PriceHistoryRangeName]: PriceHistoryRange
}

export type PriceHistoryRangeName = '1D' | '7D' | '1M' | '3M' | 'YTD' | 'ALL'

export type PriceHistoryRange = {
  change: PriceHistoryChange
  priceData: PriceHistoryData[]
}

type PriceHistoryChange = {
  amount: string
  percents: string
  isUptrend: boolean
}

type PriceHistoryData = [UnixTime, PriceAmount]

type UnixTime = number
type PriceAmount = number