<template>
  <div>
    <!-- title -->
    <h1>{{ item.naam_nl }}</h1>
    <!--info-->
    <p><b v-html="item.omschrijving_nl" /></p>
    <p id="info" v-html="item.detail_nl" />
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
