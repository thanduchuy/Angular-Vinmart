import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() name: string;
  @Input() discount: number;
  @Input() img: string;
  @Input() img_hover: string;
  @Input() price_new: number;
  @Input() price_old: number;
  @Input() vinid: number;
  @Input() rate: number;
  @Input() imgRoot: string;
  @Input() nameTable: string;
  @Input() uid: string;
  @Output() onAddCart: EventEmitter<string> = new EventEmitter<string>();
  price_newFormat: string;
  price_oldFormat: string;
  star: boolean[] = [false, false, false, false, false];
  constructor(private cart: CartService) {}
  ngOnInit() {
    this.price_newFormat = this.cart.changePrice(this.price_new);
    this.price_oldFormat = this.cart.changePrice(this.price_old);
    this.star = this.star.map((element, index) => {
      return index <= this.rate - 1;
    });
  }
  changeImage() {
    this.imgRoot = this.img_hover;
  }
  onSubmit() {
    this.onAddCart.emit(this.nameTable + "*" + this.uid);
  }
  resetImage() {
    this.imgRoot = this.img;
  }
}
