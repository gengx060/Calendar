export class App {
	configureRouter(config, router) {
		config.title = 'GG';
		
		config.map([
				{
					route:[''],
					name: 'login',
					title:'Home',
					nav:false,
					moduleId:'./pages/account/login'
				},
				{
					route:['welcome'],
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
	}
	
}

//config.map([
//{ route: ['','welcome'], name: 'welcome', moduleId: './sample/welcome', nav: true, title:'Welcome', settings: { icon : 'fa-th-large'} },
//{ route: 'users', name: 'users', moduleId: './sample/users/users', nav: true, title:'Github Users'},
//{ route: 'users', name: 'users', moduleId: './sample/users/users', nav: true, title:'Github Users', settings: { parentMenu: 'Admin'} }
//]);




//config.map([
//		{
//			route:['', 'welcome'],
//			name: 'welcome',
//			title:'Home',
//			nav:true,
//			moduleId:'./sample/welcome'
//		},
//		{
//			route:'users',
//			title:'Top Menu',
//			nav:true,
//			settings:{
//				subMenu:[
//				  {href:'#/sub1', title:'Submenu 1'},
//				  {href:'zoldello.wordpress.com', title:'Submenu 2'},
//				  {href:'#/sub3', title:'Submenu 3'}
//				]
//			}
//		}, 
//		{
//			route:'sub1',
//			title:'Submenu 1',
//			nav:false,
//			moduleId:'./sample/welcome'
//		}