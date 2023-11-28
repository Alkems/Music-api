export default {
    /*html*/
    template: `
    <table id="songsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Genre Id</th>
            <th>Date published</th>
        </tr>
        <tr v-for="song in songs">
            <td @click="getSong(song.id)">{{ song.name }}</td>
            <td>{{ song.GenreId }}</td>
            <td>{{ song.date_published }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            songs: []
        }
    },
    async created() {
        this.songs = await (await fetch("http://localhost:8080/songs")).json()
    },
    methods: {
        getSong: async function (id) {
            const songinModal = await (await fetch(this.API_URL + "/songs/" + id)).json()
            this.$emit("showModal", songinModal)
        }
    }
}