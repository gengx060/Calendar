import {inject, bindable} from 'aurelia-framework';
import $ from 'jquery';

@inject(Element)
export class Modal {

	constructor(element) {
		console.log("constr");
		this.element = element;
	}
	attached(){
		console.log("attachedq");
		$(this.modal).modal();
	}
}