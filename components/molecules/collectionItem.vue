<template>
  <div>
    <article class="teaser-content node node--type-outdoor-location node--view-mode-teaser">
      <div class="content__second">
        <h3>{{ item.title }}</h3>
        <p class="">
          {{ item.description }}
        </p>
        <nuxt-link :to="{name: 'cluster-id', params:{id: item.id}}" class="read-more standalone-link" :title="item.title">
          <span class="visually-hidden">
            {{ item.title }}
          </span>
          read more
        </nuxt-link>
      </div>
      <div class="content__first">
        <div class="figure-wrapper">
          <figure>
            <img src="https://via.placeholder.com/528x330&text=16:10+(528x330)" alt="alt text">
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
  }
}
</script>
