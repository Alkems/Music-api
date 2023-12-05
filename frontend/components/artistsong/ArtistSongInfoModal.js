import confirmationModal from "../ConfirmationModal.js"
import artistSongDetails from "./ArtistSongDetails.js"
import artistSongForm from "./ArtistSongForm.js"
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
                <artist-song-form v-if="isEditing" v-model:id="modifiedArtistSong.id" v-model:role="modifiedArtistSong.role" v-model:artistId="modifiedArtistSong.ArtistId" v-model:songId="modifiedArtistSong.SongId" />
                <artist-song-details v-else v-model:artistSongInModal="artistSongInModal" v-model:artist="artistName" v-model:song="songName"/>
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
        confirmationModal,
        artistSongForm,
        artistSongDetails
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