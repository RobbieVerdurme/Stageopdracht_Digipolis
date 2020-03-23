<template>
  <div class="programme-wrapper">
    <h2 class="visually-hidden">
      items {{ cluster }}
    </h2>
    <div class="highlight highlight--no-icon">
      <dl class="highlight__inner">
        <div class="programme-slot">
          <dd>
            <!--Teasers & modal-->
            <ul class="grid-3">
              <li
                v-for="item in munten"
                :key="item.id"
                class="teaser  teaser-programme   teaser--inverted "
              >
                <!-- Modal -->
                <ModalComponent :id="item.id">
                  <h3 :id="`${item.id}-title`">
                    {{ item.title }}
                  </h3>
                  <h4>Vrijdag 19 augustus 2018</h4>

                  <p>{{item.description}}</p>

                  <div
                    class="image-gallery--wrapper multiple image-gallery--secondary"
                  >
                    <ul class="image-gallery js-lightbox">
                      <li v-for="img in item.image" :key="`${item.id}${img.alt}`">
                        <a
                          :href="img.src"
                          class="gallery-link"
                          aria-label="image caption"
                          aria-describedby="image-gallery__open-gallery">
                          <figure>
                            <div class="image-wrapper" data-ratio="8:5">
                              <img
                                :src="img.src"
                                :alt="img.alt"/>
                            </div>
                            <figcaption>image caption</figcaption>
                          </figure>
                        </a>
                      </li>
                      <li class="image-gallery__show-more">
                        <div class="show-more__content">
                          <span class="show-more__total">3</span>
                          <span
                            >Show all photos
                            <i class="icon-arrow-right" aria-hidden="true"
                          /></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- Add this to the bottom of your page template, above scripts -->
                  <span id="image-gallery__open-gallery" hidden>open galerij</span>
                  <p class="">{{ item.info }}</p>
                </ModalComponent>
                <!-- /Modal -->

              <!--Teaser-->
                <article class="teaser-content">
                  <div class="content__second">
                    <h3>{{ item.title }}</h3>

                    <p class="teaser--inverted">
                      {{ item.description }}
                    </p>

                    <a
                      :href="`#${item.id}`"
                      class="read-more standalone-link"
                      title="General article title text"
                    >
                      <span class="visually-hidden">
                        General article title text
                      </span>
                      read more</a
                    >
                  </div>
                  <div class="content__first">
                    <div class="figure-wrapper">
                      <figure class="teaser--inverted">
                        <div class="image-wrapper" data-ratio="8:5">
                          <img
                            src="https://via.placeholder.com/800x500&text=8:5+(800x500)"
                            alt="placeholder image alternative text"
                            class="teaser--inverted"
                          />
                        </div>
                      </figure>
                      <div class="accolade-inverse bottom-left" />
                    </div>
                  </div>
                </article>
                <a
                  :href="`#${item.id}`"
                  class="teaser-overlay-link"
                  tabindex="-1"
                  aria-hidden="true"
                  >General article title text</a
                >
              </li>
              <!-- /Teaser -->
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    ModalComponent: () => import('~/components/molecules/modal')
  },
  props: {
    munten: {
      type: Array,
      required: true
    },
    cluster: {
      type: String,
      required: true
    }
  }
}
</script>
