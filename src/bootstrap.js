import axios from 'axios'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
window.axios.defaults.baseURL = process.env.VUE_APP_API_URL