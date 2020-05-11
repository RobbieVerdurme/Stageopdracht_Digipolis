<template>
  <section class="highlight cta-block download highlight--left">
    <div class="highlight__inner">
      <p :hidden="!installable">
        Indien u een browser heeft de progressive web applicatie functionaliteit ondersteund is de optie installeer PWA beschikbaar. Deze laat u de site opslaan als applicatie op uw apparaat.
      </p>
      <p>
        Hieronder vind u de download knop voor de route als gpx op te slaan op uw apparaat.
      </p>

      <ul class="links">
        <li>
          <a href="#" class="button button-primary" download title="Dowload gpx lichtfestival">
            gpx Lichtfestival</a>
          <span class="file-type">
            gpx
            <span class="file-size">
              (102kb)
            </span>
          </span>
        </li>

        <li ref="installableblock">
          <a class="standalone-link" style="cursor: pointer;" title="Download application" @click="installPWA">
            Installeer PWA</a>
          <span class="file-type">
            Application
            <span class="file-size">
              (102kb)
            </span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

/* eslint-disable no-undef */
export default {
  computed: {
    ...mapGetters(
      {
        installable: 'getInstallable',
        installPrompt: 'getInstallablePrompt'
      }
    )
  },

  mounted () {
    this.$refs.installableblock.hidden = !this.installable
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      this.setInstallablePrompt(e)
      // Update UI to notify the user they can add to home screen
      this.setNewInstallable(true)
    })
  },

  methods: {
    /**
     * prompt the install
     */
    installPWA () {
      // Show the prompt
      this.installPrompt.prompt()

      // set display to none
      this.setNewInstallable(false)

      // check what user picked
      this.installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome !== 'accepted') {
          this.setNewInstallable(true)
        }
      })
    },
    /**
     * set the store installable value
     */
    setNewInstallable (newValue) {
      this.setInstallable(newValue)
      this.$refs.installableblock.hidden = !newValue
    },
    ...mapMutations([
      'setInstallable',
      'setInstallablePrompt'
    ])
  }
}
</script>
