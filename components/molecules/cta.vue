<template>
  <section class="highlight cta-block download highlight--left">
    <div class="highlight__inner">
      <p v-if="!this.$store.getters['getInstallablePrompt']">
        download website als app enkel beschikbaar op google chrome ...
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

        <li id="installableblock" :style="this.$store.getters['getInstallablePrompt']?'':'display:none'">
          <a id="installableLink" class="standalone-link" style="cursor: pointer;" title="Download application" @click="installPWA">
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
  mounted () {
    const installBlock = document.getElementById('installableblock')

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.$store.commit('setInstallablePrompt', e)
      // Update UI to notify the user they can add to home screen
      installBlock.style.display = 'block'
    })
  },
  methods: {
    installPWA () {
      const installBlock = document.getElementById('installableblock')
      const installPrompt = this.$store.getters['getInstallablePrompt']

      // Show the prompt
      installPrompt.prompt()

      // set display to none
      installBlock.style.display = 'none'

      // check what user picked
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome !== 'accepted') {
          installBlock.style.display = 'block'
          console.log('User accepted the A2HS prompt')
        }
      })
    }
  }
}
</script>
