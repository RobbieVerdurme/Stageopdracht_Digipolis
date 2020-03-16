<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="cluster" />
      <nuxt-link :to="{name: 'overview-index-map'}" class="button button-primary">
        Bekijk op kaart
      </nuxt-link>
      <Programme :munten="cluster.munten" />
    </section>
  </main>
</template>

<script>
export default {
  async fetch ({ store }) {
    //check if clusterinfo in store is filled
    if(store.state.clusters.clusterInfo.length === 0){
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
      id: this.$route.params.id
    }
  },
  computed: {
    cluster () {
      return this.$store.getters['clusters/getClusterById'](this.id)
    }
  }
}
</script>
