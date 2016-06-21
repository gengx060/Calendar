import BootstrapDialog from 'lib/bootstrap-dialog';
import {Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Util from 'lib/util';


@inject(Router, Aurelia)
export class Login {
	email = 's@s';
	password = '12312313';
	loading = false;

	constructor(router, aurelia) {
		this.router = router;
		this.aurelia = aurelia;
	}
	configure() {

		var appRouterConfig = function(config) {

			//config.title = 'Random Quotes App';

			//// Here, we hook into the authorize extensibility point
			//// to add a route filter so that we can require authentication
			//// on certain routes
			//config.addPipelineStep('authorize', AuthorizeStep);

			// Here, we describe the routes we want along with information about them
			// such as which they are accessible at, which module they use, and whether
			// they should be placed in the navigation bar
			config.map([
				{ route: 'signup', name: 'signup', moduleId: 'pages/signup', nav: false, title:'Signup', authRoute: false },
				{ route: 'login', name: 'login', moduleId: 'pages/login', nav: false, title:'Login', authRoute: false },
				{ route: 'logout', name: 'logout', moduleId: './logout', nav: false, title:'Logout', authRoute: true }
			]);
		};

		// The router is configured with what we specify in the appRouterConfig
		this.router.configure(appRouterConfig);

	};

	submit() {
		//Util.createCookie('this is a test', 0.1)
		
		//BootstrapDialog.alert(Util.readCookie());
		//return;
		let myPostData = {
			email: this.email,
			password: this.password
		};
		self = this;
		self.loading = true;
		Util.ajaxRequest(myPostData, 'Login/Login',
			res => {
				let p = $.parseJSON(res)
				self.firstName = p.id;
				self.lastName = p.name;
				BootstrapDialog.alert(res);
			},res => {
				console.log(res);
			},res => {
				self.loading = false;
			}
		)
	}
	
	register(){
		//this.router.navigate("signup");
		this.aurelia.setRoot('pages/signup')
	}
}