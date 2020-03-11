<template>
  <header class="header header--menu">
    <div class="content-container">
      <nuxt-link :to="{name: 'index'}" class="site-logo subsite" rel="home">muntenroute</nuxt-link>
      <nav class="menu">
        <button
          type="button"
          class="modal-trigger toggle"
          aria-expanded="false"
          aria-controls="menu"
        >
          menu
        </button>

        <ul class="links ">
          <li>
            <nuxt-link :to="{name: 'index'}">
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'overview-index'}">
              Overview route
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'scanner'}">
              Scanner
            </nuxt-link>
          </li>
        </ul>

        <!--Modal menu-->
        <div
          id="menu"
          class="modal has-custom-binding menu"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="modal-inner">
            <div class="modal-header">
              <button
                type="button"
                class="button close icon-cross modal-close"
                data-target="menu">
                <span>Close</span>
              </button>
            </div>
            <div class="modal-content">
              <div class="header">
                <nuxt-link :to="{name: 'index'}" class="site-logo subsite" rel="home">muntenroute</nuxt-link>
              </div>
              <div class="menu-links">
                <ul class="links ">
                  <li>
                    <nuxt-link :to="{name: 'index'}">
                      Home
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{name: 'overview-index'}">
                      Overview route
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{name: 'scanner'}">
                      Scanner
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="modal-overlay modal-close"
            data-target="menu"
            tabindex="-1"
          />
        </div>
        <!--/Modal menu-->
      </nav>
    </div>
    <hr />
  </header>
</template>
<script>
export default {
  mounted() {
    /**
    * import @digipolis-gent/modal
    */
    if (window) {
      // eslint-disable-next-line no-undef
      var Modal = require('@digipolis-gent/modal')
    }

    const menu = document.querySelectorAll(".modal.menu")

    const createModal = function(modal) {
      // eslint-disable-next-line no-undef
      new Modal(modal, {
        // The modal is always visible from tablet and up,
        // this is atypical.
        resizeEvent: (open, close) => {
          if (window.innerWidth > 960) {
            close()
            modal.setAttribute("aria-hidden", "false")
          } else {
            if (!modal.classList.contains("visible")) {
              modal.setAttribute("aria-hidden", "true")
            }
          }
        },
        changeHash: false
      })
    }

    for (var i = menu.length; i-- ;) {
      createModal(menu[i])
    }
  }
}
</script>
