<template>
  <div>
    <!-- title -->
    <h1>{{ item.naam_nl }}</h1>
    <!--info-->
    <h4>{{ item.omschrijving_nl}}</h4>
    <p class>{{ item.detail_nl}}</p>
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
