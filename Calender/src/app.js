import Util from 'lib/util';

export class App {
	configureRouter(config, router) {
		config.title = 'GG';
		//config.options.pushState = true;
		config.map([
				{
					route:['','welcome'],
					name: 'welcome',
					title:'Home',
					nav:true,
					moduleId:'./sample/welcome'
				},
				{
					route:'users',
					title:'users',
					nav:true,
					moduleId:'./',
					settings:{
						subMenu:[
							{href:'#/sub1', title:'users'},
							{href:''},
							{href:'zoldello.wordpress.com', title:'menu 2'},
							{href:'#/sub3', title:'menu 3'}
						]
					}
				}, 
				{ route: 'sub1', name: 'users', moduleId: './sample/users/users', nav: false, title:'Github Users'}
		]);
		this.router = router;
		Util.Router = router;
	}

	logout()
	{
		Util.logout();
	}
	
}


