<template>
  <div class="feedback-form box-no-icon">
    <h2>
      <button
        class="accordion--button"
        aria-expanded="true"
        aria-controls="feedback-form-content"
      >Kunnen we deze pagina nog verbeteren? Laat het ons weten!</button>
    </h2>
    <div
      id="feedback-form-content"
      class="accordion--content accordion--expanded"
      aria-hidden="false"
      style="max-height: 534px;"
    >
      <h3>Voor persoonlijke vragen of klachten kan je terecht bij Gentinfo.</h3>

      <p class>Hoe bereiken?</p>

      <ul class="icon-list">
        <li>
          <i class="icon-phone"></i>
          <span>
            Telefonisch:
            <a href="tel: 09 210 10 10">09 210 10 10</a> (van maandag t.e.m. zaterdag van 8 tot 19 uur)
          </span>
        </li>
        <li>
          <i class="icon-envelope"></i>
          <span>
            Stuur ons een
            <a href="mailto:gentinfo@stad.gent">e-mail</a>
          </span>
        </li>
      </ul>

      <form
        class="dg-feedback-form no-style"
      >
        <h3>Heb je suggesties voor, of opmerkingen over deze webpagina?</h3>

        <div
          class="js-form-item form-item js-form-type-textarea form-item-suggestion js-form-item-suggestion textarea"
        >
          <div class="form-label">
            <label>
              Bericht
              <span class="label-optional">(Optioneel)</span>
            </label>
          </div>

          <div class="form-columns">
            <div class="form-item-column">
              <span v-if="err">{{ err }}</span>
              <span v-if="send">The messeage has been send</span>
              <div class="textarea">
                <textarea
                  v-model="feedbacktext"
                  name="suggestion"
                  rows="2"
                  cols="60"
                  maxlength="10000"
                  class="form-textarea"
                ></textarea>
              </div>
            </div>
            <div class="form-item-column"></div>
          </div>
        </div>
        <input
          autocomplete="off"
          type="hidden"
        />
        <input
          type="hidden"
          name="form_id"
        />
        <div
          class="form-actions js-form-wrapper form-wrapper"
        >
          <input
            @click="sendFeedback"
            name="op"
            value="Indienen"
            class="button button--primary js-form-submit form-submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feedbacktext: '',
      send: false,
      err: ''
    }
  },
  methods: {
    /**
     * send feedback to server
     */
    sendFeedback () {
      if(!this.send){
        this.$store.dispatch('sendFeedback', this.feedbacktext).then(() => {
          this.send = true
        }).catch((error) => {
          this.err = error
        })
        this.resetFeedbackText()
      }else {
        this.err = 'Sending already'
      }
    },
    /**
     * resets the feedback text to ''
     */
    resetFeedbackText () {
      this.feedbacktext = ''
    }
  }  
}
</script>
