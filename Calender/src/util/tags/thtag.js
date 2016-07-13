import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';
//import $ from 'bootstrap';

import 'lib/typeahead';
//import BootstrapDialog from 'lib/bootstrap-dialog';
//console.log(Bloodhound);
import Util from 'lib/util';

//@customElement('tag-it')
@inject(Element)
export class Thtag {
  @bindable tags;

	constructor(element) {
		this.element = element;
	}

	bind() {
		//var input = this.element.querySelector('input');
		var input = $(this.element).find('input')
		input.typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		},{
			limit: 2,
			async: true,
			source: function (query, processSync, processAsync) {
				let req = {userid: 12};
				Util.ajaxRequest(req, 'Contacts/GetContact',
					res => {
						let p = $.parseJSON(res);
						let availableTags = ['foo', 'bar'].map( s => {
							return { label: s, value: s,
								icon: 'fa fa-arrows fa-fw'}
						});
						processAsync( [
								"Option 1",
								"Option 2",
								"Option 3",
								"Option 4",
								"Option 5"
							]
						);
					},res => {
						console.log(res);
					}, res => {
						this.loading = false;
					}

				);
			}

		});
		return;
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
	}
}