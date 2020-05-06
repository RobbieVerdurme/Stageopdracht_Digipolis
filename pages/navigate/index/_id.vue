<template>
  <div>
    <info :item="item.properties" />
    <div v-if="savedPoi" class="messages messages--status" role="alert" aria-atomic="true">
      <h2 class="visually-hidden">
        Status
      </h2>
      <i class="icon-checkmark" aria-hidden="true" />
      <p>{{ item.properties.naam_nl }} is opgeslagen</p>
    </div>
    <button ref="saveButton" :disabled="savedPoi" class="button button-secondary" @click="savePOI">
      Punt opslaan
    </button>
  </div>
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
       * id of the poi
       */
      id: parseInt(this.$route.params.id),
      savedPoi: false
    }
  },
  computed: {
    /**
     * selected poi
     */
    item () {
      return this.$store.getters.getPOIDetailById(this.id)
    }
  },
  mounted () {
    this.savedPoi = parseInt(localStorage.lastPoiId) === this.id
  },
  methods: {
    /**
     * save last poi id to localstorage
     */
    savePOI () {
      localStorage.lastPoiId = this.id

      // disable button
      this.savedPoi = true
    }
  }
}
</script>
