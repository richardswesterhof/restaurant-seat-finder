export default {
  mapboxToken: process.env.NODE_ENV === 'development' ? 'EXAMPLE_DEVELOPMENT_KEY' : process.env.VUE_APP_MAPBOX_KEY,
  locationIqToken: process.env.NODE_ENV === 'development' ? 'EXAMPLE_DEVELOPMENT_KEY' : process.env.VUE_APP_LOCATIONIQ_KEY,
}
