<template>
  <header class="header header--menu">
    <div class="content-container">
      <nuxt-link :to="{name: 'index'}" class="site-logo subsite" rel="home">
        {{ title }}
      </nuxt-link>
      <nav class="menu">
        <button
          type="button"
          class="modal-trigger toggle"
          aria-expanded="false"
          aria-controls="menu"
        >
          menu
        </button>

        <ul id="links" class="links">
          <li>
            <nuxt-link :to="{name: 'index'}" :class="activeLink==='index'?'active':''">
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'overview-index'}" :class="activeLink==='overview-index'|| activeLink==='overview-index-map'?'active':''">
              Overzicht route
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'navigate-index'}" :class="activeLink==='navigate-index' || activeLink==='navigate-index-id'?'active':''">
              Volg route
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'scanner'}" :class="activeLink==='scanner'?'active':''">
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
                data-target="menu"
              >
                <span>Close</span>
              </button>
            </div>
            <div class="modal-content">
              <div class="header">
                <nuxt-link :to="{name: 'index'}" class="site-logo subsite" rel="home">
                  {{ title }}
                </nuxt-link>
              </div>
              <div class="menu-links">
                <ul class="links ">
                  <li>
                    <nuxt-link :to="{name: 'index'}" :class="activeLink==='index'?'active':''">
                      Home
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{name: 'overview-index'}" :class="activeLink==='overview-index' || activeLink==='overview-index-map'?'active':''">
                      Overzicht route
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{name: 'navigate-index'}" :class="activeLink==='navigate-index'?'active':''">
                      Volg route
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{name: 'scanner'}" :class="activeLink==='scanner'?'active':''">
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
    <hr>
    <figure v-if="activeLink === 'poi-id' && poi" class="hero hero--mobile">
      <div class="image-wrapper" data-ratio="4:1">
        <img v-if="poi.properties.heroImage && showHeroImage" :src="poi.properties.heroImage" :alt="poi.properties.naam_nl">
      </div>
    </figure>
  </header>
</template>
<script>
// import
import Modal from '@digipolis-gent/modal'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: 'Lichtfestival',
      activeLink: this.$route.name,
      menuModal: null,
      poi: null,
      showHeroImage: false
    }
  },
  computed: {
    ...mapGetters({
      selectedPOI: 'getSelectedPOI'
    })
  },
  watch: {
    $route () {
      this.activeLink = this.$route.name
      this.showHeroImage = false
      this.menuModal.close()
    },
    selectedPOI (value) {
      this.poi = value
      this.showHeroImage = true
    }
  },
  created () {
    if (Object.keys(this.selectedPOI).length) {
      this.poi = this.selectedPOI
      this.showHeroImage = true
    }
  },
  beforeMount () {
    const modal = document.querySelector('#menu')
    this.menuModal = new Modal(modal, {
      // The modal is always visible from tablet and up,
      // this is atypical.
      resizeEvent: (open, close) => {
        if (window.innerWidth > 960) {
          close()
          modal.setAttribute('aria-hidden', 'false')
        } else if (!modal.classList.contains('visible')) {
          modal.setAttribute('aria-hidden', 'true')
        }
      },
      changeHash: false
    })
  }
}
</script>
