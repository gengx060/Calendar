﻿export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		//.plugin('aurelia-dialog')
		.feature('util/tags');
		//.plugin('aurelia-dialog');

		//.globalResources('util/tags/panel');
	//.plugin('./resources/index');

	aurelia.start().then(a => a.setRoot());
}