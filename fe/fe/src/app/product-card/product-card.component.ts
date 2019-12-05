import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import { products } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl:'./product-card.component.html',
  styleUrls: ['./product-card.component.css']

})
export class ProductCardComponent implements OnInit {
   products: any;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
  }

  add() {
    this.router.navigate(['/product-add']);
  }


}