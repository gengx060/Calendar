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
	//aurelia.start().then(a => a.setRoot('pages/login'));
	aurelia.start().then(a => a.setRoot('pages/signup'));
}