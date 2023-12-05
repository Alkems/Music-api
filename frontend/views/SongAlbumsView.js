import songAlbumsList from "../components/songalbum/SongAlbumsList.js"
import songAlbumInfoModal from "../components/songalbum/SongAlbumInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Song Albums</h2>
    <song-albums-list :key="update" @showModal="openModal"></song-albums-list>
    <song-album-info-modal @songAlbumUpdated="updateView" :songAlbumInModal="songAlbumInModal"></song-album-info-modal>
    `,
    components: {
        songAlbumsList: songAlbumsList,
        songAlbumInfoModal: songAlbumInfoModal,
    },
    data() {
        return {
            update: 0,
            songAlbumInModal: { id: "", track_number: "", SongId: "", AlbumId: "" },
        }
    },
    methods: {
        openModal(songAlbum) {
            this.songAlbumInModal = songAlbum
            let songAlbumInfoModal = new bootstrap.Modal(document.getElementById("songAlbumInfoModal"))
            songAlbumInfoModal.show()
        },
        updateView(songAlbum){
            this.update++
            this.songAlbumInModal = songAlbum
        }
    }
}