export default{
    /*html*/
    template: `
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <td>{{id}}</td>
        </tr>
        <tr>
            <th>Track Number</th>
            <td><input type="number" :value="track_number" @input="$emit('update:track_number',$event.target.value)"></td>
        </tr>
        <tr>
            <th>Song</th>
            <td>
                <select :value="songId" @input="$emit('update:songId',$event.target.value)">
                    <option v-for="song in songs" :value="song.id">{{song.name}}</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>Album</th>
            <td>
                <select :value="albumId" @input="$emit('update:albumId',$event.target.value)">
                    <option v-for="album in albums" :value="album.id">{{album.name}}</option>
                </select>
            </td>
        </tr>
    </table>`,
    props: ["id","track_number","songId","albumId"],
    emits: ["update:track_number","update:songId","update:albumId"],
    async created() {
        this.songs = await (await fetch(this.API_URL + "/songs")).json()
        this.albums = await (await fetch(this.API_URL + "/albums")).json()
    },
    data() {
        return{
            songs:[],
            albums:[]
        }
    },
}