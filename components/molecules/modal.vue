<template>
  <!-- show value -->
  <div
    :id="id"
    class="modal programme-detail"
    tabindex="-1"
  >
    <div class="modal-inner">
      <div class="modal-header">
        <!--@click close-->
        <button type="button" class="button close icon-cross modal-close" :data-target="id" @click="close">
          <span>Close</span>
        </button>
      </div>
      <div class="modal-content">
        <slot></slot>
    </div>
    </div>

    <div class="modal-overlay modal-close" :data-target="id" tabindex="-1" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('input', !this.value)
    }
  },
  mounted(){
    /**
     * import @digipolis-gent/modal
     */
    if(window){
      // eslint-disable-next-line no-undef
      var Modal = require('@digipolis-gent/modal')
    }

    if (!Modal) {
      return
    }

    const selected = document.querySelectorAll(
      '.modal:not(.has-custom-binding)'
    )
    // eslint-disable-next-line no-new
    new Modal(selected[this.id - 1 ])
  }
}
</script>
