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
  }
}
</script>
