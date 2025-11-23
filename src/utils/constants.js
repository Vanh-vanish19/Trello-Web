let apiRoot = ''
if (process.env.BUILD_MODE == 'dev') {
  apiRoot = 'http://localhost:8022'
}
if (process.env.BUILD_MODE == 'production') {
  apiRoot = 'https://trello-web-puce-mu.vercel.app'
}
export const API_ROOT = apiRoot


export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12