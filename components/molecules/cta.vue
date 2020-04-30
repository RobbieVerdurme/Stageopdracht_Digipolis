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
  data () {
    return {
      installable: this.$store.getters.getInstallable
    }
  },
  mounted () {
    this.$refs.installableblock.style.display = this.installable ? 'block' : 'none'
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.$store.commit('setInstallablePrompt', e)
      // Update UI to notify the user they can add to home screen
      this.$store.commit('setInstallable', true)
      this.$refs.installableblock.style.display = 'block'
    })
  },
  methods: {
    installPWA () {
      // eslint-disable-next-line dot-notation
      const installPrompt = this.$store.getters['getInstallablePrompt']

      // Show the prompt
      installPrompt.prompt()

      // set display to none
      this.$store.commit('setInstallable', false)
      this.$refs.installableblock.style.display = 'none'

      // check what user picked
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome !== 'accepted') {
          this.$store.commit('setInstallable', true)
          this.$refs.installableblock.style.display = 'block'
        }
      })
    }
  }
}
</script>
