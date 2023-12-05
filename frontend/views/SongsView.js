import songsList from "../components/song/SongsList.js"
import songInfoModal from "../components/song/SongInfoModal.js"
import songForm from "../components/song/SongForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Songs</h2>
    <button class="btn btn-secondary" @click="newSong" >Create</button>
    <songs-list :key="update" @showModal="openModal"></songs-list>
    <song-info-modal @songUpdated="updateView" :songInModal="songInModal"></song-info-modal>
    <new-object-modal id="newSongModal" @save="saveNewSong">
        <song-form v-model:name="songInModal.name" v-model:genreid="songInModal.GenreId" v-model:date_published="songInModal.date_published"></song-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        songsList: songsList,
        songInfoModal: songInfoModal,
        newObjectModal,
        songForm,
    },
    data() {
        return {
            update: 0,
            songInModal: { id: "", name: "", GenreId: "", date_published: "" },
            error: "",
            newSongModal:{}
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
            
        },
        newSong(){
            this.songInModal = {}
            this.newSongModal = new bootstrap.Modal(document.getElementById("newSongModal"))
            this.newSongModal.show()
        },
        async saveNewSong(){
            console.log("Saving:", this.songInModal)
            const rawResponse = await fetch(this.API_URL + "/songs/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.songInModal)
            });

            if(rawResponse.ok){
                this.newSongModal.hide()
                this.updateView(this.songInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}