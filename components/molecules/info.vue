<template>
  <div>
    <!-- title -->
    <h1>{{ item.naam_nl }}</h1>
    <!--info-->
    <p><b>{{ item.omschrijving_nl}}</b></p>
    <p id="info">{{ item.detail_nl}}</p>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
