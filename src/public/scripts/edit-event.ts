interface EventI {
	name: string;
	eventType: string;
	creator: string;
	timeOfEvent: string;
}
class EditEvent {
	//preserve day selection
	previousDay: number;
	editEventData: EventI;
	dateTimeType = 'datetime-local';
	form: Element = document.querySelector('#edit-event-form');
	eventNameInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#event-name');
	eventCreatorInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#event-creator');
	eventTypeInput: HTMLSelectElement = <HTMLSelectElement>document.querySelector('#event-type');
	eventDateInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#event-date');

	eventDateStr = new Date(document.querySelector('#event-date-str').innerHTML).toISOString();

	nativePicker: HTMLElement = document.querySelector('.nativeDateTimePicker');
	fallbackPicker: HTMLElement = document.querySelector('.fallbackDateTimePicker');
	fallbackLabel: HTMLElement = document.querySelector('.fallbackLabel');

	yearSelect: HTMLSelectElement = document.querySelector('#year');
	monthSelect: HTMLSelectElement = document.querySelector('#month');
	daySelect: HTMLSelectElement = document.querySelector('#day');
	hourSelect: HTMLSelectElement = document.querySelector('#hour');
	minuteSelect: HTMLSelectElement = document.querySelector('#minute');

	geteditEventData = (): void =>{
		const monthNumber = this.convertMonthToNumber(this.monthSelect.value);
		const timeOfEvent = (this.dateTimeType === 'datetime-local')
													? this.eventDateInput.value
													: `${this.yearSelect.value}-${monthNumber}-${this.daySelect.value}T${this.hourSelect.value}:${this.minuteSelect.value}`
		this.editEventData = {
			name: this.eventNameInput.value,
			eventType: this.eventTypeInput.value,
			creator: this.eventCreatorInput.value,
			timeOfEvent
		};
	}
	init = (): void =>{
		const t = this.eventDateStr;
		this.eventDateInput.value = t.substr(0, 16);
		this.dateTimePolyFill();
		this.onFormSubmit();
	}

	onFormSubmit = (): void =>{
		this.form && this.form.addEventListener('submit', (e)=>{
			e.preventDefault();
			if(this.eventNameInput && this.eventNameInput.value
					&& this.eventTypeInput && this.eventTypeInput.value
					&& this.eventTypeInput && this.eventTypeInput.value
			){
				this.geteditEventData();
				this.editEventRequest();
			}
		});
	}

	dateTimePolyFill = (): void =>{
		// hide fallback initially
		this.fallbackPicker.style.display = 'none';
		this.fallbackLabel.style.display = 'none';

		// test whether a new datetime-local input falls back to a text input or not
		const test = document.createElement('input');

		try {
		  test.type = 'datetime-local';
		} catch (e) {
		  console.log(e.description);
		}

		// if it does, run the code inside the if() {} block
		if(test.type === 'text') {
			this.dateTimeType = 'multiple-select';
		  // hide the native picker and show the fallback
		  this.nativePicker.style.display = 'none';
		  this.fallbackPicker.style.display = 'block';
		  this.fallbackLabel.style.display = 'block';

		  // populate the days and years dynamically
		  // (the months are always the same, therefore hardcoded)
		  this.populateDays(this.monthSelect.value);
		  this.populateYears();
		  this.populateMonths();
		  this.populateHours();
		  this.populateMinutes();
		}

		// when the month or year <select> values are changed, rerun this.populateDays()
		// in case the change affected the number of available days
		this.yearSelect.onchange = ()=> {
		  this.populateDays(this.monthSelect.value);
		}

		this.monthSelect.onchange = ()=> {
		  this.populateDays(this.monthSelect.value);
		}

		// update what day has been set to previously
		// see end of this.populateDays() for usage
		this.daySelect.onchange = ()=> {
		  this.previousDay = Number.parseInt(this.daySelect.value);
		}
	}
	populateDays = (month) => {
	  // delete the current set of <option> elements out of the
	  // day <select>, ready for the next set to be injected
	  while(this.daySelect.firstChild){
	    this.daySelect.removeChild(this.daySelect.firstChild);
	  }

	  // Create variable to hold new number of days to inject
	  let dayNum;

	  // 31 or 30 days?
	  if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
	    dayNum = 31;
	  } else if(month === 'April' || month === 'June' || month === 'September' || month === 'November') {
	    dayNum = 30;
	  } else {
	  // If month is February, calculate whether it is a leap year or not
	    let year = Number.parseInt(this.yearSelect.value);
	    let isLeap = new Date(year, 1, 29).getMonth() == 1;
	    isLeap ? dayNum = 29 : dayNum = 28;
	  }

