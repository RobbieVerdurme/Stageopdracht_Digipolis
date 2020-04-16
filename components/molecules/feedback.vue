<template>
  <div class="box-no-icon">
    <h2>
      <button aria-expanded="true">Kunnen we deze pagina nog verbeteren? Laat het ons weten!</button>
    </h2>
    <div>
      <!--Contact-->
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
        <li>
          <i class="icon-twitter-outline"></i>
          <span>
            Via de
            <a href="https://twitter.com/stadgent">Twitter-account</a> van Stad Gent (
            <a href="https://twitter.com/stadgent">@StadGent</a>)
          </span>
        </li>
      </ul>
      <!--/Contact-->

      <h3>Heb je suggesties voor, of opmerkingen over deze webpagina?</h3>

      <!--Feedback-->
      <div v-if="!send">
        <!--Form elements-->
        <div :class="err?'error':success?'success':''" class="form-item">

          <!--Label-->
          <label for="feedbacktekst">
            Bericht
            <span class="label-optional">(Optioneel)</span>
          </label>
          <!--/Label-->

          <div class="form-columns">
            <!--Text-->
            <div class="form-item-column">
              <textarea
                name="feedbacktekst"
                id="feedbacktekst"
                :class="err?'error':success?'success':''"
              ></textarea>
            </div>
            <!--/Text-->

            <!--Status-->
            <div class="form-item-column">
              <div
                v-if="err || success"
                :class="err?'error':success?'success':''"
                class="field-message"
                role="alert"
                id="textarea-message"
              >
                <span v-if="err">{{ err }}</span>
                <span v-if="success">We hebben u suggestie ontvangen.</span>
                <div class="accolade"></div>
              </div>
            </div>
            <!--/Status-->
          </div>
        </div>
        <button @click="sendFeedback" class="button button-secondary">Indienen</button>
        <!--/Form elements-->
      </div>
      <!--/Feedback-->

      <!--Loading spinner-->
      <div v-if="send" class="spinner">
        <div>&hellip;Bericht verzenden</div>
      </div>
      <!--/Loading spinner-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbacktext: "",
      send: false,
      success: false,
      err: ""
    };
  },
  methods: {
    /**
     * send feedback to server
     */
    sendFeedback() {
      // check if already sending
      if (!this.send) {
        this.send = true;
        this.$store
          .dispatch("sendFeedback", this.feedbacktext)
          .then(() => {
            // on success backend call
            this.success = true;
            this.resetFeedbackText();
          })
          .catch(error => {
            // on error
            this.err = error;
          });
        // reset send
        this.send = false;
      }
    },
    /**
     * resets the feedback text to ''
     */
    resetFeedbackText() {
      this.feedbacktext = "";
    }
  }
};
</script>
