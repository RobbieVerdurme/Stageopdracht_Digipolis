<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <h1 class="overview-title">
        <span class="overview-title-colon">Beziens­waar­dig­he­den<span class="colon" aria-label="true" /></span>
      </h1>
      <div class="display-switcher">
        <span>Bekijk de resultaten</span>

        <ul class="icon-list inline">
          <li>
            <i class="icon-document" aria-hidden="true" /><nuxt-link v-if="mapDisabled" :to="{name: 'overview-index'}" :class="!mapDisabled? 'disabled': ''" @click="toggleMapDisabled">
              Als lijst
            </nuxt-link>
            <span v-if="!mapDisabled">
              Als lijst
            </span>
          </li>
          <li>
            <i class="icon-marker" aria-hidden="true" /><nuxt-link v-if="!mapDisabled" :to="{name: 'overview-index-map'}" :class="!mapDisabled? '': 'disabled'" @click="toggleMapDisabled">
              Op kaart
            </nuxt-link>
            <span v-if="mapDisabled">
              Op kaart
            </span>
          </li>
        </ul>
      </div>
      <nuxt-child />
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    mapDisabled () {
      return this.$router.app._route.path.includes('map')
    }
  },
  methods: {
    toggleMapDisabled () {
      this.mapDisabled = !this.mapDisabled
    }
  }
}
</script>
