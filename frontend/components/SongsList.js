export default {
    /*html*/
    template: `
    <table id="songsTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Date Published</th>
            <th>Genre Id</th>
        </tr>
        <tr v-for="song in songs">
            <td @click="getSong(song.id)">{{ song.name }}</td>
            <td>{{ song.date_published }}</td>
            <td>{{ song.GenreId }}</td>
        </tr>
    </table>
    `,
    emits: {
        showModal: (song) => {
            console.log("Validation", song)
            return song.id && song.name && song.date_published && song.genre_id
        }
    },
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
            const songInModal = await (await fetch("http://localhost:8080/songs/" + id)).json()
            console.log("songsList: ", songInModal)
            this.$emit("showModal", songInModal)
        }
    }
}