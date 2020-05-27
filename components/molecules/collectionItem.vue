<template>
  <div>
    <article class="teaser-content node node--type-outdoor-location node--view-mode-teaser">
      <div class="content__second">
        <h3>{{ item.naam_nl }}</h3>
        <p v-html="item.omschrijving_nl" />
        <nuxt-link :to="{name: navigateToPage, params:{id: item.volgnummer}}" class="read-more standalone-link" :title="item.title">
          Lees meer
          <span class="visually-hidden">
            over {{ item.naam_nl }}
          </span>
        </nuxt-link>
      </div>
      <div v-if="!navigateToPage.includes('navigate')" class="content__first">
        <div class="figure-wrapper">
          <figure>
            <div class="image-wrapper" data-ratio="8:5">
              <img v-if="item.symbol" :src="item.symbol" :alt="item.naam_nl">
            </div>
          </figure>
          <div class="accolade-inverse bottom-left" />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    navigateToPage: {
      type: String,
      required: true
    }
  }
}
</script>
