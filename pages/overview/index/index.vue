<template>
  <div>
    <Collection :items="filterdItems" />
    <!--Pagination-->
    <pageination
      :items="items"
      :currentPage="currentPage"
      @updateFilterdItems="updateFilterdItems"
    />
    <!--/Pagination-->
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    //check if pointsOfInterst in store is filled
    if (!store.state.poi.pointsOfInterst.length) {
      // get pointsOfInterst from online
      await store.dispatch('poi/setPointsOfInterst')
    }
  },
  components: {
    Collection: () => import('~/components/organisms/collection.vue'),
    pageination: () => import('~/components/molecules/pagination')
  },
  created() {
    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    }
  },
  data() {
    return {
      // items
      items: this.$store.getters['poi/getAllPointsOfIntrest'],
      filterdItems: [],

      //settings to configure pagination
      currentPage: null
    }
  },
  methods: {
    updateFilterdItems(value) {
      this.filterdItems = value
    }
  }
}
</script>
