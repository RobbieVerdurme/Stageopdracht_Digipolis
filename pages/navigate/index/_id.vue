<template>
  <div>
    <info :item="item.properties" />
    <statusmessage :status="savedPoi?'success':''" :status-text="item.properties.naam_nl +'is opgeslagen'" />
    <button ref="saveButton" :disabled="savedPoi" class="button button-secondary" @click="savePOI">
      Punt opslaan
    </button>
  </div>
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    statusmessage: () => import('~/components/molecules/statusmessage'),
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
