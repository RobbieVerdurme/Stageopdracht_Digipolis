<template>
  <nav class="pager" aria-labelledby="pagination_1-32">
    <h2 id="pagination_1-32" class="visually-hidden">Paginering</h2>
    <ul class="pager__items">
      <!--Previous page-->
      <li v-if="prev" class="previous">
        <nuxt-link
          :to="{name: 'overview-index' , query: { page: this.currentPage - 1}}"
          class="previous"
        >
          Vorige
          <span class="visually-hidden">pagina</span>
        </nuxt-link>
      </li>
      <!--/Previous page-->

      <!--Display first item-->
      <li v-if="fromPage !== 1">
        <span class="visually-hidden">pagina</span>
        <nuxt-link :to="{name: 'overview-index', query: {page: 1}}">1</nuxt-link>
      </li>
      <!--/Display first item-->
      
      <!--If ... has to be displayed-->
      <li v-if="fromPage !== 1 && fromPage - 1 !== 1">...</li>
      <!-- /If ... has to be displayed-->

      <!--Pages-->
      <li
        v-for="pagenumber in pageItems"
        :key="pagenumber"
        :class="currentPage === pagenumber?'active':''"
      >
        <span class="visually-hidden">pagina</span>
        <nuxt-link :to="{name: 'overview-index', query: {page: pagenumber}}">{{ pagenumber }}</nuxt-link>
      </li>
      <!--/Pages-->

      <!--If ... has to be displayed-->
      <li v-if="toPage !== totalPageCount && toPage + 1 !== totalPageCount">...</li>
      <!--/If ... has to be displayed-->

      <!--Display last item-->
      <li v-if="toPage !== totalPageCount">
        <span class="visually-hidden">pagina</span>
        <nuxt-link
          :to="{name: 'overview-index', query: {page: totalPageCount}}"
        >{{ totalPageCount }}</nuxt-link>
      </li>
      <!--/Display last item-->

      <!--Next page-->
      <li v-if="next" class="next">
        <nuxt-link
          :to="{name: 'overview-index' , query: { page: this.currentPage + 1}}"
          class="next"
        >
          Volgende
          <span class="visually-hidden">pagina</span>
        </nuxt-link>
      </li>
      <!--/Next page-->
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // items to display
      filterdItems: [],

      // settings to filter the items
      offset: 0,
      limit: 5,

      //settings to configure pagination
      pagelimit: 3,
      fromPage: null,
      toPage: null,
      next: null,
      prev: null
    }
  },
  created () {
      this.updateProperties()
  },
  watch: {
      filterdItems () {
          this.updateFilterdItems()
      },
      currentPage () {
          this.updateProperties()
      }
  },
  computed: {
    /**
     * slice items to the offset en limit per page
     */
    filter () {
      return this.items.slice(this.offset, this.limit + this.offset)
    },
    /**
     * get the total page cound
     */
    totalPageCount () {
      return Math.floor(this.items.length / this.limit)
    }
  },
  methods: {
    updateProperties () {
      // get max page and min page
      this.toPage = parseInt(this.currentPage) + Math.floor(this.pagelimit / 2) > this.totalPageCount? this.totalPageCount: parseInt(this.currentPage) + Math.floor(this.pagelimit / 2)
      this.fromPage = this.currentPage - Math.floor(this.pagelimit / 2) < 1 ?
        1
        : this.toPage === this.totalPageCount ?
          this.totalPageCount - this.pagelimit + 1
          : this.currentPage - Math.floor(this.pagelimit / 2)

      // generate the page numbers
      var countFromPage = this.fromPage
      // eslint-disable-next-line no-unused-vars
      this.pageItems = [...new Array(this.pagelimit)].map((x) => countFromPage++)

      // generate pageoffset
      this.offset = this.currentPage === 1?0: ((this.currentPage - 1)  * this.limit)

      // get items to be displayed
      this.filterdItems = this.items.slice(this.offset, this.limit + this.offset)

      // check if there is a next page
      this.next = this.hasNextPage()
      this.prev = this.hasPrevPage()
    },
    /**
     * check if there is a nex page
     */
    hasNextPage () {
      const nextOffset = this.offset + this.limit
      return this.items.slice(nextOffset, this.limit + nextOffset).length?true:false
    },
    /**
     * check if there is a previous page
     */
    hasPrevPage () {
      const prevOffset = this.offset - this.limit
      return this.items.slice(prevOffset, this.limit + prevOffset).length?true:false
    },
    /**
     * send filterd items to parrent
     */
    updateFilterdItems () {
        this.$emit('updateFilterdItems', this.filterdItems)
    }
  }
}
</script>
