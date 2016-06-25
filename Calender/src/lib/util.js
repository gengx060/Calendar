
import $ from 'jquery';
import toastr from 'lib/toastr';
import BootstrapDialog from 'lib/bootstrap-dialog';
import {Aurelia, inject} from 'aurelia-framework';

//@inject(HttpClient)
const cookieNmae = 'mecookie';
export class Util {
	
	constructor() {
	} 

	static ajaxRequest(myPostData, url, success, error, complete) {

		var headers = {};
		headers.antiForgeryToken = sessionStorage.getItem("antiForgeryToken");

		let options = {
			url: '/api/'+url, //'/api/Sample/Test2',
			type: "post",
			data: JSON.stringify(myPostData),
			contentType: "application/json; charset=UTF-8",
			dataType: "text",
			headers: headers,
			//async: !isSync,
			context: this,
			success: success, 
			error : error,
			complete:function(res) {
				if (complete) {
					complete(res);
				}
				if(res.statusText == 'Unauthorized') {
					//if(Util.CurrentApp != 'login') {
					Util.Aurelia.setRoot('pages/account/login');
						//Util.CurrentApp = 'login';
					//}
				}
			}
		};

		$.ajax(options);
	}

	//static checkLogin() {
	//	Util.ajaxRequest({}, 'Login/IsSignedIn',
	//		res => {
	//			//if(Util.CurrentApp == 'login') {
	//				Util.Aurelia.setRoot('app');
	//			//}
	//		},res => {
	//			console.log(res);
	//		},res => {
	//			self.loading = false;
	//		}
	//	)
	//}

	
	static logout() {
		BootstrapDialog.confirm('Log out?', function(res) {
			if(res) {
				sessionStorage.setItem("antiForgeryToken", '');
				Util.Aurelia.setRoot('pages/account/login');
				//Util.CurrentApp = 'login';
				//Util.Router.navigate("");
			} else {
				console.log(res);
			}
		});
	}

	//static createCookie(value, days) {
	//	let expires = '';

	//	if (days) {
	//		var date = new Date();
	//		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	//		expires = "; expires=" + date.toGMTString();
	//	}

	//	document.cookie = encodeURIComponent(cookieNmae) + "=" + encodeURIComponent(value) + expires + "; path=/";
	//}

	//static readCookie() {
	//	var nameEQ = encodeURIComponent(cookieNmae) + "=";
	//	var ca = document.cookie.split(';');
	//	for (var i = 0; i < ca.length; i++) {
	//		var c = ca[i];
	//		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
	//		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	//	}
	//	return null;
	//}

	//eraseCookie() {
	//	createCookie(cookieNmae, "", -1);
	//}
}
Util.Aurelia = null;
Util.Router = null;
Util.CurrentApp = null;
export default Util;