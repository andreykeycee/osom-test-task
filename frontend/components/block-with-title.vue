<template>
  <div class="block-with-title">
    <div class="block-title">{{title}}</div>
    <div class="block-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Props = {
    title: string
  }

  const { title } = defineProps<Props>()
</script>

<style lang="sass" scoped>
.block-title
  color: $secondary-dark
  margin: 24px 0

.block-content
  +block
</style>