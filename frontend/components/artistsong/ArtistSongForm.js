export default{
    /*html*/
    template: `
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <td>{{id}}</td>
        </tr>
        <tr>
            <th>Role</th>
            <td><input type="text" :value="role" @input="$emit('update:role',$event.target.value)"></td>
        </tr>
        <tr>
            <th>Artist</th>
            <td>
                <select :value="artistId" @input="$emit('update:artistId',$event.target.value)">
                    <option v-for="artist in artists" :value="artist.id">{{artist.name}}</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>Song</th>
            <td>
                <select :value="songId" @input="$emit('update:songId',$event.target.value)">
                    <option v-for="song in songs" :value="song.id">{{song.name}}</option>
                </select>
            </td>
        </tr>
    </table>`,
    props: ["id","role","songId","artistId"],
    emits: ["update:role","update:songId","update:artistId"],
    async created() {
        this.songs = await (await fetch(this.API_URL + "/songs")).json()
        this.artists = await (await fetch(this.API_URL + "/artists")).json()
    },
    data() {
        return{
            songs:[],
            artists:[]
        }
    },
}