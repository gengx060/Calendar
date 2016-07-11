import {inject, customElement, bindable} from 'aurelia-framework';
//import $ from 'bootstrap';
import  'jquery-ui';
import  'lib/tag-it';
import Util from 'lib/util';
//import 'aehlke/tag-it/css/jquery.tagit.css!';
//import 'jquery-ui/themes/flick/jquery-ui.css!';

//@customElement('tag-it')
@inject(Element)
export class Ggtag {
  @bindable tags;

	constructor(element) {
		this.element = element;
	}

	bind() {
		var input = this.element.querySelector('input');
		var ops = {
			//availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
			beforeTagAdded: (event, ui) => {
				if(ops.availableTags.find(x => x.value == ui.tagLabel) == undefined)
				{
					return false;
				}
				if(ui.tagLabel == "not found")
				{
					return false;
				}

			},
			tagLimit: 1,
			autocomplete: {
				delay: 0,
				minLength: 2,
				open: function( event, ui ) {
					console.log(1);
				},
				style:'fa-external-link-square',
				search: function( event, ui ) {
					console.log(1);
				},
				messages: {
					noResults: '',
					results: function() {return null}
				},
				source: function (request, response) {
					let req = {userid: 12};
					Util.ajaxRequest(req, 'Contacts/GetContact',
						res => {
							let p = $.parseJSON(res);
							ops.availableTags = ['foo', 'bar'].map( s => {
								return { label: s, value: s,
									icon: 'fa fa-arrows fa-fw'}
							});
							response(ops.availableTags);
						},res => {
							console.log(res);
						}, res => {
							this.loading = false;
						}

					);
				}
			},
			afterTagAdded: (event, ui) => {
				this.tags = $(event.target).val();
			},
			afterTagRemoved: (event) => {
				this.tags = $(event.target).val();
			}
		};
		
		$(input).tagit(ops);
		//$('ul').find("input").data("uiAutocomplete")._renderItem = function (ul, item) {
		//	return $("<li></li>")
		//		.data("item.autocomplete", item)
		//		.append("<a>" + item.label +"<br>"+item.description+ "</a>")
		//		.appendTo(ul);
		//};
		return ;
		$(input).tagit({
			//allowSpaces: true,
			//placeholderText:'Tag1,Tag2,Tag3',
			availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"],
			//autocomplete: {
			//	delay: 0,
			//	minLength: 2,
			//	source: ['foo', 'bar']
			//	//	function () {
			//	//	let req = {userid: 12};
			//	//	Util.ajaxRequest(req, 'Contacts/GetContact',
			//	//		res => {
			//	//			let p = $.parseJSON(res);
			//	//			return  ['foo', 'bar'];
			//	//		},res => {
			//	//			console.log(res);
			//	//		}, res => {
			//	//			this.loading = false;
			//	//		}

			//	//	);
			//	//}
			//},
			beforeTagAdded: (event, ui) => {
				if(this.availableTags.indexOf(ui.tagLabel) == -1)
				{
					return false;
				}
				if(ui.tagLabel == "not found")
				{
					return false;
				}

			},
			afterTagAdded: (event, ui) => {
				this.tags = $(event.target).val();
			},
			afterTagRemoved: (event) => {
				this.tags = $(event.target).val();
			}
		});
	}
}