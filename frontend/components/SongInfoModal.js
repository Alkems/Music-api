export default {
    /*html*/
    template: `
<div id="songInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{songInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{{songInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Date Published</th>
                        <td>{{songInModal.date_published}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `,
    props: {
        songInModal: {}
    }
}