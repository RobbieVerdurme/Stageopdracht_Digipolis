<template>
  <Collection :items="items" />
</template>

<script>
export default {
  async fetch ({ store }) {
    //check if clusterinfo in store is filled
    if(!store.state.clusters.clusterInfo.length){
      // get clusterinfo from online
      await store.dispatch('clusters/getClusters')
    }
  },
  components: {
    Collection: () => import('~/components/organisms/collection.vue')
  },
  computed: {
    items () {
      return this.$store.getters['clusters/getAllClusters']
    }
  }
}
</script>

<style>

</style>
