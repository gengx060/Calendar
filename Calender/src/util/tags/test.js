import {inlineView} from 'aurelia-framework';
import {inject, bindable} from 'aurelia-framework';
import toastr from 'lib/toastr';
import Enumerable from 'lib/linq';
import BootstrapDialog from 'lib/bootstrap-dialog';


@inlineView('<template><button click.delegate="greet()">${text}</button></template>')
export class Test {
	constructor(){
		this.text = "Hello world"; 
	}

	greet(){
		//var a = Enumerable.Range(1, 10);
		//console.log(a.ToArray());
		////alert(this.text);
		//toastr.success('Success messages!', 'test');
		//[21,23,22].forEach(function(i){console.log(i);});
		//$("<p>Hello World!</p>").dialog();
		
		//var dialog = new BootstrapDialog({
		//	message: 'Custom spinning icon.',
		//	spinicon: 'fa fa-spinner fa-fw',
		//	buttons: [{
		//		label: 'Spin',
		//		autospin: true
		//	}]
		//});
		//dialog.alert();
		BootstrapDialog.alert('I want banana!');
		BootstrapDialog.alert('I want banana!');
		BootstrapDialog.alert('I want banana!');
		BootstrapDialog.alert('I want banana!');
	}
}

