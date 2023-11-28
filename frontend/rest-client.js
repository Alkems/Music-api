import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import ArtistsView from './views/ArtistsView.js'
import SongsView from './views/SongsView.js'

const routes = [
    { path: "/artists", component: ArtistsView },
    { path: "/songs", component: SongsView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')