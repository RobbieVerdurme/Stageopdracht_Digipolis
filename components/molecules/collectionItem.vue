<template>
  <div>
    <article class="teaser-content node node--type-outdoor-location node--view-mode-teaser">
      <div class="content__second">
        <h3>{{ item.naam_nl }}</h3>
        <p class="">
          {{ item.omschrijving_nl }}
        </p>
        <nuxt-link :to="{name: 'poi-id', params:{id: item.volgnummer}}" class="read-more standalone-link" :title="item.title">
          <span class="visually-hidden">
            {{ item.naam_nl }}
          </span>
          read more
        </nuxt-link>
      </div>
      <div class="content__first">
        <div class="figure-wrapper">
          <figure>
            <img v-if="!imageError" :src="item.symbol" :alt="item.naam_nl" :onerror="imageError = true">
            <div v-else class="image-wrapper" data-ratio="8:5"><img src="http://example.com/broken-url.jpg" :alt="item.naam_nl" /></div>
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
    }
  },
  data () {
    return {
      imageError : false
    }
  }
}
</script>
