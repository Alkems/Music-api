import { createApp } from 'vue'
import ChildComp from './ChildComp.js'
import App from './components/app.js'
const app = createApp(App)
createApp({
    components: {
        ChildComp
    },
    data() {
        return {
            artistInModal: { id: null, name: null, price: null },
            artists: [],
            childMsg: 'No child msg yet'
        }
    },
    async created() {
        this.artists = await (await fetch("http://localhost:8080/artists")).json()
    },
    methods: {
        getArtist: async function (id) {
            this.artistInModal = await (await fetch("http://localhost:8080/artists/" + id)).json()
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        }
    }
})

app.mount('#app')