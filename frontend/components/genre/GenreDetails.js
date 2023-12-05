export default {
    /*html*/
    template: `<table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{genreInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{genreInModal.name}}</td>
    </tr>

    <tr>
        <th>Songs</th>
        <div v-for="song in songs">
            {{song.name}}
        </div>
    </tr>
</table>`,
props:["genreInModal","songs"],
}