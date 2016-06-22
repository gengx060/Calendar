import BootstrapDialog from 'lib/bootstrap-dialog';
import {Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Util from 'lib/util';
import toastr  from 'lib/toastr'

@inject(Router, Aurelia)
export class Signup {
	
	email = 's@s';
	password1 = '12312313';
	password2 = '12312313';
	firstName = 'John';
	lastName = 'Lee';
	loading = false;
	
	constructor(router, aurelia) {
		this.router = router;
		this.aurelia = aurelia;
	}
	
	loginPage() {
		setTimeout(()=>this.aurelia.setRoot('pages/login'), 500);
	}

	submit1() {
		
		//BootstrapDialog.alert('Util.readCookie()');
		let myPostData = {
			email: this.email,
			password: this.password1,
			firstName: this.firstName,
			lastName: this.lastName
		};
		self = this;
		self.loading = true;
		
		//toastr.success("redirect to Login page!");
		
		//setTimeout(()=>this.aurelia.setRoot('pages/login'), 1000);
		
		//self.loading = false;
		//return;
		Util.ajaxRequest(myPostData, 'Login/Signup',
			res => { 
				toastr.success("redirect to Login page!");
				self.loading = false;
				setTimeout(()=>this.aurelia.setRoot('pages/login'), 500);
			},res => {
				let p = $.parseJSON(res.responseText)
				BootstrapDialog.alert(res.responseText);
				self.loading = false;
			},res => {
				self.loading = false;
			}
		)
	}
}