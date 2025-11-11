let apiRoot = ''
if (process.env.BUILD_MODE == 'dev') {
  apiRoot = 'http://localhost:8022'
}
if (process.env.BUILD_MODE == 'production') {
  apiRoot = 'https://trello-api-1-gpkm.onrender.com'
}
export const API_ROOT = apiRoot