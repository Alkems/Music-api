import albumsList from "../components/AlbumsList.js"
import albumInfoModal from "../components/AlbumInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Albums</h2>
    <albums-list :key="update" @showModal="openModal"></albums-list>
    <album-info-modal @albumUpdated="updateView" :albumInModal="albumInModal"></album-info-modal>
    `,
    components: {
        albumsList: albumsList,
        albumInfoModal: albumInfoModal,
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
        updateView(album){
            this.update++
            this.albumInModal = album
        }
    }
}