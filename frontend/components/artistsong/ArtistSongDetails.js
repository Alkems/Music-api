export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{artistSongInModal.id}}</td>
    </tr>
    <tr>
        <th>Role</th>
        <td>{{artistSongInModal.role}}</td>
    </tr>
    <tr>
        <th>Artist</th>
        <td>{{artist}}</td>
    </tr>
    <tr>
        <th>Song</th>
        <td>{{song}}</td>
    </tr>
</table>`,
props:["artistSongInModal","song","artist"],
}