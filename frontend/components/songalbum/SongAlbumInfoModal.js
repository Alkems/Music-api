import confirmationModal from "../ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="songAlbumInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{songAlbumInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Track Number</th>
                        <td v-if="isEditing"><input type="number" v-model="modifiedSongAlbum.track_number"></td>
                        <td v-else>{{songAlbumInModal.track_number}}</td>
                    </tr>
                    <tr>
                        <th>Album</th>
                        <td v-if="isEditing">
                            <select v-model="modifiedSongAlbum.AlbumId">
                                <option v-for="album in albums" :value="album.id">{{album.name}}</option>
                            </select>
                        </td>
                        <td v-else>{{albumName}}</td>
                    </tr>
                    <tr>
                        <th>Song</th>
                        <td v-if="isEditing">
                            <select v-model="modifiedSongAlbum.SongId">
                                <option v-for="song in songs" :value="song.id">{{song.name}}</option>
                            </select>
                        </td>
                        <td v-else>{{songName}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedSongAlbum">Save</button>
                                <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="col me-auto"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<confirmation-modal :target="'#songAlbumInfoModal'" @confirmed="deleteSongAlbum" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits:["songAlbumUpdated"],
    props: {
        songAlbumInModal: {}
    },
    computed: {
        albumName:{
            get(){
                const album = this.albums.find(album => album.id == this.songAlbumInModal.AlbumId)
                if(album) return album.name
                return "";
            }
        },
        songName:{
            get(){
                const song = this.songs.find(song => song.id == this.songAlbumInModal.SongId)
                if(song) return song.name
                return "";
            }
        }
    },
    async created() {
        this.songs = await (await fetch(this.API_URL + "/songs")).json()
        this.albums = await (await fetch(this.API_URL + "/albums")).json()
    },
    data() {
        return{
            isEditing: false,
            modifiedSongAlbum:{},
            albums: [],
            songs: []
        }
    },
    methods: {
        startEditing(){
            this.modifiedSongAlbum = {...this.songAlbumInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedSongAlbum(){
            console.log("Saving:", this.modifiedSongAlbum)
            const rawResponse = await fetch(this.API_URL + "/songAlbums/" + this.modifiedSongAlbum.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedSongAlbum)
            });
            console.log(rawResponse);
            this.$emit("songAlbumUpdated", this.modifiedSongAlbum)
            this.isEditing = false
        },
        deleteSongAlbum(){
            console.log("Deleting:", this.songAlbumInModal);
            fetch(this.API_URL + "/songAlbums/" + this.songAlbumInModal.id, {
                method: 'DELETE'
            });
            this.$emit("songAlbumUpdated", {})
            this.isEditing = false
        }
    }
}