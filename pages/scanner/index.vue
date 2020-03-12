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
  components: {
    scanner: () => import('~/components/client-only/scanner'),
    Info: () => import('~/components/molecules/info')
  },
  computed: {
    item () {
      return this.$store.state.scanner.all[0]
    }
  }
}
</script>

<style>
</style>
