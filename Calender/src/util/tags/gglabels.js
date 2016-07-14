import {BindingEngine, inject, customElement, bindable,bindingMode} from 'aurelia-framework';
import $ from 'jquery';

import Util from 'lib/util';

//@customElement('tag-it')
@inject(Element, BindingEngine)
export class Gglabels {
@bindable labels = [16];
@bindable labels1 = 16;

constructor(element, bindingEngine) {
		this.bindingEngine = bindingEngine;
		this.element = element;
		this.container = null;

		//this.subscriber = eventAggregator.subscribe('labels', this.labelsChanged);
		//this.subscription = this.bindingEngine.observerLocator.getArrayObserver(this.labels).subscribe(this.labelsChanged);
	}

	attached() {
		this.subscription = this.bindingEngine.observerLocator.getArrayObserver(this.labels).subscribe(this.labelsChanged);
	}

	labelsChanged(splices) {
		console.log(123);
	}
	
	remove(label) {
		let i = this.labels.indexOf(label);
		this.labels.splice(i, 1);
	}

	detached() {
		//this.subscription.dispose();
	}
}