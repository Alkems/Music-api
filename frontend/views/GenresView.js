import genresList from "../components/genre/GenresList.js"
import genreInfoModal from "../components/genre/GenreInfoModal.js"
export default {
    /*html*/
    template: `
    <h2>Genres</h2>
    <genres-list :key="update" @showModal="openModal"></genres-list>
    <genre-info-modal @genreUpdated="updateView" :genreInModal="genreInModal"></genre-info-modal>
    `,
    components: {
        genresList: genresList,
        genreInfoModal: genreInfoModal,
    },
    data() {
        return {
            update: 0,
            genreInModal: { id: "", name: "" },
        }
    },
    methods: {
        openModal(genre) {
            this.genreInModal = genre
            let genreInfoModal = new bootstrap.Modal(document.getElementById("genreInfoModal"))
            genreInfoModal.show()
        },
        updateView(genre){
            this.update++
            this.genreInModal = genre
        }
    }
}