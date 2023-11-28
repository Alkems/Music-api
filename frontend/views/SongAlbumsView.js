import songalbumsList from "../components/SongAlbumsList.js"
import songalbumInfoModal from "../components/SongAlbumInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Song Albums</h2>
    <songalbums-list :key="update" @showModal="openModal"></songalbums-list>
    <songalbum-info-modal @songAlbumUpdated="updateView" :songAlbumInModal="songAlbumInModal"></songalbum-info-modal>
    `,
    components: {
        songalbumsList: songalbumsList,
        songalbumInfoModal: songalbumInfoModal,
    },
    data() {
        return {
            update: 0,
            songAlbumInModal: { id: "", role: "", SongId: "", ArtistId: "" },
        }
    },
    methods: {
        openModal(songalbum) {
            this.songAlbumInfoModal = songalbum
            let songAlbumInfoModal = new bootstrap.Modal(document.getElementById("songAlbumInfoModal"))
            songAlbumInfoModal.show()
        },
        updateView(songalbum){
            this.update++
            this.songAlbumInModal = songalbum
        }
    }
}