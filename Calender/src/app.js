export class App {
	configureRouter(config, router) {
		config.title = 'Aurelia';
		config.map([
		{ route: ['','welcome'], name: 'welcome', moduleId: './sample/welcome', nav: true, title:'Welcome' },
		{ route: 'users',         name: 'users',    moduleId: './sample/users/users',    nav: true, title:'Github Users' }
		]);

		this.router = router;
	}
}