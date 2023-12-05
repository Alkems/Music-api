import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import ArtistsView from './views/ArtistsView.js'
import SongsView from './views/SongsView.js'
import GenresView from './views/GenresView.js'
import AlbumsView from './views/AlbumsView.js'
import ArtistSongsView from './views/ArtistSongsView.js'
import SongAlbumsView from './views/SongAlbumsView.js'
import HomeView from './views/HomeView.js'

const routes = [
    { path: "/artists", component: ArtistsView },
    { path: "/songs", component: SongsView },
    { path: "/genres", component: GenresView },
    { path: "/albums", component: AlbumsView },
    { path: "/artistsongs", component: ArtistSongsView },
    { path: "/songalbums", component: SongAlbumsView },
    { path: "/", component: HomeView}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')