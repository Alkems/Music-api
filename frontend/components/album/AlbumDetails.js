export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{albumInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{albumInModal.name}}</td>
    </tr>

    <tr>
        <th>Songs</th>
        <div v-for="song in songs">
            {{song.SongAlbum.track_number}} - {{song.name}}
        </div>
    </tr>
</table>`,
props:["albumInModal","songs"],
}