<template>
  <footer>
    <section class="footer">
      <h2 class="visually-hidden">Footer</h2>
      <div class="footer-top">
        <div class="content-container">
          <!--gent info-->
          <div class="footer--column">
            <gentinfo />
          </div>

          <!--links-->
          <div class="footer--column">
            <cityLinks />
          </div>

          <!--adress-->
          <div class="footer--column">
            <postAdress />
          </div>
        </div>
      </div>
      <div class="footer-bottom content-container">
        <!--partnership-->
        <div class="footer--column">
          <partnership />
        </div>

        <!--social media-->
        <div class="footer--column">
          <socialMedia />
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  components: {
    gentinfo: () => import("~/components/molecules/gentinfo.vue"),
    cityLinks: () => import("~/components/molecules/city-links.vue"),
    postAdress: () => import("~/components/molecules/post-adress.vue"),
    partnership: () => import("~/components/molecules/partnership.vue"),
    socialMedia: () => import("~/components/molecules/social-media.vue")
  }
};
</script>
