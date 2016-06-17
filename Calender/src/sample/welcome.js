
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
//import {DialogService} from 'aurelia-dialog';

let httpClient = new HttpClient();
import $ from 'jquery';
import Util from 'lib/util';
//import {Modal} from 'util/tags/modal';

//$(".date-picker").datepicker();s
@inject(Element)
//@inject(DialogService)
export class Welcome {
	//static inject = [DialogService];
	heading = 'Welcome to Aurelia!';
	firstName = 'John';
	lastName = 'Doe';
	date1 = '10/26/2013';
	number = 121

	constructor(element) {
		this.element = element;
		//this.dialogService = dialogService;
		console.log(this.element);
	}
	
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
		this.dlg.open({
			viewModel: Confirm
			, model: {}
		})
	}
	 
	attached(){
		//this.myDialog.open();
	}
}