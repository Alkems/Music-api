import artistsList from "./ArtistsList.js"
import artistInfoModal from "./ArtistInfoModal.js"
import songsList from "./SongsList.js"
import songInfoModal from "./SongInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Artists</h2>
    <artists-list @showModal="openModal"></artists-list>
    <artist-info-modal :artistInModal="artistInModal"></artist-info-modal>
    <h2>Songs</h2>
    <songs-list @showModal="openModal"></songs-list>
    <song-info-modal :songInModal="songInModal"></song-info-modal>
    `,
    components: {
        artistsList: artistsList,
        artistInfoModal: artistInfoModal,
        songsList: songsList,
        songInfoModal: songInfoModal
    },
    data() {
        return {
            msg: 'Hello world!',
            artistInModal: { id: "", name: "", price: "" },
            songInModal: { id: "", name: "", date_published: "", genreId: ""}
        }
    },
    methods: {
        openModal(artist) {
            this.artistInModal = artist
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        },
        openModal(song) {
            this.songInModal = song
            let songInfoModal = new bootstrap.Modal(document.getElementById("songInfoModal"))
            songInfoModal.show()
        }
    }
}