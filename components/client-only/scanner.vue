<template>
  <qrcode-stream @decode="onDecode" @init="onInit" class="scanner">
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div v-if="error" class="error-indicator has-text-danger">{{ error }}</div>
  </qrcode-stream>
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
      // TODO: CHECK WITH REGEX IF IT IS A LINK
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
          this.error = 'ERROR: verleen toegang om je camera te gebruiken'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: er is geen camera op dit apparaat'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: beveiligde connectie nodig (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is de camera al in gebruik?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: de camera is niet compatiebel'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: de Stream API kan niet gebruikt worden in deze browser'
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
