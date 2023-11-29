import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="artistInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{artistInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtist.name"></td>
                        <td v-else>{{artistInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtist.country"></td>
                        <td v-else>{{artistInModal.country}}</td>
                    </tr>
                    <tr>
                        <th>Songs</th>
                        <div v-for="song in artistSongs">
                            <!-- add delete button for songlink list -->
                            {{song.name}} - {{song.ArtistSong.role}} <button type="button" class="btn btn-danger mx-2" @click="unlinkSongFromArtist(song.ArtistSong.id)">Delete</button>
                        </div>
                        <div class="col-auto" v-if="isEditing">
                            <!-- add select list for song id -->
                            <select v-model="newArtistSong.SongId">
                                <option disabled value="">Select a song</option>
                                <option v-for="song in linkableSongs" :value="song.id">{{song.name}}</option>
                            </select>
                            <input type="text" v-model="newArtistSong.role" placeholder="Role">
                            <button type="button" class="btn btn-success mx-2" @click="linkSongToArtist">Add</button>
                        </div>
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
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedArtist">Save</button>
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
<confirmation-modal :target="'#artistInfoModal'" @confirmed="deleteArtist" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits:["artistUpdated"],
    props: {
        artistInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedArtist:{},
            artistSongs: [],
            linkableSongs: [],
            newArtistSong:{}
        }
    },
    watch: {
        'artistInModal.id': function(newVal) {
            if (newVal) {
                this.fetchSongs();
            }
        }
    },
    methods: {
        async linkSongToArtist() {
            this.newArtistSong.ArtistId = this.artistInModal.id;
            console.log("Linking:", this.newArtistSong);
            const response = await fetch(this.API_URL + "/artistSongs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newArtistSong)
            });
            this.newArtistSong = {};
            this.isEditing = false;
            this.fetchSongs();
        },
        async unlinkSongFromArtist(songId) {
            console.log("Unlinking:", songId);
            const response = await fetch(this.API_URL + "/artistSongs/" + songId, {
                method: 'DELETE'
            });
            this.fetchSongs();
        },
        async fetchSongs() {
            const artist = await (await fetch(this.API_URL + "/artists/"+ this.artistInModal.id)).json();
            this.artistSongs = artist.Songs;
            const songs = await (await fetch(this.API_URL + "/songs")).json();
            //filter so you cant link songs that are already linked.
            this.linkableSongs = songs.filter(song => !this.artistSongs.some(artistSong => artistSong.id === song.id));
        },
        startEditing(){
            this.modifiedArtist = {...this.artistInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedArtist(){
            console.log("Saving:", this.modifiedArtist)
            const rawResponse = await fetch(this.API_URL + "/artists/" + this.modifiedArtist.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedArtist)
            });
            console.log(rawResponse);
            this.$emit("artistUpdated", this.modifiedArtist)
            this.isEditing = false
        },
        deleteArtist(){
            console.log("Deleting:", this.artistInModal);
            fetch(this.API_URL + "/artists/" + this.artistInModal.id, {
                method: 'DELETE'
            });
            this.$emit("artistUpdated", {})
            this.isEditing = false
        }
    }
}