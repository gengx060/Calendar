
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {ViewFactory} from 'lib/view-factory';
import $ from 'bootstrap';
import BootstrapDialog from 'lib/bootstrap-dialog';
//import {Compiler} from 'gooy/aurelia-compiler';

//let httpClient1 = ViewFactory();

let httpClient = new HttpClient();
//import $ from 'jquery';
import Util from 'lib/util';
//import {Modal} from 'util/tags/modal';

//$(".date-picker").datepicker();s
//@inject(Element)
@inject(Element, ViewFactory)
export class Welcome {
	//static inject = [DialogService];
	heading = 'Welcome to Aurelia!';
	firstName = 'John';
	lastName = 'Doe';
	date1 = '10/26/2013';
	number = 121;

	contacts = [{name:'hongyu li', img:'1', email:'i@1.com'},
				{name:'hongyu li', img:'2', email:'i@1.com'},
				{name:'hongyu li', img:'default', email:'i@1.com'},
				{name:'hongyu li', img:'default', email:'i@1.com'},
				{name:'hongyu li', img:'default', email:'i@1.com'},
				{name:'hongyu li', img:'default', email:'i@1.com'},
				{name:'hongyu li', img:'default', email:'i@1.com'}]

	//static inject = [Element,Compiler]
	constructor(element, viewFactory) {
		this.element = element;
		this.viewFactory = viewFactory;
		//this.dialogService = dialogService;
		console.log(this.element);
	}
	
	//activate() {
	//	BootstrapDialog.success('Goodbye data has been cleaned up !');
	//};

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	
	loadContacts() {
		Util.ajaxRequest({}, 'Contacts/GetContacts',
			res => {
				let p = $.parseJSON(res)
				console.log(res);
			},res => {
				console.log(res);
			}
		);
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
		//BootstrapDialog.alert('I want banana!');
		BootstrapDialog.show({
			message: 'I send ajax request!',
			buttons: [{
				icon: 'glyphicon glyphicon-send',
				label: 'Send ajax request',
				cssClass: 'btn-primary',
				autospin: true,
				action: function(dialogRef){
					dialogRef.enableButtons(false);
					dialogRef.setClosable(false);
					dialogRef.getModalBody().html('Dialog closes in 5 seconds.');
					setTimeout(function(){
						dialogRef.close();
					}, 5000);
				}
			}, {
				label: 'Close',
				action: function(dialogRef){
					dialogRef.close();
				}
			}]
		});
	}
	 
	
	fun3() {
		let viewHtml = `<template>
					
				<div class="modal" id="genericModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" click.delegate="toggle()">&times;</button>
								<h4 class="modal-title">\${message}</h4>
							</div>
							<div class="modal-body">
								<p>Some modal.</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" click.delegate="toggle()">Close</button>
							</div>
						</div>
					</div>
				</div>
				</template>`;
		//let viewHtml = `<template>
		//		<h1>\${message}</h1>
		//		<button click.delegate="fun1()">\$\{message\}</button>
		//	</template>`
		let viewModel = null;
		this.remove();
		self = this;
		let viewModelJs = { 
			  message: 'hello world',
			  toggle: function(){
			  	//$(self.embed).removeClass("show");
			  	$('div.modal').removeClass("show");
				//alert(1);
			  }
			};
		//eval('viewModel = ' + viewModelJs);
		this.embed = this.viewFactory.insert(this.element, viewHtml, viewModelJs);
		$('div.modal').addClass("show");
		//$('div.modal').removeClass("modal-backdrop");
		
		//BootstrapDialog.confirm('I want banana!', function(res) {
		//	if(res) {
		//		console.log(res);
		//	} else {
		//		alert(1212);
		//	}

	}
	remove() {
		if (this.embed) {
			this.embed.dispose();
			this.embed = null;
		}
	}

	attached(){
		//this.myDialog.open();
	}
	
	deactivate() {
		//BootstrapDialog.success('Goodbye data has been cleaned up !');
	};

}