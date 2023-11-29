import songsList from "../components/SongsList.js"
import songInfoModal from "../components/SongInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Songs</h2>
    <songs-list :key="update" @showModal="openModal"></songs-list>
    <song-info-modal @songUpdated="updateView" :songInModal="songInModal"></song-info-modal>
    `,
    components: {
        songsList: songsList,
        songInfoModal: songInfoModal,
    },
    data() {
        return {
            update: 0,
            songInModal: { id: "", name: "", GenreId: "", date_published: "" },
        }
    },
    methods: {
        openModal(song) {
            this.songInModal = song
            let songInfoModal = new bootstrap.Modal(document.getElementById("songInfoModal"))
            songInfoModal.show()
        },
        updateView(song){
            this.update++
            this.songInModal = song
            
        }
    }
}