<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :data-projection="dataProjection" style="max-height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
      <!--Tile for map-->
      <vl-layer-tile id="wmts">
        <!--Get map from geoserver-->
        <vl-source-wmts
          :style-name="styleName"
          :layer-name="layerName"
          :matrix-set="matrixSet"
          :format="format"
          :url="url"
          :matrix-ids="matrixIds"
        />
      </vl-layer-tile>

      <!--Current position-->
      <vl-geoloc @update:position="updatePosition($event)">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position" />
            <vl-style-box>
              <vl-style-icon src="../images/marker.png" :scale="0.4" :anchor="[0.5, 1]" />
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <!--POI-->
      <vl-layer-vector>
        <vl-source-vector :features.sync="features" />
        <!--Style-->
        <vl-style-box>
          <vl-style-circle :radius="5">
            <vl-style-fill color="white"></vl-style-fill>
            <vl-style-stroke color="blue"></vl-style-stroke>
          </vl-style-circle>
        </vl-style-box>
      </vl-layer-vector>

      <!--Route-->
      <vl-layer-vector>
        <vl-source-vector :features.sync="route" />
        <!--Style-->
        <vl-style-box>
          <vl-style-stroke color="blue" :width="3" :line-dash="[3,5,30,5]"/>
        </vl-style-box>
      </vl-layer-vector>
    </vl-map>
  </div>
</template>

<script>
export default {
  async fetch({ store }){
    // check if pointsOfInterst is emtpy
    if(!store.state.poi.d.length){
      // get poi
      store.dispatch('poi/getPointsOfInterst')
    }

    // check if routepoints is empty
    if(!store.state.routes.routepoints.length){
      // get route
      store.dispatch('routes/setRoute')
    }

  },
  // variables
  data () {
    return {
      // map attributes
      url: 'https://geo.gent.be/geoserver/gwc/service/wmts/',
      matrixIds: [],
      matrixSet: 'SG-WEB MERCATOR',
      layerName: 'SG-E-Stadsplan:Stadsplan',
      format: 'image/png',
      styleName: 'default',
      dataProjection: 'EPSG:3857',

      // settings map
      zoom: 14,
      center: [414688.076662, 6630700.090869],
      rotation: 0,
      geolocPosition: undefined,

      //features
      features: this.$store.state.poi.pointsOfInterst,

      //route
      route: this.$store.state.routes.routepoints
    }
  },
  // created
  created () {
    // make matrixids for fetching map
    this.matrixIds = [...new Array(21)].map((x, i) => { return 'SG-WEB MERCATOR:' + i })
  },

  // methods
  methods: {
    /**
     * updates positin marker on the map
     */
    updatePosition ($event) {
      this.geolocPosition = $event
    },
  }
}
</script>
