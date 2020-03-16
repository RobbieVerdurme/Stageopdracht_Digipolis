<template>
  <ul class="links">
    <li v-for="item in items" :key="item.id" class="teaser  teaser-search-wide">
      <Collectionitem :item="item" />
    </li>
  </ul>
</template>
<script>
export default {
  components: {
    Collectionitem: () => import('~/components/molecules/collectionitem')
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
