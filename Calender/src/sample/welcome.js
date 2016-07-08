
import {HttpClient, json} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {ViewFactory} from 'lib/view-factory';
import $ from 'bootstrap';
import BootstrapDialog from 'lib/bootstrap-dialog';

import template1 from "pages/user/edit.html!text";
import {Edit1} from "pages/user/edit.js";

console.log(Edit1);
let httpClient = new HttpClient();
import Util from 'lib/util';

//@inject(Element)
@inject(Element, ViewFactory)
export class Welcome {
	//static inject = [DialogService];
	heading = 'Welcome to Aurelia!';
	firstName = 'John';
	lastName = 'Doe';
	date1 = '10/26/2013';
	editShow = 0;

	contacts = null;
	contacts1 = [{name:'hongyu li', img:'1', email:'i@1.com'},
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
		//console.log(this.element);
		this.loadContacts()
		this.edit = Edit1;
		//debugger;
	}
	
	activate() {
		this.loadContacts()
	};

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	
	loadContacts() {
		let req = {};
		req.user = Util.user();
		Util.ajaxRequest(req, 'Contacts/GetContacts',
			res => {
				let p = $.parseJSON(res)
				this.contacts = p.contacts;
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
		
		let viewHtml = template1;
		let viewModelJs = Edit1;
		//this.embed = this.viewFactory.createView(viewHtml, viewModelJs);
		//let i = 1;
		this.embed = this.viewFactory.insert(this.element, viewHtml, viewModelJs);
		
		//BootstrapDialog.alert('I want banana!');
		//BootstrapDialog.show({
		//	message: 'I send ajax request!',
		//	buttons: [{
		//		icon: 'glyphicon glyphicon-send',
		//		label: 'Send ajax request',
		//		cssClass: 'btn-primary',
		//		autospin: true,
		//		action: function(dialogRef){
		//			dialogRef.enableButtons(false);
		//			dialogRef.setClosable(false);
		//			dialogRef.getModalBody().html('Dialog closes in 5 seconds.');
		//			setTimeout(() => dialogRef.close(), 5000);
		//		}
		//	}, {
		//		label: 'Close',
		//		action: function(dialogRef){
		//			dialogRef.close();
		//		}
		//	}]
		//});
	}
	 
	
	fun3() {
		let viewHtml = template1;
		let viewModelJs = template1js;
		//this.embed = this.viewFactory.insert(this.element, viewHtml, viewModelJs);
		
		//debugger
		//return;
		////let viewHtml = `<template>
		////		<h1>\${message}</h1>
		////		<button click.delegate="fun1()">\$\{message\}</button>
		////	</template>`
		//let viewModel = null;
		//this.remove();
		//self = this;
		//let viewModelJs = { 
		//	  message: 'hello world',
		//	  toggle: function(){
		//	  	//$(self.embed).removeClass("show");
		//	  	$('div.modal').removeClass("show");
		//		//alert(1);
		//	  }
		//	};
		//eval('viewModel = ' + viewModelJs);
		this.embed = this.viewFactory.insert(this.element, viewHtml, viewModelJs);
		//$('div.modal').addClass("show");
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
	
	activate(params) {
		if (params.editshow == 1) {
			this.editShow = 1;
		} else {
			this.editShow = 0;
		}
	}

	attached(){
		//debugger;
		//this.myDialog.open();
	}
	
	determineActivationStrategy(params){
		if (params.editshow == 1) {
			this.editShow = 1;
		} else {
			this.editShow = 0;
		}
	}
	deactivate() {
		//BootstrapDialog.success('Goodbye data has been cleaned up !');
	};

}