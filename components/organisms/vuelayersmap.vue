<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :data-projection="dataProjection" style="max-height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
      <!-- interactions -->
      <vl-interaction-select :features.sync="selectedFeatures">
        <template slot-scope="select">
          <!-- select styles -->
          <vl-style-box>
            <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
            <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            <vl-style-circle :radius="5">
              <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
              <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            </vl-style-circle>
          </vl-style-box>
          <vl-style-box :z-index="1">
            <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
            <vl-style-circle :radius="5">
              <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
            </vl-style-circle>
          </vl-style-box>
          <!--// select styles -->

          <!-- selected feature popup -->
          <vl-overlay class="feature-popup" v-for="feature in select.features" :key="feature.id" :id="feature.id" :position="pointOnSurface(feature.geometry)" :auto-pan="true" :auto-pan-animation="{ duration: 300 }">
            <template slot-scope="popup">
              <section class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Feature ID {{ feature.id }}
                  </p>
                  <a class="card-header-icon" title="Close"
                     @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)">
                    <b-icon icon="close"></b-icon>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    <p>
                      Overlay popup content for Feature with ID <strong>{{ feature.id }}</strong>
                    </p>
                    <p>
                      Popup: {{ JSON.stringify(popup) }}
                    </p>
                    <p>
                      Feature: {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}
                    </p>
                  </div>
                </div>
              </section>
            </template>
          </vl-overlay>
          <!--// selected popup -->
        </template>
      </vl-interaction-select>
      <!--// interactions -->

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
  import { findPointOnSurface } from 'vuelayers/lib/ol-ext'
export default {
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

      // features
      features: this.$store.state.poi.pointsOfInterst,

      // route
      route : this.$store.state.routes.routepoints,

      // popup of item
      selectedFeatures: [],
    }
  },
  // created
  created () {
    // make matrixids for fetching map
    this.matrixIds = [...new Array(21)].map((x, i) => { return 'SG-WEB MERCATOR:' + i })

    // get poi
    this.$store.dispatch('poi/setPointsOfInterst')

    // get route
    this.$store.dispatch('routes/setRoutepoints')
  },

  // methods
  methods: {
    updatePosition ($event) {
      this.geolocPosition = $event
    },
    pointOnSurface: findPointOnSurface
  }
}
</script>
<style scoped>
  .card-content{
    max-height: 20em;
    overflow: auto;
  }

  .feature-popup{
    position: absolute;
    left: -50px;
    bottom: 12px;
    width: 20em;
    max-width: none;
  }

  .content{
    word-break: break-all;
  }      
</style>
