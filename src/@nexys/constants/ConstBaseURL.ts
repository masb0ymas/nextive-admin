const env = process.env.URL_ENV ?? 'development'

const mapApiUrl = {
  development: 'http://localhost:8000/v1',
  staging: 'https://api-sandbox.example.id/v1',
  production: 'https://api.example.id/v1',
}

const BASE_API_URL = mapApiUrl[env]
const BASE_API_FILE = mapApiUrl[env].replace('/v1', '')

export { BASE_API_URL, BASE_API_FILE }
