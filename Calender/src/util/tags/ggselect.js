﻿import {bindable, inject, customElement} from 'aurelia-framework';

// Import JSPM modules we installed earlier
import $ from 'jquery';
import 'lib/select2';
import 'assets/css/select2.css!text'

@customElement('ggselect') // Define the name of our custom element
@inject(Element) // Inject the instance of this element

export class Ggselect {

@bindable name = null; // The name of our custom select
@bindable selected = false; // The default selected value
@bindable options = {}; // The label/option values

	constructor(element) {
		this.element = element;
	}

	// Once the Custom Element has its DOM instantiated and ready for binding
	// to happenings within the DOM itself
	attached() {
		$(this.element).find('select')
		.select2()
		.on('change', (event) => {
			let changeEvent;

			if (window.CustomEvent) {
				changeEvent = new CustomEvent('change', {
					detail: {
						value: event.target.value
					},
					bubbles: true
				});
			} else {
				changeEvent = document.createEvent('CustomEvent');
				changeEvent.initCustomEvent('change', true, true, {
					detail: {
						value: event.target.value
					}
				});
			}
			this.element.dispatchEvent(changeEvent);
		});
	}
}