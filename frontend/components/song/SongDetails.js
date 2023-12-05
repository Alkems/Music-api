export default{
    /*html*/
    template: `
    <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{modifiedSong.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{modifiedSong.name}}</td>
                    </tr>
                    <tr>
                        <th>Genre</th>
                        <td>{{genreName}}</td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td>
                            {{modifiedSong.date_published }}
                        </td>
                    </tr>
                    <tr>
                        <th>Albums</th>
                        <td v-for="album in albums">{{album.name}}</td>
                    </tr>
                </table>
    `,
    props: ["modifiedSong","albums","genreName"]
}