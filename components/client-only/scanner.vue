<template>
<div>
  <div v-if="error" class="messages messages--error" role="alert" aria-atomic="true">
    <i class="icon-cross" aria-hidden="true"></i>
    <p>{{error}}</p>
  </div>
  <qrcode-stream v-if="!error" @decode="onDecode" @init="onInit" class="scanner">
    <div v-if="loading" class="spinner">
      <div>&hellip;loading</div>
    </div>
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
          this.error = 'Verleen toegang om je camera te gebruiken'
        } else if (error.name === 'NotFoundError') {
          this.error = 'Er is geen camera op dit apparaat'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'Beveiligde connectie nodig (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'Is de camera al in gebruik?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'De camera is niet compatiebel'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'De Stream API kan niet gebruikt worden in deze browser'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.scanner{
  max-height: 500px;
  max-width: 500px;
  display: block;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
}
</style>
