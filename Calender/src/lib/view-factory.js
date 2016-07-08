import {
  inject,
  ViewCompiler,
  ViewResources,
  Container,
  ViewSlot,
  createOverrideContext
} from 'aurelia-framework';

@inject(ViewCompiler, ViewResources, Container)
export class ViewFactory {
	constructor(viewCompiler, resources, container) {
		this.viewCompiler = viewCompiler;
		this.resources = resources;
		this.container = container;
		this.view = null;;
		this.viewSlot = null;
		this.viewFactory = null;
	}

	insert(containerElement, html, viewModel) {
		this.viewFactory = this.viewCompiler.compile(html);
		let view = this.viewFactory.create(this.container);
		let anchorIsContainer = true;
		let viewSlot = new ViewSlot(containerElement, anchorIsContainer);
		viewSlot.add(view);
		view.bind(viewModel, createOverrideContext(viewModel));
		this.view = view;
		this.viewSlot = viewSlot;
		return this;
		return () => {
			viewSlot.remove(view);
			view.unbind();
		};
	}
	
	createView( html, viewModel) {
		this.viewFactory = this.viewCompiler.compile(html);
		let view = this.viewFactory.create(this.container);
		view.bind(viewModel, createOverrideContext(viewModel));
		return view;
	}

	dispose() {
		this.viewSlot.remove(this.view);
		this.view.unbind();
	}
}