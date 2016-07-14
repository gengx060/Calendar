import {inject, bindable} from 'aurelia-framework';

import template from "pages/label/newlabel.html!text";

@inject(Element)
export class Newlabel{
	embed = null;
	newLabel = '';
	newLabelTextColor = "rgb(255, 255, 255)";
	newLabelColor = "rgb(91, 192, 222)";

	labelColors = ["rgb(217, 83, 79)","rgb(240, 173, 78)", "rgb(255, 255, 0)",
		"rgb(92, 184, 92)", this.newLabelColor, "cornflowerblue","rgb(153, 0, 255)",
		"RGB(255, 0, 255)" 
	].map((it, i)=>{
		return {color:it, checked:it==this.newLabelColor, index:i+1}
	});
	
	labels = [
		{name:'employee',		parent:null, index:11, labelcolor:1, textColor:2},
		{name:'managerA',		parent:11, index:136, labelcolor:2, textColor:2},
		{name:'managerB',		parent:11, index:197, labelcolor:2, textColor:2},
		{name:'engineer',		parent:11, index:198, labelcolor:2, textColor:2},
		{name:'software engineer',parent:198, index:199, labelcolor:2, textColor:2},
		{name:'contractor',		parent:11, index:1911, labelcolor:4, textColor:4},
		{name:'favourite',		parent:null, index:12, labelcolor:5, textColor:3},
		{name:'organization',	parent:null, index:132, labelcolor:3, textColor:6},
		{name:'departmentA',	parent:132, index:134, labelcolor:3, textColor:6},
		{name:'departmentB',	parent:132, index:135, labelcolor:3, textColor:6},
		{name:'departmentC',	parent:132, index:136, labelcolor:3, textColor:6},
		{name:'client',			parent:null, index:112, labelcolor:3, textColor:3},
		{name:'BOBA',			parent:null, index:121, labelcolor:2, textColor:5},
		{name:'HOA',			parent:null, index:31, labelcolor:4, textColor:2},
		{name:'DISA',			parent:null, index:112, labelcolor:2, textColor:4},
		{name:'Doctor',			parent:null, index:171, labelcolor:6, textColor:2}
	]

	constructor(element) {
		this.element = element;
		this.modalShow = true;

		
		//$(this.element).find('#input2').selectize({
		//	maxItems: 1,
		//	valueField: 'id',
		//	labelField: 'title',
		//	searchField: 'title',
		//	options: Util.Loc.states().map((it, i)=> {
		//		return { id: i, title: it}
		//	}),
		//	create: false
		//});
		//this.viewFactory = viewFactory;
	}

	textColors = ["RGB(0, 0, 0)","RGB(68, 68, 68)", "rgb(102, 102, 102)", 
		"rgb(153, 153, 153)", "rgb(204, 204, 204)", "rgb(238, 238, 238)", 
		"rgb(243, 243, 243)", this.newLabelTextColor].map((it, i)=>{
			return {color:it, checked:it==this.newLabelTextColor, index:i+1}
		});

	setColor(v) {
		this.labelColors.forEach(it=>it.checked = false);
		v.checked = true;
		this.newLabelColor = v.color;
	}

	setTextColor(v) {
		this.textColors.forEach(it=>it.checked = false);
		v.checked = true;
		this.newLabelTextColor = v.color;
	}
	createLabel() {
		console.log(this.newLabel);
		console.log(this.newLabelColor);
		console.log(this.newLabelTextColor);
	}

	show() {
		this.modalShow = true;
	}
	
	hide() {
		this.modalShow = false;
	}
	
	remove() {
		if (this.embed) {
			this.embed.dispose();
			this.embed = null;
		}
	}

	static create(element, viewFactory) {
		let viewModelJs = new Newlabel();
		let viewHtml = template;
		viewModelJs.embed = viewFactory.insert(element, viewHtml, viewModelJs);
		return viewModelJs;
	}

	static createSingleton(element, viewFactory) {
		let viewModelJs = new Newlabel();
		let viewHtml = template;
		viewModelJs.embed = viewFactory.insert(element, viewHtml, viewModelJs);
		//element.
		return viewModelJs;
	}
}