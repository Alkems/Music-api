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
                        <th>Role</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.role"></td>
                        <td v-else>{{songAlbumInModal.role}}</td>
                    </tr>
                    <tr>
                        <th>Artist Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.ArtistId"></td>
                        <td v-else>{{songAlbumInModal.ArtistId}}</td>
                    </tr>
                    <tr>
                        <th>Song Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSongAlbum.SongId"></td>
                        <td v-else>{{songAlbumInModal.SongId}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedSongAlbum">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-primary" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
    `,
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
        }
    }
}