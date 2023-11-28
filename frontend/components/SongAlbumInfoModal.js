import confirmationModal from "./ConfirmationModal.js"
export default {
    /*html*/
    template: `
<div id="songalbumInfoModal" class="modal" tabindex="-1">
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
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.track_number"></td>
                        <td v-else>{{songAlbumInModal.track_number}}</td>
                    </tr>
                    <tr>
                        <th>Album Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.AlbumId"></td>
                        <td v-else>{{songAlbumInModal.AlbumId}}</td>
                    </tr>
                    <tr>
                        <th>Song Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.SongId"></td>
                        <td v-else>{{songAlbumInModal.SongId}}</td>
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
<confirmation-modal :target="'#songalbumInfoModal'" @confirmed="deleteSongAlbum" @canceldelete="cancelEditing"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits:["songAlbumUpdated"],
    props: {
        songAlbumInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedSongAlbum:{}
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