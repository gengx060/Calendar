
import {inject, bindable, BindingEngine} from 'aurelia-framework';
import $ from 'bootstrap';
import Util from 'lib/util';

@inject(Element, BindingEngine)
export class Edit {
	@bindable selectedSkin;
	@bindable panelIf;

	constructor(element, bindingEngine) {
		this.element = element;
		this.modal = null;
		
		this.selectedGender = null;
		this.genders = ['Male', 'Female', 'Other'];

		Util.createObservables({
			observablesE:['lastname', 'firstname', 'gender','homephone','email',
				'address1','address2','city','state','zipcode'],
			observables:[],
		}, this);
	}

	attached(){
		this.modal = $(this.element).find('div.modal');
		this.modal.modal({backdrop: 'static', keyboard: false});
	}

	toggle() {
		this.modal.modal('toggle');
	}

	panelIfChange(newValue, oldValue) {
		debugger
	}

	submit() {
		let self = this;
		['firstname', 'lastname','email',
			'address1','city','state',
			'zipcode'].forEach(it => Util.Validation.validate(self, it, 
					Util.Validation.nonempty())
			)

	}
}