import artistsList from "./ArtistsList.js"
import artistInfoModal from "./ArtistInfoModal.js"
export default {
    /*html*/
    template: `
    <artists-list @showModal="openModal"></artists-list>
    <artist-info-modal :artistInModal="artistInModal"></artist-info-modal>
    `,
    components: {
        artistsList: artistsList,
        artistInfoModal: artistInfoModal
    },
    data() {
        return {
            msg: 'Hello world!',
            artistInModal: { id: "", name: "", price: "" }
        }
    },
    methods: {
        openModal(artist) {
            this.artistInModal = artist
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        }
    }
}