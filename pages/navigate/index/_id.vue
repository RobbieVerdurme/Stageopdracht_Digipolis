<template>
  <info :item="item.properties" />
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    info: () => import('~/components/molecules/info')
  },
  data () {
    return {
      /**
       * id of the cluster
       */
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    item () {
      return this.$store.getters.getPOIDetailById(this.id)
    }
  }
}
</script>
