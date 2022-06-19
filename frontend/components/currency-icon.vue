<template>
  <!--  TODO store images on static server-->
  <img
    :src="`../assets/images/${currency.symbol}.png`"
    :alt="currency.name"
  />
</template>

<script lang="ts" setup>
  import { BaseCurrency } from '~/entities'

  type Props = {
    currency: BaseCurrency
  }

  const { currency } = defineProps<Props>()
</script>

<style lang="sass" scoped>

</style>