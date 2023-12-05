export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{songAlbumInModal.id}}</td>
    </tr>
    <tr>
        <th>Track number</th>
        <td>{{songAlbumInModal.track_number}}</td>
    </tr>
    <tr>
        <th>Song</th>
        <td>{{song}}</td>
    </tr>
    <tr>
        <th>Album</th>
        <td>{{album}}</td>
    </tr>
</table>`,
props:["songAlbumInModal","song","album"],
}