export default {
    /*html*/
    template: `
    <table id="artistsongsTable" class="table table-striped table-bordered">
        <tr>
            <th>Role</th>
            <th>Artist Id</th>
            <th>Song Id</th>
        </tr>
        <tr v-for="artistsong in artistsongs">
            <td @click="getArtistSong(artistsong.id)">{{ artistsong.role }}</td>
            <td>{{ artistsong.ArtistId }}</td>
            <td>{{ artistsong.SongId }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            artistsongs: []
        }
    },
    async created() {
        this.artistsongs = await (await fetch("http://localhost:8080/artistsongs")).json()
    },
    methods: {
        getArtistSong: async function (id) {
            const artistSongInModal = await (await fetch(this.API_URL + "/artistsongs/" + id)).json()
            this.$emit("showModal", artistSongInModal)
        }
    }
}