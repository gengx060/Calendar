
import $ from 'jquery';
import toastr from 'lib/toastr';

//@inject(HttpClient)
const cookieNmae = 'mecookie';

export class Util {
	
	constructor() {
	} 

	static ajaxRequest(myPostData, url, success, error, complete) {
		let options = {
			url: '/api/'+url, //'/api/Sample/Test2',
			type: "post",
			data: JSON.stringify(myPostData),
			contentType: "application/json; charset=UTF-8",
			dataType: "text",
			//async: !isSync,
			context: this,
			success: success, 
			error : error,
			complete:complete
		};

		$.ajax(options);
	}

	static createCookie(value, days) {
		let expires = '';

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}

		document.cookie = encodeURIComponent(cookieNmae) + "=" + encodeURIComponent(value) + expires + "; path=/";
	}

	static readCookie() {
		var nameEQ = encodeURIComponent(cookieNmae) + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	}

	eraseCookie() {
		createCookie(cookieNmae, "", -1);
	}
}
export default Util;