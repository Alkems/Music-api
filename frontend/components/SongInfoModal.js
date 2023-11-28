import confirmationModal from "./ConfirmationModal.js"
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
                        <td v-if="isEditing"><input type="number" v-model="modifiedSong.GenreId"></td>
                        <td v-else>{{songInModal.GenreId}}</td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td v-if="isEditing">
                            <input type="date" v-model="formattedDate">
                        </td>
                        <td v-else>
                            {{ songInModal.date_published }}
                        </td>
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
        confirmationModal
    },
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
    computed: {
        //fix date formatting so it works with <input type="date">
        formattedDate: {
          get() {
            return this.modifiedSong.date_published ? new Date(this.modifiedSong.date_published).toISOString().split('T')[0] : null;
          },
          set(value) {
            this.modifiedSong.date_published = value;
          },
        },
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