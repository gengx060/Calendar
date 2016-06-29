import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
export class Vcardm {
	@bindable position = undefined;
	loading = false;
	
	constructor() {
	}

	attached() {
		$("[data-toggle=popover]").popover({
			html: true, 
			content: function() {
				return `<ul class="nav nav-pills nav-stacked">
					<li><a href="#">Action</a></li>
					<li><a href="#">Another action</a></li>
					<li><a href="#">Something else here</a></li>
					<li><a href="#">Separated link</a></li>
				</ul>`;
			}
		});

	}
	
	show() {

	}
}