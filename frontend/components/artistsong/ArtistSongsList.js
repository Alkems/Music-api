export default {
    /*html*/
    template: `
    <table id="artistSongsTable" class="table table-striped table-bordered">
        <tr>
            <th>Role</th>
            <th>Artist</th>
            <th>Song</th>
        </tr>
        <tr v-for="artistSong in artistSongs">
            <td @click="getArtistSong(artistSong.id)">{{ artistSong.role }}</td>
            <td>{{ artistSong.Artist.name }}</td>
            <td>{{ artistSong.Song.name }}</td>
        </tr>   
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            artistSongs: []
        }
    },
    async created() {
        this.artistSongs = await (await fetch("http://localhost:8080/artistSongs")).json()
    },
    methods: {
        getArtistSong: async function (id) {
            const artistSongInModal = await (await fetch(this.API_URL + "/artistSongs/" + id)).json()
            this.$emit("showModal", artistSongInModal)
        }
    }
}