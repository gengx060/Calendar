import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import { datepicker } from 'jquery-ui';
//import 'jspm_packages/github/components/jqueryui@1.11.4/themes/base/jquery-ui.css!'

@customElement('datepicker')
@inject(Element)
//@bindable('value')
export class DatePicker {
	@bindable({ defaultBindingMode: bindingMode.twoWay }) dateValue = '10/23/2013';

	constructor(element) {
		this.element = element;
		//this.dateValue = '10/23/2013';
	}

	attached() {
		self = this;
		$(this.element).find('input#date-picker-3').datepicker()
			//.on('change', e => fireEvent(e.target, 'input'));
			.on('change', e => {
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
		$(this.element).datepicker('destroy')
		  .off('change');
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