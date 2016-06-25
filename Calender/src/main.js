
import Util from 'lib/util';

export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		//.plugin('aurelia-dialog')
		.feature('util/tags');
      //.plugin('aurelia-bootstrap-datepicker');
		//.plugin('aurelia-dialog');

		//.globalResources('util/tags/panel');
	//.plugin('./resources/index');
	
	//aurelia.start().then(a => a.setRoot());
	aurelia.start().then(a =>  {
		Util.Aurelia = a;
		Util.ajaxRequest({}, 'Login/IsSignedIn',
			res => {
				Util.Aurelia.setRoot('app');
			},res => {
				//Util.Aurelia.setRoot('pages/account/login') // already handled in final
			}
		)
	});
	//a.setRoot('pages/login'));
	//aurelia.start().then(a => 
	//{
	//	//Util.ajaxRequest({}, 'Login/IsSignedIn',
	//	//	res => {
	//	aurelia.setRoot('app');
	//	Util.Aurelia = aurelia;
	//	//	},res => {
	//	//		aurelia.setRoot('pages/account/login')
	//	//	}
	//	//)
	//});
}