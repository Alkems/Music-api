import artistsList from "../components/artist/ArtistsList.js"
import artistInfoModal from "../components/artist/ArtistInfoModal.js"
import artistForm from "../components/artist/ArtistForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <h2>Artists</h2>
    <button class="btn btn-secondary" @click="newArtist" >Create</button>
    <artists-list :key="update" @showModal="openModal"></artists-list>
    <artist-info-modal @artistUpdated="updateView" :artistInModal="artistInModal"></artist-info-modal>
    <new-object-modal id="newArtistModal" @save="saveNewArtist">
        <artist-form v-model:name="artistInModal.name" v-model:country="artistInModal.country"></artist-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        artistsList: artistsList,
        artistInfoModal: artistInfoModal,
        artistForm,
        newObjectModal
    },
    data() {
        return {
            update: 0,
            artistInModal: { id: "", name: "", country: "" },
            newArtistModal: {},
            error: ""
        }
    },
    methods: {
        openModal(artist) {
            this.artistInModal = artist
            let artistInfoModal = new bootstrap.Modal(document.getElementById("artistInfoModal"))
            artistInfoModal.show()
        },
        updateView(artist){
            this.update++
            this.artistInModal = artist
        },
        newArtist(){
            this.artistInModal = {}
            this.newArtistModal = new bootstrap.Modal(document.getElementById("newArtistModal"))
            this.newArtistModal.show()
        },
        async saveNewArtist(){
            console.log("Saving:", this.artistInModal)
            const rawResponse = await fetch(this.API_URL + "/artists/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.artistInModal)
            });

            if(rawResponse.ok){
                this.newArtistModal.hide()
                this.updateView(this.artistInModal)
            }else{
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }            
        },
    }
}