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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{artistInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtist.name"></td>
                        <td v-else>{{artistInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedArtist.country"></td>
                        <td v-else>{{artistInModal.country}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedArtist">Save</button>
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
    emits:["artistUpdated"],
    props: {
        artistInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedArtist:{}
        }
    },
    methods: {
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
        }
    }
}