	  // inject the right number of new <option> elements into the day <select>
	  for(let i = 1; i <= dayNum; i++) {
	    const option = document.createElement('option');
	    const day = (i < 10)? `0${i}`: `${i}`
	    option.selected = (this.eventDateStr.substr(8, 2) === day);
	    option.textContent = day;
	    this.daySelect.appendChild(option);
	  }

	  // if previous day has already been set, set daySelect's value
	  // to that day, to avoid the day jumping back to 1 when you
	  // change the year
	  if(this.previousDay) {
	    this.daySelect.value = this.previousDay.toString();

	    // If the previous day was set to a high number, say 31, and then
	    // you chose a month with less total days in it (e.g. February),
	    // this part of the code ensures that the highest day available
	    // is selected, rather than showing a blank daySelect
	    if(this.daySelect.value === "") {
	      this.daySelect.value = `${this.previousDay - 1}`;
	    }

	    if(this.daySelect.value === "") {
	      this.daySelect.value = `${this.previousDay - 2}`;
	    }

	    if(this.daySelect.value === "") {
	      this.daySelect.value = `${this.previousDay - 3}`;
	    }
	  }
	}
	populateMonths = (): void => {
		this.monthSelect.innerHTML = '';
	  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	  for(let i = 0; i < months.length; i++) {
	    const option = document.createElement('option');
	    option.selected = (this.eventDateStr.substr(5, 2) === (`0${i+1}`));
	    option.textContent = `${months[i]}`;
	    this.monthSelect.appendChild(option);
	  }
	}
	populateYears = (): void => {
	  // get this year as a number
	  const date = new Date();
	  const year = date.getFullYear();

	  // Make this year, and the 100 years before it available in the year <select>
	  for(let i = 100; i >= -100; i--) {
	    const option = document.createElement('option');
	    option.selected = (this.eventDateStr.substr(0, 4) === (`${year-i}`));
	    option.textContent = `${year-i}`;
	    this.yearSelect.appendChild(option);
	  }
	}
	populateHours = (): void => {
	  // populate the hours <select> with the 24 hours of the day
	  for(let i = 0; i <= 23; i++) {
	    const option = document.createElement('option');
	    const hour = `${(i < 10) ? ("0" + i) : i}`;
	    option.selected = (this.eventDateStr.substr(11, 2) === hour);
	    option.textContent = hour;
	    this.hourSelect.appendChild(option);
	  }
	}
	populateMinutes = (): void => {
	  // populate the minutes <select> with the 60 hours of each minute
	  for(let i = 0; i <= 59; i++) {
	    const option = document.createElement('option');
	    const minute = `${(i < 10) ? ("0" + i) : i}`;
	    option.selected = (this.eventDateStr.substr(14, 2) === minute);
	    option.textContent = minute;
	    this.minuteSelect.appendChild(option);
	  }
	}
	convertMonthToNumber = (month: string): string => {
		const months = {
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
	}
	showModal = (success: boolean, msg: string): void =>{
		const addModalBtn = document.createElement('button');
		addModalBtn.setAttribute('type', 'button');
		addModalBtn.setAttribute('data-bs-toggle', 'modal');
		addModalBtn.setAttribute('data-bs-target', '#edit-event-modal');
		document.body.appendChild(addModalBtn);
		document.querySelector('#edit-event-modal-title').innerHTML = success? 'Success': 'Failure';
		document.querySelector('#edit-event-modal-body').innerHTML = msg;
		addModalBtn.click();
		document.body.removeChild(addModalBtn);
	}

	editEventRequest = (): void =>{
		$.post(`/api/event/edit/${window.location.pathname.split('/')[3]}`, this.editEventData)
		 .done(response=>{
		 	if(response.statusCode === 200){
		 		this.showModal(true, response.data.message);
		 	}
		 }).fail(err=>{
	 		this.showModal(false, 'Something went wrong');
		 	console.log(err);
		 });}
}

const editEvent = new EditEvent();
editEvent.init();