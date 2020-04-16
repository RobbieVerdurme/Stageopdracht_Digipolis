<template>
  <div>
    <Collection :items="filterdItems" />
    <!--Pagination-->
    <pageination
      :items="items"
      :current-page="currentPage"
      @updateFilterdItems="updateFilterdItems"
    />
    <!--/Pagination-->
  </div>
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    Collection: () => import('~/components/organisms/collection.vue'),
    pageination: () => import('~/components/molecules/pagination')
  },
  data () {
    return {
      // items
      items: this.$store.getters['poi/getAllPointsOfIntrest'],
      filterdItems: [],

      // settings to configure pagination
      currentPage: null
    }
  },
  watch: {
    $route () {
      this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    }
  },
  created () {
    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
  },
  methods: {
    updateFilterdItems (value) {
      this.filterdItems = value
    }
  }
}
</script>
