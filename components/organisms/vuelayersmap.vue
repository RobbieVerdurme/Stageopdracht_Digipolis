<template>
  <div class="stores">
    <vl-map ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :data-projection="dataProjection" @mounted="onMapMounted">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
      <!-- interactions -->
      <vl-interaction-select :features.sync="selectedFeatures">
        <template slot-scope="select">
          <!-- selected feature popup -->
          <vl-overlay
            v-for="feature in select.features"
            :id="feature.id"
            :key="feature.id"
            class="feature-popup"
            :position="pointOnSurface(feature.geometry)"
            :auto-pan="true"
            :auto-pan-animation="{ duration: 300 }"
          >
            <header>
              <h3>
                {{ feature.id.includes('position')?'Huidige locatie':feature.properties.naam_nl }}
              </h3>
              <button class="ol-popup__closer" aria-label="Sluiten" @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)" />
            </header>
            <div v-if="!feature.id.includes('position')">
              <p v-html="feature.properties.omschrijving_nl" />
              <div v-if="!feature.geometry.type.localeCompare('Point')">
                <nuxt-link v-if="!isNaN(feature.properties.volgnummer)" class="read-more standalone-link" :to="{name: 'poi-id', params: {id: feature.properties.volgnummer}}">
                  Lees meer
                </nuxt-link>
              </div>
              <div v-else>
                <nuxt-link class="read-more standalone-link" :to="{name: 'index'}">
                  Lees meer
                </nuxt-link>
              </div>
            </div>
            <div v-else>
              <p>Dit is uw huidige locatie</p>
            </div>
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
      <vl-layer-vector :z-index="2">
        <vl-source-vector :features="pointsOfIntrest" :projection="dataProjectionPoi" />
        <vl-style-func :factory="styleFuncFactory" />
      </vl-layer-vector>
      <!--/POI-->

      <!--INFOPOINT-->
      <vl-layer-vector :z-index="1">
        <vl-source-vector :features.sync="infoPOI" :projection="dataProjectionPoi" />
        <!--Style-->
        <vl-style-box>
          <vl-style-icon src="../images/info.png" :anchor="[0.5, 1]" />
        </vl-style-box>
      </vl-layer-vector>
      <!--/INFOPOINT-->

      <!--Route-->
      <vl-layer-vector :z-index="1">
        <vl-source-vector :features.sync="myRoute" />
        <!--Style-->
        <vl-style-box>
          <vl-style-stroke color="black" :width="3" />
        </vl-style-box>
      </vl-layer-vector>
      <!--/Route-->
    </vl-map>
  </div>
</template>

<script>
import { findPointOnSurface, createStyle } from 'vuelayers/lib/ol-ext'

export default {
  props: {
    infoFeatures: {
      type: Array,
      required: true
    },
    features: {
      type: Array,
      required: true
    },
    route: {
      type: Array,
      required: true
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

      // popup of item
      selectedFeatures: [],

      // Config features
      dataProjectionPoi: 'EPSG:4326',

      // features
      myRoute: this.route,
      pointsOfIntrest: this.features,
      infoPOI: this.infoFeatures
    }
  },
  // created
  created () {
    // make matrixids for fetching map
    this.matrixIds = [...new Array(21)].map((x, i) => { return 'SG-WEB MERCATOR:' + i })
  },
  // methods
  methods: {
    styleFuncFactory () {
      return (feature) => {
        return createStyle({
          // image* keys for ol/style/Image style to style points
          imageRadius: 10,
          imageFillColor: 'white',
          imageStrokeColor: 'blue',
          text: feature.values_.volgnummer.toString()
        })
      }
    },
    /**
     * updates positin marker on the map
     */
    updatePosition ($event) {
      this.geolocPosition = $event
    },
    pointOnSurface: findPointOnSurface,
    onMapMounted (vlMap) {
      // vlMap here is an instance of vl-map component
      vlMap.refresh()
    }
  }
}
</script>
<style scoped>
  .stores {
    height: 70vh;
  }

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
    background-color: white;
    padding: 1rem;
    border-radius: .2rem;
  }

  .content{
    word-break: break-all;
  }

  .ol-popup__closer {
    position: absolute;
    top: .4rem;
    right: .4rem;
    width: 1.6rem;
    height: 1.6rem;
    border: 0;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22.5' height='22.5' viewBox='0 0 32 32'%3E\a     %3Cpath fill='%2323333a' fill-rule='evenodd' d='M18.121 16l6.44-6.439a1.5 1.5 0 0 0-2.122-2.122L16 13.879l-6.44-6.44a1.501 1.501 0 0 0-2.12 2.122L13.88 16l-6.44 6.439a1.5 1.5 0 0 0 2.12 2.122l6.44-6.44 6.44 6.44c.292.293.676.439 1.06.439s.767-.146 1.06-.439a1.5 1.5 0 0 0 0-2.122L18.121 16z'/%3E\a%3C/svg%3E\a") no-repeat center;
    cursor: pointer;
  }
</style>
