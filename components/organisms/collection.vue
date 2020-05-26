<template>
  <ul class="links">
    <li v-for="item in items" :key="item.id" class="teaser  teaser-search-wide">
      <Collectionitem :item="item.properties" :navigate-to-page="navigateToPage" />
    </li>
  </ul>
</template>
<script>
export default {
  components: {
    Collectionitem: () => import('~/components/molecules/collectionItem')
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    navigateToPage: {
      type: String,
      required: true
    }
  }
}
</script>
