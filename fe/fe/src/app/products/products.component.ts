import {Component, OnInit} from '@angular/core';
import {products} from '../_models';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {

  public items: products = {};

  constructor(private productsServices: RestService) {
    productsServices.getProducts()
      .subscribe(_ => this.items = _);
  }

  ngOnInit() {
  }
}