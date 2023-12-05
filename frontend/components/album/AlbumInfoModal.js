import confirmationModal from "../ConfirmationModal.js"
import albumForm from "./AlbumForm.js"
export default {
    /*html*/
    template: `
<div id="albumInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <album-form v-model:id="modifiedAlbum.id" v-model:name="modifiedAlbum.name"></album-form>
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{albumInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedAlbum.name"></td>
                        <td v-else>{{albumInModal.name}}</td>
                    </tr>

                    <tr>
                        <th>Songs</th>
                        <div v-for="song in songs">
                            {{song.SongAlbum.track_number}} - {{song.name}}
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
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedAlbum">Save</button>
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
<confirmation-modal :target="'#albumInfoModal'" @confirmed="deleteAlbum" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        albumForm
    },
    emits:["albumUpdated"],
    props: {
        albumInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedAlbum:{id:0,name:""},
            songs: []
        }
    },
    watch: {
        'albumInModal.id': function(newVal) {
            if (newVal) {
                this.fetchSongsForAlbum();
            }
        }
    },
    methods: {
        async fetchSongsForAlbum() {
            const album = await (await fetch(this.API_URL + "/albums/"+ this.albumInModal.id)).json();
            this.songs = album.Songs;
            this.songs.sort((a,b) => a.SongAlbum.track_number - b.SongAlbum.track_number);
        },
        startEditing(){
            this.modifiedAlbum = {...this.albumInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedAlbum(){
            console.log("Saving:", this.modifiedAlbum)
            const rawResponse = await fetch(this.API_URL + "/albums/" + this.modifiedAlbum.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedAlbum)
            });
            console.log(rawResponse);
            this.$emit("albumUpdated", this.modifiedAlbum)
            this.isEditing = false
        },
        deleteAlbum(){
            console.log("Deleting:", this.albumInModal);
            fetch(this.API_URL + "/albums/" + this.albumInModal.id, {
                method: 'DELETE'
            });
            this.$emit("albumUpdated", {})
            this.isEditing = false
        }
    }
}