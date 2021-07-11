var EditEvent = /** @class */ (function () {
    function EditEvent() {
        var _this = this;
        this.dateTimeType = 'datetime-local';
        this.form = document.querySelector('#edit-event-form');
        this.eventNameInput = document.querySelector('#event-name');
        this.eventCreatorInput = document.querySelector('#event-creator');
        this.eventTypeInput = document.querySelector('#event-type');
        this.eventDateInput = document.querySelector('#event-date');
        this.eventDateStr = new Date(document.querySelector('#event-date-str').innerHTML).toISOString();
        this.nativePicker = document.querySelector('.nativeDateTimePicker');
        this.fallbackPicker = document.querySelector('.fallbackDateTimePicker');
        this.fallbackLabel = document.querySelector('.fallbackLabel');
        this.yearSelect = document.querySelector('#year');
        this.monthSelect = document.querySelector('#month');
        this.daySelect = document.querySelector('#day');
        this.hourSelect = document.querySelector('#hour');
        this.minuteSelect = document.querySelector('#minute');
        this.geteditEventData = function () {
            var monthNumber = _this.convertMonthToNumber(_this.monthSelect.value);
            var timeOfEvent = (_this.dateTimeType === 'datetime-local')
                ? _this.eventDateInput.value
                : _this.yearSelect.value + "-" + monthNumber + "-" + _this.daySelect.value + "T" + _this.hourSelect.value + ":" + _this.minuteSelect.value;
            _this.editEventData = {
                name: _this.eventNameInput.value,
                eventType: _this.eventTypeInput.value,
                creator: _this.eventCreatorInput.value,
                timeOfEvent: timeOfEvent
            };
        };
        this.init = function () {
            var t = _this.eventDateStr;
            _this.eventDateInput.value = t.substr(0, 16);
            _this.dateTimePolyFill();
            _this.onFormSubmit();
        };
        this.onFormSubmit = function () {
            _this.form && _this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (_this.eventNameInput && _this.eventNameInput.value
                    && _this.eventTypeInput && _this.eventTypeInput.value
                    && _this.eventTypeInput && _this.eventTypeInput.value) {
                    _this.geteditEventData();
                    _this.editEventRequest();
                }
            });
        };
        this.dateTimePolyFill = function () {
            // hide fallback initially
            _this.fallbackPicker.style.display = 'none';
            _this.fallbackLabel.style.display = 'none';
            // test whether a new datetime-local input falls back to a text input or not
            var test = document.createElement('input');
            try {
                test.type = 'datetime-local';
            }
            catch (e) {
                console.log(e.description);
            }
            // if it does, run the code inside the if() {} block
            if (test.type === 'text') {
                _this.dateTimeType = 'multiple-select';
                // hide the native picker and show the fallback
                _this.nativePicker.style.display = 'none';
                _this.fallbackPicker.style.display = 'block';
                _this.fallbackLabel.style.display = 'block';
                // populate the days and years dynamically
                // (the months are always the same, therefore hardcoded)
                _this.populateDays(_this.monthSelect.value);
                _this.populateYears();
                _this.populateMonths();
                _this.populateHours();
                _this.populateMinutes();
            }
            // when the month or year <select> values are changed, rerun this.populateDays()
            // in case the change affected the number of available days
            _this.yearSelect.onchange = function () {
                _this.populateDays(_this.monthSelect.value);
            };
            _this.monthSelect.onchange = function () {
                _this.populateDays(_this.monthSelect.value);
            };
            // update what day has been set to previously
            // see end of this.populateDays() for usage
            _this.daySelect.onchange = function () {
                _this.previousDay = Number.parseInt(_this.daySelect.value);
            };
        };
        this.populateDays = function (month) {
            // delete the current set of <option> elements out of the
            // day <select>, ready for the next set to be injected
            while (_this.daySelect.firstChild) {
                _this.daySelect.removeChild(_this.daySelect.firstChild);
            }
            // Create variable to hold new number of days to inject
            var dayNum;
            // 31 or 30 days?
            if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
                dayNum = 31;
            }
            else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
                dayNum = 30;
            }
            else {
                // If month is February, calculate whether it is a leap year or not
                var year = Number.parseInt(_this.yearSelect.value);
                var isLeap = new Date(year, 1, 29).getMonth() == 1;
                isLeap ? dayNum = 29 : dayNum = 28;
            }
            // inject the right number of new <option> elements into the day <select>
            for (var i = 1; i <= dayNum; i++) {
                var option = document.createElement('option');
                var day = (i < 10) ? "0" + i : "" + i;
                option.selected = (_this.eventDateStr.substr(8, 2) === day);
                option.textContent = day;
                _this.daySelect.appendChild(option);
            }
            // if previous day has already been set, set daySelect's value
            // to that day, to avoid the day jumping back to 1 when you
            // change the year
            if (_this.previousDay) {
                _this.daySelect.value = _this.previousDay.toString();
                // If the previous day was set to a high number, say 31, and then
                // you chose a month with less total days in it (e.g. February),
                // this part of the code ensures that the highest day available
                // is selected, rather than showing a blank daySelect
                if (_this.daySelect.value === "") {
                    _this.daySelect.value = "" + (_this.previousDay - 1);
                }
                if (_this.daySelect.value === "") {
                    _this.daySelect.value = "" + (_this.previousDay - 2);
                }
                if (_this.daySelect.value === "") {
                    _this.daySelect.value = "" + (_this.previousDay - 3);
                }
            }
        };
        this.populateMonths = function () {
            _this.monthSelect.innerHTML = '';
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            for (var i = 0; i < months.length; i++) {
                var option = document.createElement('option');
                option.selected = (_this.eventDateStr.substr(5, 2) === ("0" + (i + 1)));
                option.textContent = "" + months[i];
                _this.monthSelect.appendChild(option);
            }
        };
        this.populateYears = function () {
            // get this year as a number
            var date = new Date();
            var year = date.getFullYear();
            // Make this year, and the 100 years before it available in the year <select>
            for (var i = 100; i >= -100; i--) {
                var option = document.createElement('option');
                option.selected = (_this.eventDateStr.substr(0, 4) === ("" + (year - i)));
                option.textContent = "" + (year - i);
                _this.yearSelect.appendChild(option);
            }
        };
        this.populateHours = function () {
            // populate the hours <select> with the 24 hours of the day
            for (var i = 0; i <= 23; i++) {
                var option = document.createElement('option');
                var hour = "" + ((i < 10) ? ("0" + i) : i);
                option.selected = (_this.eventDateStr.substr(11, 2) === hour);
                option.textContent = hour;
                _this.hourSelect.appendChild(option);
            }
        };
        this.populateMinutes = function () {
            // populate the minutes <select> with the 60 hours of each minute
            for (var i = 0; i <= 59; i++) {
                var option = document.createElement('option');
                var minute = "" + ((i < 10) ? ("0" + i) : i);
                option.selected = (_this.eventDateStr.substr(14, 2) === minute);
                option.textContent = minute;
                _this.minuteSelect.appendChild(option);
            }
        };
        this.convertMonthToNumber = function (month) {
            var months = {
                'January': '01',
                'February': '02',
                'March': '03',
                'April': '04',
                'May': '05',
                'June': '06',
                'July': '07',
                'August': '08',
                'September': '09',
                'October': '10',
                'November': '11',
                'December': '12',
            };
            return months[month];
        };
        this.showModal = function (success, msg) {
            var addModalBtn = document.createElement('button');
            addModalBtn.setAttribute('type', 'button');
            addModalBtn.setAttribute('data-bs-toggle', 'modal');
            addModalBtn.setAttribute('data-bs-target', '#edit-event-modal');
            document.body.appendChild(addModalBtn);
            document.querySelector('#edit-event-modal-title').innerHTML = success ? 'Success' : 'Failure';
            document.querySelector('#edit-event-modal-body').innerHTML = msg;
            addModalBtn.click();
            document.body.removeChild(addModalBtn);
        };
        this.editEventRequest = function () {
            $.post("/api/event/edit/" + window.location.pathname.split('/')[3], _this.editEventData)
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
    return EditEvent;
}());
var editEvent = new EditEvent();
editEvent.init();
//# sourceMappingURL=edit-event.js.map