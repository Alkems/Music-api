export default {
    /*html*/
    template: `
<div id="artistsongInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{artistsongInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtistSong.role"></td>
                        <td v-else>{{artistsongInModal.role}}</td>
                    </tr>
                    <tr>
                        <th>Artist Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtistSong.ArtistId"></td>
                        <td v-else>{{artistsongInModal.ArtistId}}</td>
                    </tr>
                    <tr>
                        <th>Song Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtistSong.SongId"></td>
                        <td v-else>{{artistsongInModal.SongId}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedArtistSong">Save</button>
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
    emits:["artistsongUpdated"],
    props: {
        artistsongInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedArtistSong:{}
        }
    },
    methods: {
        startEditing(){
            this.modifiedArtistSong = {...this.artistsongInModal}
            this.isEditing = true
        },
        cancelEditing(){
            this.isEditing = false
        },
        async saveModifiedArtistSong(){
            console.log("Saving:", this.modifiedArtistSong)
            const rawResponse = await fetch(this.API_URL + "/artists/" + this.modifiedArtist.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedArtistSong)
            });
            console.log(rawResponse);
            this.$emit("artistsongUpdated", this.modifiedArtistSong)
            this.isEditing = false
        }
    }
}