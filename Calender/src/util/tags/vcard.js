import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
export class Vcard {
	@bindable position = undefined;
	loading = false;
	
	constructor() {
	}

	attached() {
		$("[data-toggle=popover]").popover({
		html: true, 
		content: function() {
			return `
					<div style='width:350px; max-width:350px;' class='row'>
						<div class="col-md-4"><img style="max-width:50px;" src="src/assets/images/avatar_2x.png" alt="sfe" class="img-circle" />
		</div>
						<div class="col-md-8">
							<form class="form-horizontal">
								<div class="form-group">
									<p class="form-control-static">Gai Geng</p>
								</div>
								<div class="form-group">
									<p class="form-control-static">email@example.com</p>
								</div>
							</form>
						</div>
					</div>
					<div class='row'><a href="#">Another action</a></div>
					<div class='row'><a href="#">Something else here</a></div>
					<div class='row'><a href="#">Separated link</a></div>
				`;
			}
		});
	}
	
	show() {

	}
}