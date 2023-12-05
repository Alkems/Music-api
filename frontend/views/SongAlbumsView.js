import songAlbumsList from "../components/songalbum/SongAlbumsList.js"
import songAlbumInfoModal from "../components/songalbum/SongAlbumInfoModal.js"
import songAlbumForm from "../components/songalbum/SongAlbumForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Song Albums</h2>
    <button class="btn btn-secondary" @click="newSongAlbum">Create</button>
    <song-albums-list :key="update" @showModal="openModal"></song-albums-list>
    <song-album-info-modal @songAlbumUpdated="updateView" :songAlbumInModal="songAlbumInModal"></song-album-info-modal>
    <new-object-modal id="newSongAlbumModal" @save="saveNewSongAlbum">
        <song-album-form v-model:track_number="songAlbumInModal.track_number" v-model:albumId="songAlbumInModal.AlbumId" v-model:songId="songAlbumInModal.SongId"></song-album-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        songAlbumsList: songAlbumsList,
        songAlbumInfoModal: songAlbumInfoModal,
        newObjectModal,
        songAlbumForm
    },
    data() {
        return {
            update: 0,
            songAlbumInModal: { id: "", track_number: "", SongId: "", AlbumId: "" },
            error: "",
            newSongAlbumModal:{}
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
        },
        newSongAlbum(){
            this.songAlbumInModal = {}
            this.newSongAlbumModal = new bootstrap.Modal(document.getElementById("newSongAlbumModal"))
            this.newSongAlbumModal.show()
        },
        async saveNewSongAlbum(){
            console.log("Saving:", this.songAlbumInModal)
            const rawResponse = await fetch(this.API_URL + "/songAlbums/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.songAlbumInModal)
            });

            if(rawResponse.ok){
                this.newSongAlbumModal.hide()
                this.updateView(this.songAlbumInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}