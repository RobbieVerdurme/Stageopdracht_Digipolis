<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="cluster" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
      <Programme :munten="cluster.munten" />
      <nuxt-link v-if="previousCluster > 0" :to="{name: 'cluster-id', params: {id: previousCluster.toString()}}" class="button button-primary"> Vorige </nuxt-link>
      <nuxt-link v-if="nextCluster <= maxLength" :to="{name: 'cluster-id', params: {id: nextCluster.toString()}}" class="button button-primary"> Volgende </nuxt-link>
    </section>
  </main>
</template>

<script>
export default {
  async fetch ({ store }) {
    // check if clusterinfo in store is filled
    if(!store.state.clusters.clusterInfo.length){
      // get clusterinfo from online
      await store.dispatch('clusters/getClusters')
    }
  },
  components: {
    Info: () => import('~/components/molecules/info'),
    Programme: () => import('~/components/organisms/programme')
  },
  data () {
    return {
      /**
       * id of the cluster
       */
      id: this.$route.params.id
    }
  },
  computed: {
    /**
     * get cluster with id from store
     */
    cluster () {
      return this.$store.getters['clusters/getClusterById'](this.id)
    },
    /**
     * get id of the previous cluster
     */
    previousCluster () {
      return parseInt(this.id) - 1
    },
    /**
     * get id of next cluster
     */
    nextCluster () {
      return parseInt(this.id) + 1
    },
    /**
     * the lentgh of the cluster array
     */
    maxLength () {
      return this.$store.getters['clusters/getLengthClusters']
    }
  }
}
</script>
