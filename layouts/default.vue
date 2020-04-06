<template>
  <div class="container">
    <v-Header />
    <nuxt />
    <v-Footer />
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
