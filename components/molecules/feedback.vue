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
        <!--Success-->
        <div v-if="success" class="messages messages--status" role="alert" aria-atomic="true">
          <i class="icon-checkmark" aria-hidden="true"></i>
          <p>We hebben u suggestie ontvangen.</p>
        </div>
        <!--/Success-->

        <!--Error-->
        <div v-if="err" class="messages messages--error" role="alert" aria-atomic="true">
          <i class="icon-cross" aria-hidden="true"></i>
          <p>{{err}}</p>
        </div>
        <!--/Error-->

        <!--Form elements-->
        <label for="feedbacktekst">
          Bericht
          <span class="label-optional">(Optioneel)</span>
        </label>
        <textarea v-model="feedbacktext" id="feedbacktekst" />
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
