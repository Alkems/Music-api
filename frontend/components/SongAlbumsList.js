export default {
    /*html*/
    template: `
    <table id="songAlbumTable" class="table table-striped table-bordered">
        <tr>
            <th>Track Number</th>
            <th>Album Id</th>
            <th>Song Id</th>
        </tr>
        <tr v-for="songAlbum in songAlbums">
            <td @click="getSongAlbum(songAlbum.id)">{{ songAlbum.track_number }}</td>
            <td>{{ songAlbum.AlbumId }}</td>
            <td>{{ songAlbum.SongId }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            songAlbums: []
        }
    },
    async created() {
        this.songAlbums = await (await fetch("http://localhost:8080/songAlbums")).json()
    },
    methods: {
        getSongAlbum: async function (id) {
            const songAlbumInModal = await (await fetch(this.API_URL + "/songAlbums/" + id)).json()
            console.log(songAlbumInModal)
            this.$emit("showModal", songAlbumInModal)
        }
    }
}