export default{
    /*html*/
    template:`
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
            <th>Country</th>
            <td><input type="text" :value="country" @input="$emit('update:country',$event.target.value)"></td>
        </tr>
        <tr v-if="isEditing">
            <th>Songs</th>
            <div v-for="song in artistSongs">
                <!-- add delete button for songlink list -->
                {{song.name}} - {{song.ArtistSong.role}} <button type="button" @click="this.$emit('unlinkSong',song.ArtistSong.id)">Remove</button>
            </div>
            <div class="col-auto">
                <!-- add select list for song id -->
                <select v-model="newArtistSong.SongId">
                    <option disabled value="">Select a song</option>
                    <option v-for="song in linkableSongs" :value="song.id">{{song.name}}</option>
                </select>
                <input type="text" v-model="newArtistSong.role" placeholder="Role">
                <button type="button" @click="this.$emit('linkSong')">Add</button>
            </div>
        </tr>
    </table>
    `,
    props:["name","country","artistSongs","linkableSongs","newArtistSong","id","isEditing"],
    emits:["update:name","update:country","unlinkSong","linkSong"]
}