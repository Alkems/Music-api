export default{
    /*html*/
    template:`
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <td>{{artistInModal.id}}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{artistInModal.name}}</td>
        </tr>
        <tr>
            <th>Country</th>
            <td>{{artistInModal.country}}</td>
        </tr>
        <tr>
            <th>Songs</th>
            <div v-for="song in artistSongs">
                <!-- add delete button for songlink list -->
                {{song.name}} - {{song.ArtistSong.role}}
            </div>
        </tr>
    </table>
    `,
    props: ["artistInModal","artistSongs"]
}