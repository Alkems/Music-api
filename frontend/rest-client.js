import { createApp } from 'vue'
import App from './App.js'
const app = createApp(App)
app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')