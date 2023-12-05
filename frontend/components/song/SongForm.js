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
                            <select v-model="genreid">
                                <option :value="null">No genre</option>
                                <option v-for="genre in genres" :value="genreid">{{genre.name}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td>
                            <input type="date" :value="formattedDate" @input="$emit('update:formattedDate',$event.target.value)">
                        </td>
                    </tr>
                </table>
    `,
    props: ["id","name","genreid","genres","formattedDate"],
    emits: ["update:name,update:genreid,update:formattedDate"]
}