import BootstrapDialog from 'lib/bootstrap-dialog';
import {Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Util from 'lib/util';


@inject(Router, Aurelia)
export class Login {
	email = 's@s';
	password = '12312313';
	loading = false;

	constructor(router, aurelia) {
		this.router = router;
		this.aurelia = aurelia;
		//Util.checkLogin(this.aurelia);
	}

	submit() {
		let myPostData = {
			email: this.email,
			password: this.password
		};
		self = this;
		self.loading = true;
		Util.ajaxRequest(myPostData, 'Login/Login',
			res => {
				let p = $.parseJSON(res)
				sessionStorage.setItem("antiForgeryToken", p.antiForgeryToken);
				this.aurelia.setRoot('app');
			},res => {
				console.log(res);
			},res => {
				self.loading = false;
			}
		)
	}
	
	register(){
		//this.router.navigate("signup");
		this.aurelia.setRoot('pages/signup')
	}
}