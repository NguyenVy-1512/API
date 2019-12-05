import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  @Input() public id: number;
  @Input() public name: string;
  @Input() public price: number;
  @Input() public des: string;
  @Input() public currency: string;

  public getCurrency(): string {
    return 'VND';
  }
}