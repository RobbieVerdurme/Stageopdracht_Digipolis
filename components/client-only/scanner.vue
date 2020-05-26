<template>
  <div>
    <!--Statusmessage-->
    <statusmessge :status="error?'error':warning?'warning':''" :status-text="error?error:warning" />

    <!--Camera-->
    <qrcode-stream v-if="!error" class="scanner" @decode="onDecode" @init="onInit">
      <div v-if="loading" class="spinner">
        <div>&hellip;loading</div>
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  components: {
    statusmessge: () => import('~/components/molecules/statusmessage.vue')
  },
  // variables
  data () {
    return {
      error: null,
      loading: false,
      warning: null
    }
  },
  // methods
  methods: {
    // if qr-code is found and read
    onDecode (result) {
      // regular expression
      const expression = /(\b(https|http):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
      const regex = new RegExp(expression)

      // check if qr-code is link
      if (result.match(regex)) {
        // eslint-disable-next-line no-undef
        this.$router.push(result)
      } else {
        this.warning = 'Geen geldige url gevonden in qr-code'
      }
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
        } else if (error.name === 'InsecureContextError') {
          this.error = 'Ga naar https versie van de site. Om dit te doen verander je de http naar https in de adresbalk'
        } else {
          this.error = 'Error'
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
