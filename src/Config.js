export default {
  env: 'dev',
  local: {
    apiBaseUrl: process.env.REACT_APP_LOCAL_SERVER,
    mapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    appId: process.env.REACT_APP_ID,
    codeId: process.env.REACT_APP_CODE
  },
  dev: {
    apiBaseUrl: process.env.REACT_APP_DEV_SERVER,
    mapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    appId: process.env.REACT_APP_ID,
    codeId: process.env.REACT_APP_CODE
  },
  production: {
    apiBaseUrl: process.env.REACT_APP_DEV_SERVER,
    mapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    appId: process.env.REACT_APP_ID,
    codeId: process.env.REACT_APP_CODE
  }
}
