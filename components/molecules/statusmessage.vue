<template>
  <div>
    <!--Success-->
    <div v-if="status === 'success'" class="messages messages--status" role="alert" aria-atomic="true">
      <i class="icon-checkmark" aria-hidden="true" />
      <p>{{ statusText }} is opgeslagen</p>
    </div>

    <!-- Error -->
    <div v-if="status === 'error'" class="messages messages--error" role="alert" aria-atomic="true">
      <i class="icon-cross" aria-hidden="true" />
      <p>{{ statusText }}</p>
    </div>

    <!-- Warning -->
    <div v-if="status === 'warning'" class="messages messages--warning" role="alert" aria-atomic="true">
      <i class="icon-exclamation" aria-hidden="true" />
      <p>{{ statusText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusText: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
}
</script>
