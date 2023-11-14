export default {
    /*html*/
    template: `
    <table id="artistsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Country</th>
        </tr>
        <tr v-for="artist in artists">
            <td @click="getartist(artist.id)">{{ artist.name }}</td>
            <td>{{ artist.country }}</td>
        </tr>
    </table>
    `,
    emits: {
        showModal: (artist) => {
            console.log("Validation", artist)
            return artist.id && artist.name && artist.country
        }
    },
    data() {
        return {
            artists: []
        }
    },
    async created() {
        this.artists = await (await fetch("http://localhost:8080/artists")).json()
    },
    methods: {
        getArtist: async function (id) {
            const artistInModal = await (await fetch("http://localhost:8080/artists/" + id)).json()
            console.log("artistsList: ", artistInModal)
            this.$emit("showModal", artistInModal)
        }
    }
}