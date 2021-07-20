export default {
  env: process.env.REACT_APP_ENV || 'development',
  development: {
    apiBaseUrl: process.env.REACT_APP_DEV_SERVER,
    mapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    appId: process.env.REACT_APP_ID,
    codeId: process.env.REACT_APP_CODE
  },
  production: {
    apiBaseUrl: process.env.REACT_APP_PROD_SERVER,
    mapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    appId: process.env.REACT_APP_ID,
    codeId: process.env.REACT_APP_CODE
  }
}
