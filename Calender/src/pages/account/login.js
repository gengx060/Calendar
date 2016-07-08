import BootstrapDialog from 'lib/bootstrap-dialog';
import {Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Util from 'lib/util';


@inject(Router, Aurelia)
export class Login {
	email = 's@s';
	password = '12312313';
	emailE = false;
	passwordE = false;
	loading = false;
	signupShow = false;

	constructor(router, aurelia) {
		this.router = router;
		this.aurelia = aurelia;
		//Util.checkLogin();
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
				Util.CurrentApp = 'app';
				sessionStorage.setItem("user", JSON.stringify({userid:p.userid, orgid : p.orgid}));
				//Util.User.userId =  p.userid;
				//Util.User.orgid =  p.orgid;
			},res => {
				if (res.responseText == '"Wrong username and password!"') {
					this.emailE = true;
					this.passwordE = true;
				}
				console.log(res);
			},res => {
				self.loading = false;
			}
		)
	}
	
	register(){
		this.signupShow = !this.signupShow;
		//this.router.navigate("signup");
		//this.aurelia.setRoot('pages/signup')
	}
}