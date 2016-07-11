import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
//import { datepicker } from 'jquery-ui';
import $ from 'bootstrap';
import Datepicker from 'lib/bootstrap-datepicker';

@customElement('datepicker')
@inject(Element)
//@bindable('value')
export class DatePicker {
	@bindable({ defaultBindingMode: bindingMode.twoWay }) dateValue = '10/22/2013';

	constructor(element) {
		this.element = element;
		//this.dateValue = '10/23/2013';
		this.dateElement = null;
	}

	attached() {
		let self = this
		this.dateElement = $(this.element).find('div div input');
		$(this.dateElement).datepicker()
			//.on('change', e => fireEvent(e.target, 'input'));
			.on('changeDate', e => {
				let changeEvent = new CustomEvent('input', {
					detail: {
						value: e.val
					},
					bubbles: true
				});
				
				this.dateValue = e.currentTarget.value;
				this.element.dispatchEvent(changeEvent);
			});
	}

	detached() {
		try{
			$(this.dateElement).datepicker('remove')
			  .off('changeDate');
		}catch(e){
			alert(e);
		}
	}
}

function createEvent(name) {
	var event = document.createEvent('Event');
	event.initEvent(name, true, true);
	return event;
}

function fireEvent(element, name) {
	var event = createEvent(name, {
		detail: {
			value: e.val
		},
		bubbles: true
	});
	element.dispatchEvent(event);
}


//import {inject, customAttribute} from 'aurelia-framework';

//@customAttribute('datepicker')
//@inject(Element)
//export class DatePicker {
//	constructor(element) {
//		this.element = element;
//	}
  
//	attached() {
//		$(this.element).datepicker()
//		  .on('change', e => fireEvent(e.target, 'input'));
    
//	}
  
//	detached() {
//		$(this.element).datepicker('destroy')
//		  .off('change');
//	}
//}

//function createEvent(name) {
//	var event = document.createEvent('Event');
//	event.initEvent(name, true, true);
//	return event;
//}

//function fireEvent(element, name) {
//	var event = createEvent(name);
//	element.dispatchEvent(event);
//}