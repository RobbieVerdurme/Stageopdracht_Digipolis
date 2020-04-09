<template>
  <Collection :items="items" />
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    Collection: () => import('~/components/organisms/collection.vue')
  },
  computed: {
    items () {
      return this.$store.getters['poi/getAllPointsOfIntrest']
    }
  }
}
</script>

<style>

</style>
