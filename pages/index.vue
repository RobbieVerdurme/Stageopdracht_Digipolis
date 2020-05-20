<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="item.properties" />
      <div>
        <nuxt-link :to="{name: 'overview-index-map'}" class="button button-secondary">
          Bekijk op kaart
        </nuxt-link>
      </div>
      <Cta />
      <button v-if="!downloadbuttonClicked" class="button button-secondary" @click="buttonClicked">
        Maak site offline beschikbaar
      </button>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'route',
  components: {
    Info: () => import('~/components/molecules/info'),
    Cta: () => import('~/components/molecules/cta')
  },
  data () {
    return {
      downloadbuttonClicked: false
    }
  },
  computed: {
    item () {
      /**
       * get routeinfo
       */
      return this.$store.getters.getRoute
    }
  },
  methods: {
    buttonClicked () {
      this.setScannerInfo()
      this.setRoutepoints()
      this.setPointsOfInterst()
      this.downloadbuttonClicked = true
    },
    ...mapActions([
      'setPointsOfInterst',
      'setRoutepoints',
      'setScannerInfo'
    ])
  }
}
</script>
