<template>
  <main class="news-overview-page">
    <section class="overview-layout">
      <div class="display-switcher">
        <span>View the results</span>

        <ul class="icon-list inline">
          <li>
            <i class="icon-document" aria-hidden="true" /><nuxt-link :to="{name: 'overview-index'}" :class="!mapDisabled? 'disabled': ''" @click="toggleMapDisabled">
              As list
            </nuxt-link>
          </li>
          <li>
            <i class="icon-marker" aria-hidden="true" /><nuxt-link :to="{name: 'overview-index-map'}" :class="!mapDisabled? '': 'disabled'" @click="toggleMapDisabled">
              On map
            </nuxt-link>
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

<style scoped>
.disabled {
  pointer-events: none;
  text-decoration: none;
  font-weight: bold;
  color: black;
}
</style>
