
import {HttpClient, json} from 'aurelia-fetch-client';
let httpClient = new HttpClient();
import $ from 'jquery';
import Util from 'util';

//$(".date-picker").datepicker();
//@inject(HttpClient)
export class Welcome {
	heading = 'Welcome to Aurelia!';
	firstName = 'John';
	lastName = 'Doe';
	date1 = '10/26/2013';

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	fun1() {
		let myPostData = {
			id: 101
		};
		self = this;
		Util.ajaxRequest(myPostData, 'Sample/Test2',
			res => {
				let p = $.parseJSON(res)
				self.firstName = p.id;
				self.lastName = p.name;
				console.log(res);
			},res => {
				console.log(res);
			}
		);
	}
	
	fun2() {
		console.log(this);
	}

	submit() {
		alert(`Welcome, ${this.fullName}!`);
	}
}