//import {inject} from 'aurelia-framework';
//import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';

//@inject(HttpClient)
//export class Users {
//	heading = 'Github Users';
//	users = [];

//	constructor(http) {
//		http.configure(config => {
//			config
//			  .useStandardConfiguration()
//			  .withBaseUrl('https://api.github.com/');
//		});

//		this.http = http;
//	}

//	activate() {
//		return this.http.fetch('users')
//		  .then(response => response.json())
//		  .then(users => this.users = users);
//	}
//}

import BootstrapDialog from 'lib/bootstrap-dialog';
import Util from 'lib/util';

export class Login {
	email = 's@s';
	password = '12312313';
	loading = false;
	constructor() {
	}

	submit() {
		//Util.createCookie('this is a test', 0.1)
		
		//BootstrapDialog.alert(Util.readCookie());
		//return;
		let myPostData = {
			email: this.email,
			password: this.password
		};
		self = this;
		self.loading = true;
		Util.ajaxRequest(myPostData, 'Login/Login',
			res => {
				let p = $.parseJSON(res)
				self.firstName = p.id;
				self.lastName = p.name;
				BootstrapDialog.alert(res);
			},res => {
				console.log(res);
			},res => {
				self.loading = false;
			}
		)
	}
}