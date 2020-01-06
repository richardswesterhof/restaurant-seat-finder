export default {
  mapboxToken: process.env.NODE_ENV === 'development' ? 'EXAMPLE_DEVELOPMENT_KEY' : process.env.DEPLOYMENT_MAPBOX_KEY,
  locationIqToken: process.env.NODE_ENV === 'development' ? 'EXAMPLE_DEVELOPMENT_KEY' : process.env.DEPLOYMENT_LOCATIONIQ_KEY,
}
