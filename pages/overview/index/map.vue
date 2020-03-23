<template>
  <div>
    <client-only>
      <VueLayersMap />
    </client-only>
    <Cta />
  </div>
</template>

<script>
export default {
  async fetch({ store }){
    // get poi
    store.dispatch('poi/setPointsOfInterst')

    // get route
    store.dispatch('routes/setRoutepoints')
  },
  components: {
    VueLayersMap: ()=> import('~/components/organisms/vuelayersmap.vue'),
    Cta: () => import('~/components/molecules/cta.vue')
  }
}
</script>

<style>

</style>
