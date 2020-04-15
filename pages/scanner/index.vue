<template>
  <main class="info-page">
    <section class="detail-layout">
      <scanner />
      <Info :item="item" />
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'scanner',
  components: {
    scanner: () => import('~/components/client-only/scanner'),
    Info: () => import('~/components/molecules/info')
  },
  data () {
    return {
      item: this.$store.getters['getScannerInfo']
    }
  }
}
</script>
