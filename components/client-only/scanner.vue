<template>
  <div>
    <qrcode-stream @decode="onDecode" @init="onInit" class="scanner">
      <div v-if="loading" class="loading-indicator">Loading...</div>
      <div v-if="error" class="error-indicator has-text-danger">{{ error }}</div>
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  // variables
  data () {
    return {
      error: null,
      loading: false
    }
  },
  // methods
  methods: {
    // if qr-code is found and read
    onDecode (result) {
      // open in new window
      window.open(result)
    },

    // if error
    async onInit (promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.loading-indicator,
.error-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
.scanner{
  max-height: 500px;
  max-width: 500px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
}
</style>
