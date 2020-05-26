<template>
  <div>
    <h1>Routering</h1>
    <p>De detail pagina van het point of interst zal hier getoont worden indien u dicht genoeg bij een punt staat</p>
    <p v-if="lastpoiId">
      Het laatste opgeslagen punt is <nuxt-link :to="{name: 'navigate-index-id', params: {id: lastpoiId}}">
        {{ lastPOI.properties.naam_nl }}
      </nuxt-link>
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      lastpoiId: null
    }
  },
  computed: {
    lastPOI () {
      return this.$store.getters.getPOIDetailById(this.lastpoiId)
    }
  },
  mounted () {
    this.lastpoiId = parseInt(localStorage.lastPoiId)
  }
}
</script>
