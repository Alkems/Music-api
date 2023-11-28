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
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{genreInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input type="text" v-model="modifiedGenre.name"></td>
                        <td v-else>{{genreInModal.name}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedGenre">Save</button>
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
    emits:["genreUpdated"],
    props: {
        genreInModal: {}
    },
    data() {
        return{
            isEditing: false,
            modifiedGenre:{}
        }
    },
    methods: {
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
        }
    }
}