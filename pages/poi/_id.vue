<template>
  <main class="info-page">
    <section class="detail-layout">
      <Info :item="poi.properties" />
      <div>
        <nuxt-link :to="{name: 'overview-index-map'}" class="button button-secondary">
          Bekijk op kaart
        </nuxt-link>
      </div>
      <ul>
        <li>
          <nuxt-link v-if="previousPoi > 0 " :to="{name: 'poi-id', params: {'id': this.id + 1}}" class="standalone-link back">Vorige</nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="nextPoi <= maxlength" :to="{name: 'poi-id', params: {'id': this.id - 1}}" class="standalone-link right">Volgende</nuxt-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'poi',
  components: {
    Info: () => import('~/components/molecules/info'),
  },
  data () {
    return {
      /**
       * id of the cluster
       */
      id: parseInt(this.$route.params.id)
    }
  },
  created () {
    this.$store.commit('poi/setCurrentPOI', this.poi)
  },
  computed: {
    poi () {
      return this.$store.getters['poi/getPOIDetailById'](this.id)
    },
    // get max length of poi list
    maxlength () {
      return this.$store.getters['poi/getMaxLengthPOI']
    },
    // next poi
    nextPoi () {
      return this.id + 1
    },
    // vorig poi
    previousPoi () {
      return this.id - 1
    }
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
ul li {
  display: inline;
}
.right{
  right: 0px;
  position: absolute;
}
</style>
