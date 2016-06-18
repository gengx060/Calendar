
import {inject, bindable} from 'aurelia-framework';
import $ from 'bootstrap';
//import {modal} from 'jquery-ui';

@inject(Element)
export class Modal {
	@bindable selectedSkin;
	@bindable panelIf;

	constructor(element) {
		this.element = element;
		this.modal = null;
		this.panelIf = true;
		this.skins = [
			'black',
			'blue'
		]
	}
	attached(){
		this.modal = $(this.element).find('div.modal');
		this.modal.modal({backdrop: 'static', keyboard: false});
	}

	toggle() {
		this.modal.modal('toggle');
	}
}