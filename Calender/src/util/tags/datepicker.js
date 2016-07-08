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
		this.element = $(this.element).find('div div input');
		//this.dateValue = '10/23/2013';
	}

	attached() {
		let self = this;
		$(this.element).datepicker()
			//.on('change', e => fireEvent(e.target, 'input'));
			.on('changeDate', e => {
				let changeEvent = new CustomEvent('input', {
					detail: {
						value: e.val
					},
					bubbles: true
				});
				
				self.dateValue = e.currentTarget.value;
				self.element.dispatchEvent(changeEvent);
			});
	}

	detached() {
		try{
			$(this.element).datepicker('remove')
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