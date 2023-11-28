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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{songInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSong.name"></td>
                        <td v-else>{{songInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Genre Id</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSong.GenreId"></td>
                        <td v-else>{{songInModal.GenreId}}</td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedSong.date_published"></td>
                        <td v-else>{{songInModal.date_published}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedSong">Save</button>
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
    emits:["songUpdated"],
    props: {
        songInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedSong:{}
        }
    },
    methods: {
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
        }
    }
}