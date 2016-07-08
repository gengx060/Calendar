
import {inject, bindable, BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import $ from 'bootstrap';
import Util from 'lib/util';

@inject(Element, BindingEngine, Router)
export class Edit {
	@bindable selectedSkin;
	@bindable panelIf;

	constructor(element, bindingEngine, router) {
		this.element = element;
		this.router = router;
		this.modal = null;
		
		this.selectedGender = null;
		this.genders =  Util.Loc.genders();
		this.states = Util.Loc.states();

		this.submiting = false;

		this.properties = {
			observablesE:['lastname', 'firstname', 'gender','homephone','email',
				'address1','address2','city','state','zipcode'],
			observables:[],
		}
		Util.createObservables(this.properties, this);
		Util.Validation.rawInit(this, this.properties.observablesE);
	}

	attached(){
		this.modal = $(this.element).find('div.modal');
		if (this.panelIf == 1) {
			this.modal.modal('show');
		} else {
			this.modal.modal('hide');
		}
	}

	toggle() {
		this.router.navigateToRoute('welcome');
	}

	panelIfChanged(newValue, oldValue) {
		if(this.modal) {
			if (newValue== 1) {
				this.modal.modal('show');
			} else {
				this.modal.modal('hide');
			}
		}
	}

	submit() {
		let nonempties = 
		['firstname', 'lastname', 'address1','city',
			'zipcode'];
		nonempties.forEach(it => Util.Validation.validate(this, it, 
					Util.Validation.nonempty())
			);
		let email = ['email'];
		email.forEach(it => Util.Validation.validate(this, it, 
					Util.Validation.email())
			);
		let select = ['gender','state'];
		select.forEach(it => Util.Validation.validate(this, it, 
					Util.Validation.select())
			);

		if(Util.Validation.checkAll(this, [...nonempties,...email,...select])) {
			let req = Util.Validation.classToJson(this, this.properties.observablesE, true);
			req.user = Util.user();
			this.submiting = true;
			Util.ajaxRequest(req, 'Contacts/NewContact',
				res => {
					console.log(res);
					Util.Validation.emptyInit(this, this.properties.observablesE);
					Util.toastr.success("new contact was created");
				},res => {
					console.log(res);
					let err = $.parseJSON(res.responseText)
					if (err.type == 1) {
						Util.toastr.error(err.info);
						this.emailE = true;
					} else{
						Util.toastr.error("something went wrong, try agian");
					}
				}, res => {
					this.submiting = false;
				}

			);
		}
	}
}

//var Edit1 = new Edit();

//console.log(Edit1);
export const Edit1 = new Edit(Element, BindingEngine, Router);
console.log(Edit1);