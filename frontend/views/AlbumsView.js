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
        }
    },
    methods: {
        openModal(album) {
            this.albumInModal = album
            let albumInfoModal = new bootstrap.Modal(document.getElementById("albumInfoModal"))
            albumInfoModal.show()
        },
        newAlbum(){
            this.albumInModal = {}
            let albumInfoModal = new bootstrap.Modal(document.getElementById("newAlbumModal"))
            albumInfoModal.show()
        },
        saveNewAlbum(){
            console.log(this.albumInModal)
        },
        updateView(album){
            this.update++
            this.albumInModal = album
        }
    }
}