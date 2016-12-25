/*Default configuration, in case nothing is passed in from server*/
const env = process ? process.env : {
  NODE_ENV: 'development',
  API_ROOT: 'http://localhost:8001'
}

const config = {
  development: {
    API_ROOT: env.API_ROOT
  }
}

export default config[env.NODE_ENV]
