import {bindable, inject, bindingMode} from 'aurelia-framework';
import Util from 'lib/util';

@inject(Element)
export class Vcard {
	@bindable position = undefined;
	@bindable userid = undefined;
	
	constructor(element) {
		this.element = element;
		this.name = null;
		this.email = null;
		this.loading = false;
		this.showS = true;
		this.showC = false;
	}

	pop() {
		$(this.element).find("[data-toggle=popover]").popover(
			{html:true,
				placement:'top',
				title:"hello",
				content:"loading..."
			}).popover('show');

		let req = {userid: this.userid};
		Util.ajaxRequest(req, 'Contacts/GetContact',
			res => {
				let p = $.parseJSON(res);
				$('.popover-content:visible').html(res)
			},res => {
				console.log(res);
			}, res => {
				this.loading = false;
			}

		);
		//$.ajax({url: "usps.cfc?method=tracking&returnformat=plain&trackingID="+$(this).html(), dataType: "html", cache:true, success: function(data){
		//	$('.popover-content:visible').html(data)
		//	}})
	}

	attached1() {
		let req = {userid: this.userid};
		Util.ajaxRequest(req, 'Contacts/GetContact',
			res => {
				let p = $.parseJSON(res);
				this.name = p.name;
				this.email = p.email;
				this.loading = false;
				let pop = $(this.element).find("[data-toggle=popover]");
				pop.popover({
					html: true, 
					content: ()=>$(this.element).find('div.hide').html()
				});
				console.log(2);
			},res => {
				console.log(res);
			}, res => {
				this.loading = false;
			}

		);
	}
	
	attached() {
		this.pop = $(this.element).find("[data-toggle=popover]");
		this.pop.popover({
			html: true, 
			content: ()=>$(this.element).find('div.hide').html()
		});

		this.pop.on('show.bs.popover',  () => {
			this.loading = true;
			
			$('div.popover-content:visible').html($('div.hide').html());

			let req = {userid: this.userid};
			Util.ajaxRequest(req, 'Contacts/GetContact',
				res => {
					let p = $.parseJSON(res);
					this.name = p.name;
					this.email = p.email;
					//$(self.element).find('.popover-content:visible').html($(self.element).find('div.hide').html());
					setTimeout(() =>
						//$(this.element).find('div.popover-content:visible').html($(this.element).find('div.hide').html()),
						$('div.popover-content:visible').html($('div.hide').html()),
						100);
				},res => {
					console.log(res);
				}, res => {
					this.loading = false;
				}

			);
		})
	}
	//attached1() {
	//	$("[data-toggle=popover]").popover({
	//	html: true, 
	//	content: function() {
	//		return `
	//				<div style='width:350px; max-width:350px;' class='row'>
	//					<div class="col-md-4"><img style="max-width:50px;" src="src/assets/images/avatar_2x.png" alt="sfe" class="img-circle" />
	//	</div>
	//					<div class="col-md-8">
	//						<form class="form-horizontal">
	//							<div class="form-group">
	//								<p class="form-control-static">Gai Geng</p>
	//							</div>
	//							<div class="form-group">
	//								<p class="form-control-static">email@example.com</p>
	//							</div>
	//						</form>
	//					</div>
	//				</div>
	//				<div class='row'><a href="#">Another action</a></div>
	//				<div class='row'><a href="#">Something else here</a></div>
	//				<div class='row'><a href="#">Separated link</a></div>
	//			`;
	//		}
	//	});
	//}
	
	show() {
		let viewHtml = 
		`<template>
				<h1>\${message}</h1>
				<button click.delegate="fun1()">\$\{message\}</button>
			</template>`
		let viewModelJs = { 
			  message: 'hello world',
			  toggle: function(){
			  	$('div.modal').removeClass("show");
			  }
			};
		//eval('viewModel = ' + viewModelJs);
		this.embed = this.viewFactory.insert(this.element, viewHtml, viewModelJs);
		
	}
}