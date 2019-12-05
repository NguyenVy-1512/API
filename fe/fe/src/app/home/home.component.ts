import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {products} from '../_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() public items: products[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  public itemsAfterFilter(): products[] {
    return this.items.filter((products) => {
      console.log (this.items);
    });
  }

}
