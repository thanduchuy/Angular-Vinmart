import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ImageService } from "src/app/shared/services/image.service";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: "app-item-cart",
  templateUrl: "./item-cart.component.html",
  styleUrls: ["./item-cart.component.scss"]
})
export class ItemCartComponent implements OnInit {
  @Input() img: string;
  @Input() name: string;
  @Input() price: number;
  @Input() quanlity: string;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  number: Number;
  constructor(private imgS: ImageService, private cart: CartService) {}
  priceFormat: string;
  ngOnInit() {
    this.number = Number.parseInt(this.quanlity);
    this.imgS.downloadFile(this.img).then(data => {
      this.img = data;
    });
    this.priceFormat = this.cart.changePrice(this.price);
  }
  onDelete() {
    this.deleteEvent.emit(this.name);
  }
}
