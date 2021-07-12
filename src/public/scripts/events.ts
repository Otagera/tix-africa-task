class Events {
	deleteBtns = document.querySelectorAll('.event-delete-btn');
	init = ()=>{
		this.onDeleteClick();
	}
	onDeleteClick = (): void=>{
	this.deleteBtns && this.deleteBtns.forEach((deleteBtn)=>{
			deleteBtn.addEventListener('click', (e)=>{
				this.deleteEventRequest(deleteBtn.getAttribute('data-id'));
			});
		});
	}
	showModal = (success: boolean, msg: string): void =>{
		const addModalBtn = document.createElement('button');
		addModalBtn.setAttribute('type', 'button');
		addModalBtn.setAttribute('data-bs-toggle', 'modal');
		addModalBtn.setAttribute('data-bs-target', '#events-modal');
		document.body.appendChild(addModalBtn);
		document.querySelector('#events-modal-title').innerHTML = success? 'Success': 'Failure';
		document.querySelector('#events-modal-body').innerHTML = msg;
		addModalBtn.click();
		document.body.removeChild(addModalBtn);
	}

	deleteEventRequest = (id: string): void =>{
		$.ajax(`/api/event/delete/${id}`, {
			method: 'delete'
		})
		 .done(response=>{
		 	if(response.statusCode === 200){
		 		this.showModal(true, response.data.message);
		 	}
		 }).fail(err=>{
	 		this.showModal(false, 'Something went wrong');
		 	console.log(err);
		 });
	}
}

const events = new Events();
events.init();