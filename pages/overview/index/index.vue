<template>
  <div>
    <Collection :items="filterdItems" :navigate-to-page="'poi-id'" />
    <!--Pagination-->
    <pageination
      :items="items"
      :current-page="currentPage"
      :route-to-page="$route.name"
      @updateFilterdItems="updateFilterdItems"
    />
    <!--/Pagination-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'poi',
  components: {
    Collection: () => import('~/components/organisms/collection'),
    pageination: () => import('~/components/molecules/pagination')
  },
  data () {
    return {
      // items
      filterdItems: [],

      // settings to configure pagination
      currentPage: null
    }
  },
  computed: {
    ...mapGetters({ items: 'getAllPointsOfIntrest' })
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
