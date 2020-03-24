<template>
  <Collection :items="items" />
</template>

<script>
export default {
  async fetch ({ store }) {
    //check if pointsOfInterst in store is filled
    if(!store.state.poi.pointsOfInterst.length){
      // get pointsOfInterst from online
      await store.dispatch('poi/getPointsOfInterst')
    }
  },
  components: {
    Collection: () => import('~/components/organisms/collection.vue')
  },
  computed: {
    items () {
      return this.$store.getters['poi/getAllPOIDetail']
    }
  }
}
</script>

<style>

</style>
