<template>
  <position-list />
</template>

<script lang="ts" setup>
  import { apiRequest } from '~/utils/api-request'
  import { usePositionsStore } from '~/stores/positions'
  import PositionList from '~/components/position-list.vue'
  import { Position } from '~/entities'

  const config = useRuntimeConfig()

  await useAsyncData('currencies', async ({ $pinia }) => {
    // TODO exclude business logic to separated module
    const data = await apiRequest<Position[]>(config.NUXT_ENV_API_URL, {
      method: 'GET',
      endpoint: '/positions'
    })

    if (data) {
      const store = usePositionsStore($pinia)
      store.$patch({ positions: data })
    } else {
      console.error('Error on positions fetch')
    }
  })

  const positionsStore = usePositionsStore()
  const positions = positionsStore.positions
</script>

<style lang="sass" scoped>

</style>