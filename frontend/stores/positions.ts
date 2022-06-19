import { defineStore } from 'pinia'
import { Position } from '~/entities'

type PositionsState = {
  positions: Position[]
}

export const usePositionsStore = defineStore<
  'positions', PositionsState
  >('positions', {
  state: () => ({
    positions: []
  })
})
