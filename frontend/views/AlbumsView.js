import albumsList from "../components/album/AlbumsList.js"
import albumInfoModal from "../components/album/AlbumInfoModal.js"
import albumForm from "../components/album/AlbumForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Albums</h2>
    <button class="btn btn-secondary" @click="newAlbum" >Create</button>
    <albums-list :key="update" @showModal="openModal"></albums-list>
    <album-info-modal @albumUpdated="updateView" :albumInModal="albumInModal"></album-info-modal>
    <new-object-modal id="newAlbumModal" @save="saveNewAlbum">
        <album-form v-model:name="albumInModal.name"></album-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        albumsList: albumsList,
        albumInfoModal: albumInfoModal,
        newObjectModal,
        albumForm
    },
    data() {
        return {
            update: 0,
            albumInModal: { id: "", name: "" },
            newAlbumModal: {},
            error: ""
        }
    },
    methods: {
        openModal(album) {
            this.error = ""
            this.albumInModal = album
            let albumInfoModal = new bootstrap.Modal(document.getElementById("albumInfoModal"))
            albumInfoModal.show()
        },
        newAlbum(){
            this.albumInModal = {}
            this.newAlbumModal = new bootstrap.Modal(document.getElementById("newAlbumModal"))
            this.newAlbumModal.show()
        },
        async saveNewAlbum(){
            console.log("Saving:", this.albumInModal)
            const rawResponse = await fetch(this.API_URL + "/albums/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.albumInModal)
            });

            if(rawResponse.ok){
                this.newAlbumModal.hide()
                this.updateView(this.albumInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
        updateView(album){
            this.update++
            this.albumInModal = album
        }
    }
}