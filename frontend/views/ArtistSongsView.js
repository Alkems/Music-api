import artistSongsList from "../components/artistsong/ArtistSongsList.js"
import artistSongInfoModal from "../components/artistsong/ArtistSongInfoModal.js"
import artistSongForm from "../components/artistsong/ArtistSongForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Artist Songs</h2>
    <button class="btn btn-secondary" @click="newArtistSong">Create</button>
    <artist-songs-list :key="update" @showModal="openModal"></artist-songs-list>
    <artist-song-info-modal @artistSongUpdated="updateView" :artistSongInModal="artistSongInModal"></artist-song-info-modal>
    <new-object-modal id="newArtistSongModal" @save="saveNewArtistSong">
        <artist-song-form v-model:role="artistSongInModal.role" v-model:artistId="artistSongInModal.ArtistId" v-model:songId="artistSongInModal.SongId"></artist-song-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        artistSongsList: artistSongsList,
        artistSongInfoModal: artistSongInfoModal,
        newObjectModal,
        artistSongForm
    },
    data() {
        return {
            update: 0,
            artistSongInModal: { id: "", role: "", SongId: "", ArtistId: "" },
            error: "",
            newArtistSongModal:{}
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
        },
        newArtistSong(){
            this.artistSongInModal = {}
            this.newArtistSongModal = new bootstrap.Modal(document.getElementById("newArtistSongModal"))
            this.newArtistSongModal.show()
        },
        async saveNewArtistSong(){
            console.log("Saving:", this.artistSongInModal)
            const rawResponse = await fetch(this.API_URL + "/artistSongs/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.artistSongInModal)
            });

            if(rawResponse.ok){
                this.newArtistSongModal.hide()
                this.updateView(this.artistSongInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}