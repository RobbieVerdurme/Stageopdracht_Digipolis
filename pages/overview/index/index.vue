<template>
  <Collection :items="items" />
</template>

<script>
export default {
  async fetch ({ store }) {
    //check if pointsOfInterst in store is filled
    if(!store.state.poi.pointsOfInterst.length){
      // get pointsOfInterst from online
      await store.dispatch('poi/setPointsOfInterst')
    }
  },
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
