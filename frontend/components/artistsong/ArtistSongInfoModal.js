import confirmationModal from "../ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="artistSongInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{artistSongInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtistSong.role"></td>
                        <td v-else>{{artistSongInModal.role}}</td>
                    </tr>
                    <tr>
                        <th>Artist</th>
                        <td v-if="isEditing">
                            <select v-model="modifiedArtistSong.ArtistId">
                                <option v-for="artist in artists" :value="artist.id">{{artist.name}}</option>
                            </select>
                        </td>
                        <td v-else>{{artistName}}</td>
                    </tr>
                    <tr>
                        <th>Song</th>
                        <td v-if="isEditing">
                            <select v-model="modifiedArtistSong.SongId">
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
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedArtistSong">Save</button>
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
<confirmation-modal :target="'#artistSongInfoModal'" @confirmed="deleteArtistSong" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits:["artistSongUpdated"],
    props: {
        artistSongInModal: {}
    },
    computed: {
        artistName:{
            get(){
                const artist = this.artists.find(artist => artist.id == this.artistSongInModal.ArtistId)
                if(artist) return artist.name
                return "";
            }
        },
        songName:{
            get(){
                const song = this.songs.find(song => song.id == this.artistSongInModal.SongId)
                if(song) return song.name
                return "";
            }
        }
    },
    async created() {
        this.artists = await (await fetch(this.API_URL + "/artists")).json()
        this.songs = await (await fetch(this.API_URL + "/songs")).json()
    },
    data() {
        return{
            isEditing: false,
            modifiedArtistSong:{},
            artists: [],
            songs: []
        }
    },
    methods: {
        startEditing(){
            this.modifiedArtistSong = {...this.artistSongInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedArtistSong(){
            console.log("Saving:", this.modifiedArtistSong)
            const rawResponse = await fetch(this.API_URL + "/artistSongs/" + this.modifiedArtistSong.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedArtistSong)
            });
            console.log(rawResponse);
            this.$emit("artistSongUpdated", this.modifiedArtistSong)
            this.isEditing = false
        },
        deleteArtistSong(){
            console.log("Deleting:", this.artistSongInModal)
            fetch(this.API_URL + "/artistSongs/" + this.artistSongInModal.id, {
                method: 'DELETE'
            });
            this.$emit("artistSongUpdated", {})
            this.isEditing = false
        }
    }
}