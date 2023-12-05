export default{
    /*html*/
    template: `
    <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td><input type="text" :value="name" @input="$emit('update:name',$event.target.value)"></td>
                    </tr>
                    <tr>
                        <th>Genre</th>
                        <td>
                            <select :value="genreid" @input="$emit('update:genreid',$event.target.value)">
                                <option disabled>Select a genre</option>
                                <option v-for="genre in genres" :value="genre.id">{{genre.name}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td>
                            <input type="date" :value="date_published" @input="$emit('update:date_published',$event.target.value)">
                        </td>
                    </tr>
                </table>
    `,
    props: ["id","name","genreid","date_published"],
    emits: ["update:name","update:genreid","update:date_published"],
    async created() {
        this.genres = await (await fetch(this.API_URL + "/genres")).json()
    },
    data() {
        return{
            genres:[]
        }
    },
}