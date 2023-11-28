import artistsongsList from "../components/ArtistSongsList.js"
import artistsongInfoModal from "../components/ArtistSongInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Artist Songs</h2>
    <artistsongs-list :key="update" @showModal="openModal"></artistsongs-list>
    <artistsong-info-modal @artistSongUpdated="updateView" :artistSongInModal="artistSongInModal"></artistsong-info-modal>
    `,
    components: {
        artistsongsList: artistsongsList,
        artistsongInfoModal: artistsongInfoModal,
    },
    data() {
        return {
            update: 0,
            artistSongInModal: { id: "", role: "", SongId: "", ArtistId: "" },
        }
    },
    methods: {
        openModal(artistsong) {
            this.artistSongInModal = artistsong
            let artistsongInfoModal = new bootstrap.Modal(document.getElementById("artistsongInfoModal"))
            artistsongInfoModal.show()
        },
        updateView(artistsong){
            this.update++
            this.artistSongInModal = artistsong
        }
    }
}