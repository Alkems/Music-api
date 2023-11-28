import artistSongsList from "../components/ArtistSongsList.js"
import artistSongInfoModal from "../components/ArtistSongInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Artist Songs</h2>
    <artist-songs-list :key="update" @showModal="openModal"></artist-songs-list>
    <artist-song-info-modal @artistSongUpdated="updateView" :artistSongInModal="artistSongInModal"></artist-song-info-modal>
    `,
    components: {
        artistSongsList: artistSongsList,
        artistSongInfoModal: artistSongInfoModal,
    },
    data() {
        return {
            update: 0,
            artistSongInModal: { id: "", role: "", SongId: "", ArtistId: "" },
        }
    },
    methods: {
        openModal(artistSong) {
            this.artistSongInModal = artistSong
            let artistSongInfoModal = new bootstrap.Modal(document.getElementById("artistSongInfoModal"))
            artistSongInfoModal.show()
        },
        updateView(artistSong){
            this.update++
            this.artistSongInModal = artistSong
        }
    }
}