
import $ from 'jquery';

//@inject(HttpClient)
export class Util {
	
	constructor() {
	} 

	static ajaxRequest(myPostData, url, success, error) {
		//let myPostData = {
		//	id: 101
		//};
		let options = {
			url: '/api/'+url, //'/api/Sample/Test2',
			type: "post",
			data: JSON.stringify(myPostData),
			contentType: "application/json; charset=UTF-8",
			dataType: "text",
			//async: !isSync,
			context: this,
			success: success, 
			error : error
		};

		$.ajax(options);
	}
	
	myFunction() {
		let myPostData = {
			id: 101
		};

		httpClient.fetch('/api/Sample/Test', {
			method: "POST",
			body: json(myPostData)
		})
		.then(response => {
			alert(response.json());
		})
		.then(data => {
			console.log(data);
		});
	}
}
export default Util;