import {customElement, bindable} from 'aurelia-framework';

@customElement('products')
export class Products {
    @bindable products = [];
    @bindable username = '';
}