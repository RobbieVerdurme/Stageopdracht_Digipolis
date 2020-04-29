<template>
  <section class="highlight cta-block download highlight--left">
    <div class="highlight__inner">
      <p>
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

        <li id="installableblock" style="display:none">
          <a id="installableLink" class="standalone-link" style="cursor: pointer;" title="Download application">
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
    let deferredPrompt
    const addBtn = document.getElementById('installableLink')
    const installBlock = document.getElementById('installableblock')

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI to notify the user they can add to home screen
      installBlock.style.display = 'block'
      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        installBlock.style.display = 'none'
        // Show the prompt
        deferredPrompt.prompt()
      })
    })
  }
}
</script>
