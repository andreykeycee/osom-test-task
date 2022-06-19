<script lang="ts" setup>
  useAsyncData('redirect', () => useRouter().replace({ path: '/currencies' }))
</script>