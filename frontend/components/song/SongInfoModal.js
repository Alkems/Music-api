import confirmationModal from "../ConfirmationModal.js"
import songDetails from "./SongDetails.js"
import songForm from "./SongForm.js"
export default {
    /*html*/
    template: `
<div id="songInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <song-form v-if="isEditing" v-model:id="modifiedSong.id" v-model:name="modifiedSong.name" v-model:genreid="modifiedSong.GenreId" v-model:genres="genres" v-mode:formattedDate="formattedDate"/>
                <song-details v-else v-model:modifiedSong="modifiedSong" v-model:genreName="genreName" />
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedSong">Save</button>
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
<confirmation-modal :target="'#songInfoModal'" @confirmed="deleteSong" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        songForm,
        songDetails,
    },
    emits:["songUpdated"],
    props: {
        songInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedSong:{},
            genres:[],
            albums:[]
        }
    },
    watch: {
        'songInModal.id': function(newVal) {
            if (newVal) {
                this.fetchAlbums();
            }
        }
    },
    computed: {
        //fix date formatting so it works with <input type="date">
        formattedDate: {
          get() {
            return this.modifiedSong.date_published ? new Date(this.modifiedSong.date_published).toISOString().split('T')[0] : null;
          },
          set(value) {
            this.modifiedSong.date_published = value;
          }
        },
        genreName:{
            get(){
                if(this.songInModal.GenreId == null) return "No Genre";
                const genre = this.genres.find(genre => genre.id == this.songInModal.GenreId)
                if(genre) return genre.name
                return "";
            }
        }
    },
    async created() {
        this.genres = await (await fetch(this.API_URL + "/genres")).json()
    },
    methods: {
        async fetchAlbums() {
            const song = await (await fetch(this.API_URL + "/songs/"+ this.songInModal.id)).json();
            this.albums = song.Albums;
        },
        startEditing(){
            this.modifiedSong = {...this.songInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedSong(){
            console.log("Saving:", this.modifiedSong)
            const rawResponse = await fetch(this.API_URL + "/songs/" + this.modifiedSong.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedSong)
            });
            console.log(rawResponse);

            this.$emit("songUpdated", this.modifiedSong)

            this.isEditing = false
        },
        deleteSong(){
            console.log("Deleting:", this.songInModal);
            fetch(this.API_URL + "/songs/" + this.songInModal.id, {
                method: 'DELETE'
            });
            this.$emit("songUpdated", {})
            this.isEditing = false
        }
    }
}