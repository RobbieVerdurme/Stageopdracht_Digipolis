<template>
  <div class="container">
    <v-Header />
    <nuxt />
    <footer>
      <v-Footer />
    </footer>
  </div>
</template>

<script>
export default {
  components: {
    vHeader: () => import('~/components/organisms/header'),
    vFooter: () => import('~/components/organisms/footer')
  },
  mounted () {
    // trigger sync event on page load
    navigator.serviceWorker.ready.then((reg) => {
      return reg.sync.register('offlineQueue')
    })

    // trigger sync event when back online
    window.addEventListener('online', (e) => {
      // trigger sync event
      navigator.serviceWorker.ready.then((reg) => {
        return reg.sync.register('offlineQueue')
      }).catch(() => {
        alert('Service worker not ready try again')
      })
    })
  }
}
</script>
