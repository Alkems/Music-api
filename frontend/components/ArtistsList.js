export default {
    /*html*/
    template: `
    <table id="artistsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Country</th>
        </tr>
        <tr v-for="artist in artists">
            <td @click="getArtist(artist.id)">{{ artist.name }}</td>
            <td>{{ artist.country }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            artists: []
        }
    },
    async created() {
        this.artists = await (await fetch(this.API_URL + "/artists")).json()
    },
    methods: {
        getArtist: async function (id) {
            const artistinModal = await (await fetch(this.API_URL + "/artists/" + id)).json()
            this.$emit("showModal", artistinModal)
        },
    }
}