<template>
  <section class="highlight cta-block download highlight--left">
    <div class="highlight__inner">
      <p>
        download website als app enkel beschikbaar op chromium browsers ...
      </p>
      <p>download gpx hieronder</p>
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
            Install PWA</a>

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
/* eslint-disable no-undef */
export default {
  computed: {
    installable () {
      return this.$store.getters.getInstallable
    },
    installPrompt () {
      // eslint-disable-next-line dot-notation
      return this.$store.getters['getInstallablePrompt']
    }
  },
  mounted () {
    this.$refs.installableblock.hidden = this.installable
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      this.$store.commit('setInstallablePrompt', e)
      // Update UI to notify the user they can add to home screen
      this.setInstallable(true)
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
      this.setInstallable(false)

      // check what user picked
      this.installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome !== 'accepted') {
          this.setInstallable(true)
        }
      })
    },
    /**
     * set the store installable value
     */
    setInstallable (newValue) {
      this.$store.commit('setInstallable', newValue)
      this.$refs.installableblock.hidden = !newValue
    }
  }
}
</script>
