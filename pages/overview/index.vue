<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <h1>Beziens­waar­dig­he­den :</h1>
      <div class="display-switcher">
        <span>View the results</span>

        <ul class="icon-list inline">
          <li>
            <i class="icon-document" aria-hidden="true" /><nuxt-link v-if="mapDisabled" :to="{name: 'overview-index'}" :class="!mapDisabled? 'disabled': ''" @click="toggleMapDisabled">
              As list
            </nuxt-link>
            <span v-if="!mapDisabled">
              As list
            </span>
          </li>
          <li>
            <i class="icon-marker" aria-hidden="true" /><nuxt-link v-if="!mapDisabled" :to="{name: 'overview-index-map'}" :class="!mapDisabled? '': 'disabled'" @click="toggleMapDisabled">
              On map
            </nuxt-link>
            <span v-if="mapDisabled">
              On map
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
