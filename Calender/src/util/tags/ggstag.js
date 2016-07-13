import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';

import 'lib/selectize/selectize';
import Util from 'lib/util';

//@customElement('tag-it')
@inject(Element)
export class Ggstag {
  @bindable tags1;
  @bindable tags2;
  @bindable tags3;

	constructor(element) {
		this.element = element;
	}

	bind() {
		//var input = this.element.querySelector('input');
		var input = $(this.element).find('#input1')
		input.selectize({
			plugins: ['restore_on_backspace', 'remove_button'],
			delimiter: ',',
			persist: false,
			create: function(input) {
				return {
					value: input,
					text: input
				}
			}
		});
		
		
		$(this.element).find('#input2').selectize({
			maxItems: 1,
			valueField: 'id',
			labelField: 'title',
			searchField: 'title',
			options: Util.Loc.states().map((it, i)=> {
					return { id: i, title: it}
				}),
			create: false
		});
		var a = 1;
		$(this.element).find('#input3').selectize({
			plugins: ['remove_button'],
			valueField: 'label',
			labelField: 'label',
			searchField: 'label',
			options: [],
			//persist: false,
			create: false,
			render: {
				item: function(item, escape) {
					return'<div>' +
						'<span class="description"><i class="fa fa-arrows fa-fw"></i>' + item.label + '</span>' +
					'</div>';
				},
				option: function(item) {
					return '<div>' +
						'<span class="description"><i class="fa fa-arrows fa-fw"></i>' + item.label + '</span>' +
					'</div>';
				}
			},
			load: function(query, callback) {
				//this.clearCache();
				//this.clearOptions1();
				if (!query.length) return callback();
				let req = {userid: 12};
				Util.ajaxRequest(req, 'Contacts/GetContact',
					res => {
						let p = $.parseJSON(res);
						let availableTags = ['foo', 'bar'].map( s => {
							return { label: s+ a++, value: s,
								icon: 'fa fa-arrows fa-fw'};
						});
						callback(availableTags);
					},res => {
						console.log(res);
					}, res => {
						this.loading = false;
					}
				);
			}
		});

	}
}