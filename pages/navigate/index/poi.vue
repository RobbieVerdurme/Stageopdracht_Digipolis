<template>
  <info :item="item" />
</template>

<script>
export default {
  components: {
    info: () => import('~/components/molecules/info')
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
