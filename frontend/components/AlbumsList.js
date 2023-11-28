export default {
    /*html*/
    template: `
    <table id="albumsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
        </tr>
        <tr v-for="album in albums">
            <td @click="getAlbum(album.id)">{{ album.name }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            albums: []
        }
    },
    async created() {
        this.albums = await (await fetch("http://localhost:8080/albums")).json()
    },
    methods: {
        getAlbum: async function (id) {
            const albuminModal = await (await fetch(this.API_URL + "/albums/" + id)).json()
            this.$emit("showModal", albuminModal)
        }
    }
}