import genresList from "../components/genre/GenresList.js"
import genreInfoModal from "../components/genre/GenreInfoModal.js"
import genreForm from "../components/genre/GenreForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Genres</h2>
    <button class="btn btn-secondary" @click="newGenre" >Create</button>
    <genres-list :key="update" @showModal="openModal"></genres-list>
    <genre-info-modal @genreUpdated="updateView" :genreInModal="genreInModal"></genre-info-modal>
    <new-object-modal id="newGenreModal" @save="saveNewGenre">
        <genre-form v-model:name="genreInModal.name"></genre-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        genresList: genresList,
        genreInfoModal: genreInfoModal,
        genreForm,
        newObjectModal
    },
    data() {
        return {
            update: 0,
            genreInModal: { id: "", name: "" },
            error:"",
            newGenreModal:{}
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
        },
        newGenre(){
            this.genreInModal = {}
            this.newGenreModal = new bootstrap.Modal(document.getElementById("newGenreModal"))
            this.newGenreModal.show()
        },
        async saveNewGenre(){
            console.log("Saving:", this.genreInModal)
            const rawResponse = await fetch(this.API_URL + "/genres/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.genreInModal)
            });

            if(rawResponse.ok){
                this.newGenreModal.hide()
                this.updateView(this.genreInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}