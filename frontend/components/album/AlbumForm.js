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
    </table>`,
    props: ["id","name"],
    emits: ["update:name"]
}