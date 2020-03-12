<template>
  <div>
    <VueLayersMap />
    <Cta />
  </div>
</template>

<script>
export default {
  components: {
    VueLayersMap: ()=> import('~/components/organisms/vuelayersmap.vue'),
    Cta: () => import('~/components/molecules/cta.vue')
  }
}
</script>

<style>

</style>
