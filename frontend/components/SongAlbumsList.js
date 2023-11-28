export default {
    /*html*/
    template: `
    <table id="songalbumTable" class="table table-striped table-bordered">
        <tr>
            <th>Track Number</th>
            <th>Album Id</th>
            <th>Song Id</th>
        </tr>
        <tr v-for="songalbum in songalbums">
            <td @click="getSongAlbum(songalbum.id)">{{ songalbum.track_number }}</td>
            <td>{{ songalbum.AlbumId }}</td>
            <td>{{ songalbum.SongId }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            songalbums: []
        }
    },
    async created() {
        this.songalbums = await (await fetch("http://localhost:8080/songalbums")).json()
    },
    methods: {
        getSongAlbum: async function (id) {
            const songAlbumInModal = await (await fetch(this.API_URL + "/songalbums/" + id)).json()
            console.log(songAlbumInModal)
            this.$emit("showModal", songAlbumInModal)
        }
    }
}