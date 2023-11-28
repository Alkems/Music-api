import artistsongssList from "../components/ArtistSongsList.js"
import artistsongInfoModal from "../components/ArtistInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Artist Songs</h2>
    <artistsongs-list :key="update" @showModal="openModal"></artistsongs-list>
    <artistsong-info-modal @artistUpdated="updateView" :artistsongInModal="artistInModal"></artistsong-info-modal>
    `,
    components: {
        artistsongsList: artistsongssList,
        artistsongInfoModal: artistsongInfoModal,
    },
    data() {
        return {
            update: 0,
            artistsongInModal: { id: "", role: "", SongId: "", ArtistId: "" },
        }
    },
    methods: {
        openModal(artistsong) {
            this.artistsongInModal = artistsong
            let artistsongInfoModal = new bootstrap.Modal(document.getElementById("artistsongInfoModal"))
            artistsongInfoModal.show()
        },
        updateView(artistsong){
            this.update++
            this.artistsongInModal = artistsong
        }
    }
}