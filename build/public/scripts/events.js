var Events = /** @class */ (function () {
    function Events() {
        var _this = this;
        this.deleteBtns = document.querySelectorAll('.event-delete-btn');
        this.init = function () {
            _this.onDeleteClick();
        };
        this.onDeleteClick = function () {
            _this.deleteBtns && _this.deleteBtns.forEach(function (deleteBtn) {
                deleteBtn.addEventListener('click', function (e) {
                    _this.deleteEventRequest(deleteBtn.getAttribute('data-id'));
                });
            });
        };
        this.showModal = function (success, msg) {
            var addModalBtn = document.createElement('button');
            addModalBtn.setAttribute('type', 'button');
            addModalBtn.setAttribute('data-bs-toggle', 'modal');
            addModalBtn.setAttribute('data-bs-target', '#events-modal');
            document.body.appendChild(addModalBtn);
            document.querySelector('#events-modal-title').innerHTML = success ? 'Success' : 'Failure';
            document.querySelector('#events-modal-body').innerHTML = msg;
            addModalBtn.click();
            document.body.removeChild(addModalBtn);
        };
        this.deleteEventRequest = function (id) {
            $.ajax("/api/event/delete/" + id, {
                method: 'delete'
            })
                .done(function (response) {
                if (response.statusCode === 200) {
                    _this.showModal(true, response.data.message);
                }
            }).fail(function (err) {
                _this.showModal(false, 'Something went wrong');
                console.log(err);
            });
        };
    }
    return Events;
}());
var events = new Events();
events.init();
//# sourceMappingURL=events.js.map