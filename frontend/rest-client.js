import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import ChildComp from './ChildComp.js'

const app = createApp({
    data() {
      return {
          artistInModal: {id: null, name: null, country: null},
          artists: []
      }
    },
    async created() {
      this.artists = await (await fetch("http://localhost:8080/artists")).json();
    },
    methods: {
      getArtist: async function (id) {
          this.artistInModal = await (await fetch ('http://localhost:8080/artists/' + id)).json()
          let artistInfoModal = new bootstrap.Modal(document.getElementById('artistInfoModal'), {})
          artistInfoModal.show()
      }
    }
})

app.mount("#app")