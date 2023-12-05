import confirmationModal from "../ConfirmationModal.js"
import artistDetails from "./ArtistDetails.js"
import artistForm from "./ArtistForm.js"
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
                <artist-form v-if="isEditing" v-model:name="modifiedArtist.name" v-model:country="modifiedArtist.country" v-model:artistSongs="artistSongs" v-model:linkableSongs="linkableSongs" v-model:newArtistSong="newArtistSong"/>
                <artist-details v-else v-model:artistInModal="artistInModal" v-model:artistSongs="artistSongs"/>
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
        confirmationModal,
        artistDetails,
        artistForm
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
            //this.isEditing = false;
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