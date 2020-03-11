<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('~/components/organisms/header'),
    Footer: () => import('~/components/organisms/footer')
  }
}
</script>
