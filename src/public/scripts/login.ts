
interface StorageUser {
	username: string;
	token: string;
}

class Login {
	loginData: { [key: string]: string };
	form: Element = document.querySelector('#login-form');
	usernameInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#login-username');
	passwordInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#login-password');

	getLoginData = (): void =>{
		this.loginData = {
			username: this.usernameInput.value,
			password: this.passwordInput.value
		};
	}
	init = (): void =>{
		this.form && this.form.addEventListener('submit', (e)=>{
			e.preventDefault();
			if(this.usernameInput && this.usernameInput.value && this.passwordInput && this.passwordInput.value){
				this.getLoginData();
				this.loginRequest();
			}
		});
	}
	loginRequest = (): void=>{
		$.post('/auth/login', this.loginData)
		 .done(response=>{
			if(response.data.token){
				const user: StorageUser = {
					token: response.data.token,
					username: response.data.username
				}
				localStorage.setItem('tix-user', JSON.stringify(user));
				this.usernameInput.value = '';
				this.passwordInput.value = '';
				this.getIndexPage();
			}
		 }).fail(err=>{
		 	const addModalBtn = document.createElement('button');
			addModalBtn.setAttribute('type', 'button');
			addModalBtn.setAttribute('data-bs-toggle', 'modal');
			addModalBtn.setAttribute('data-bs-target', '#login-error');
			document.body.appendChild(addModalBtn);
			addModalBtn.click();
			document.body.removeChild(addModalBtn);
		 	console.log(err);
		 });
	}
	getIndexPage = (): void =>{
		window.location.href = '/';
	}
}

const login = new Login();
login.init();
