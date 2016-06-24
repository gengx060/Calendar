import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';

//@inject(Element)
//@bindable('value')
@customElement('panel')
export class Panel {
	@bindable({ defaultBindingMode: bindingMode.oneWay }) panelShow;
	@bindable({ defaultBindingMode: bindingMode.oneWay }) panelIf;
	@bindable({ defaultBindingMode: bindingMode.oneWay }) panelTitle;
	@bindable({ defaultBindingMode: bindingMode.oneWay }) panelIcon;
	@bindable({ defaultBindingMode: bindingMode.oneWay }) panelNumber;

	constructor(panelShow) {
		//console.log("Panel");
		this.panelShow = '';
		this.panelIf = true;
	}

	panelTitleChanged(newv)
	{
		console.log(newv);
	}

	toggle() {
		//this.panelShow = this.panelShow == ''? 'hidden':'';
		this.panelIf = !this.panelIf;
	}
}

