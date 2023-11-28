export default {
    /*html*/
    template: `
    <table id="genresTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
        </tr>
        <tr v-for="genre in genres">
            <td @click="getGenre(genre.id)">{{ genre.name }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            genres: []
        }
    },
    async created() {
        this.genres = await (await fetch("http://localhost:8080/genres")).json()
    },
    methods: {
        getGenre: async function (id) {
            const genreinModal = await (await fetch(this.API_URL + "/genre/" + id)).json()
            this.$emit("showModal", genreinModal)
        }
    }
}