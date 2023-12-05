import confirmationModal from "../ConfirmationModal.js"
import genreDetails from "./GenreDetails.js";
import genreForm from "./GenreForm.js";
export default {
    /*html*/
    template: `
<div id="genreInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <genre-form v-if="isEditing" v-model:name="modifiedGenre.name" v-model:id="modifiedGenre.id" />
                <genre-details v-else v-model:genreInModal="genreInModal" v-model:songs="songs" />
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedGenre">Save</button>
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
<confirmation-modal :target="'#genreInfoModal'" @confirmed="deleteGenre" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        genreForm,
        genreDetails,
    },
    emits:["genreUpdated"],
    props: {
        genreInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedGenre:{},
            songs: []
        }
    },
    watch: {
        'genreInModal.id': function(newVal) {
            if (newVal) {
                this.fetchSongs();
            }
        }
    },
    methods: {
        async fetchSongs() {
            const genre = await (await fetch(this.API_URL + "/genres/"+ this.genreInModal.id)).json();
            this.songs = genre.Songs;
        },
        startEditing(){
            this.modifiedGenre = {...this.genreInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedGenre(){
            console.log("Saving:", this.modifiedGenre)
            const rawResponse = await fetch(this.API_URL + "/genres/" + this.modifiedGenre.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedGenre)
            });
            console.log(rawResponse);
            this.$emit("genreUpdated", this.modifiedGenre)
            this.isEditing = false
        },
        deleteGenre(){
            console.log("Deleting:", this.genreInModal)
            fetch(this.API_URL + "/genres/" + this.genreInModal.id, {
                method: 'DELETE'
            });
            this.$emit("genreUpdated", {})
            this.isEditing = false
        }
    }
}