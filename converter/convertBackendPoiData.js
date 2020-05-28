export default {
  convertBackendDataPOI (data) {
    return data.map(el => ({
      type: 'Feature',
      id: el.id,
      geometry: {
        type: el.attributes.field_coordinates.geo_type,
        coordinates: [el.attributes.field_coordinates.lon, el.attributes.field_coordinates.lat]
      },
      geometry_name: 'SHAPE',
      properties: {
        volgnummer: el.attributes.field_index,
        naam_nl: el.attributes.title,
        omschrijving_nl: el.attributes.field_introduction.value,
        detail_nl: el.attributes.field_main_content.value,
        symbol: null,
        heroimage: null
      }
    }))
  },

  convertBackendDataInfoPOI ({ data }) {
    return data.map(el => ({
      type: 'Feature',
      id: el.id,
      geometry: {
        type: el.attributes.field_coordinates.geo_type,
        coordinates: [el.attributes.field_coordinates.lon, el.attributes.field_coordinates.lat]
      },
      geometry_name: 'SHAPE',
      properties: {
        volgnummer: el.id,
        naam_nl: el.attributes.title
      }
    }))
  }
}
