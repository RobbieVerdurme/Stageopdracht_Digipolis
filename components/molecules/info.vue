<template>
  <div>
    <!-- title -->
    <h1>{{ item.title }}</h1>
    <!--info-->
    <p class>{{ item.info}}</p>
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
