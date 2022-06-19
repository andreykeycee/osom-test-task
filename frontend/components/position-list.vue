<template>
  <div>
    <h1>Positions</h1>
    <position-list-item
      v-for="position in positions"
      :key="position.name"
      :position="position"
    />
  </div>
</template>

<script lang="ts" setup>
  import PositionListItem from './position-list-item.vue'
  import { usePositionsStore } from '~/stores/positions'

  const { positions } = usePositionsStore()
</script>

<style lang="sass" scoped>

</style>