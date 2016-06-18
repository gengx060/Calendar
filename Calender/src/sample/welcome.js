
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {ViewFactory} from 'lib/view-factory';

//let httpClient1 = ViewFactory();

let httpClient = new HttpClient();
import $ from 'jquery';
import Util from 'lib/util';
//import {Modal} from 'util/tags/modal';

//$(".date-picker").datepicker();s
//@inject(Element)
@inject(Element, ViewFactory)
export class Welcome {
	viewHtml =
  `<template>
	<div class="modal show" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" click.delegate="toggle()">&times;</button>
					<h4 class="modal-title">Modal Header</h4>
				</div>
				<div class="modal-body">
					<p>\${message}.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" click.delegate="toggle()">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>`;

	viewModelJs = 
  `{ 
  message: 'hello world',
}`;
	//static inject = [DialogService];
	heading = 'Welcome to Aurelia!';
	firstName = 'John';
	lastName = 'Doe';
	date1 = '10/26/2013';
	number = 121

	constructor(element, viewFactory) {
		this.element = element;
		this.viewFactory = viewFactory
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
		let viewModel = null;
		this.fun3();
		try {
			eval('viewModel = ' + this.viewModelJs);
		}
		catch(e) {
			this.container.innerHTML = '<em style="color:red">Error parsing view model.</em>';
			return;
		}
		this.dispose = this.viewFactory.insert(this.container, this.viewHtml, viewModel);
	}
	 
	
	fun3() {
		if (this.dispose) {
			this.dispose();
			this.dispose = null;
		}
	}

	attached(){
		//this.myDialog.open();
	}
}