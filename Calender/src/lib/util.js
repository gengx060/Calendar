
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

	static createObservables(jsonObj, self) {

		jsonObj.observables && jsonObj.observables.forEach(function(it) {
			eval('self.'+it+' = null');
		});

		jsonObj.observableArrays && jsonObj.observableArrays.forEach(function(it) {
			eval('self.'+it+' = []');
		});

		jsonObj.observablesE && jsonObj.observablesE.forEach(function(it) {
			eval('self.'+it+' = null');
			eval('self.'+it+'E = false');
		});
	}

	
}

class Validation {
	static nonempty() {
		return /([^\s])/;
	}

	static validate(self, prop, rule) {
		
		if(eval('self.'+prop+'==null') ) {
			eval('self.'+prop+'E = true');
			return;
		}

		if( rule.test(eval('self.'+prop)) ) {
			eval('self.'+prop+'E = false');
		} else {
			eval('self.'+prop+'E = true');
		}
	}
}

Util.Validation = Validation;

class Loc{
	static states() {
		return [
			'Alabama',
			'Alaska',
			'Arizona',
			'Arkansas',
			'California',
			'Colorado',
			'Connecticut',
			'Delaware',
			'District of Columbia',
			'Florida',
			'Georgia',
			'Hawaii',
			'Idaho',
			'Illinois',
			'Indiana',
			'Iowa',
			'Kansas',
			'Kentucky',
			'Louisiana',
			'Maine',
			'Maryland',
			'Massachusetts',
			'Michigan',
			'Minnesota',
			'Mississippi',
			'Missouri',
			'Montana',
			'Nebraska',
			'Nevada',
			'New Hampshire',
			'New Jersey',
			'New Mexico',
			'New York',
			'North Carolina',
			'North Dakota',
			'Ohio',
			'Oklahoma',
			'Oregon',
			'Pennsylvania',
			'Rhode Island',
			'South Carolina',
			'South Dakota',
			'Tennessee',
			'Texas',
			'Utah',
			'Vermont',
			'Virginia',
			'Washington',
			'West Virginia',
			'Wisconsin',
			'Wyoming'
		];
	}
}
Util.Loc = Loc;

Util.Aurelia = null;
Util.Router = null;
Util.CurrentApp = null;
export default Util;
