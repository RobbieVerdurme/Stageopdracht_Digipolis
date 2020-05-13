export default {
  convertBackendDataPOI (data) {
    const dataFeatures = []
    for (const index in data.data) {
      const el = data.data[index]
      dataFeatures.push({
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
          link_nl: el.attributes.field_website.uri,
          symbol: null
        }
      })
    }
    return dataFeatures
  }
}
