import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ImageService } from "src/app/shared/services/image.service";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit {
  @Input() img: string;
  @Input() name: string;
  @Input() price: number;
  @Input() quanlity: string;
  @Input() isOrder: string;
  @Output() deleteEvent: EventEmitter<String> = new EventEmitter();
  @Output() changeEvent: EventEmitter<String> = new EventEmitter();
  number = 0;
  priceFormat: string;
  check: boolean;
  constructor(private imgS: ImageService, private cart: CartService) {}

  ngOnInit() {
    this.number = Number.parseInt(this.quanlity);
    this.imgS.downloadFile(this.img).then(data => {
      this.img = data;
    });
    this.priceFormat = this.cart.changePrice(this.price);
    this.isOrder === "true" ? (this.check = true) : (this.check = false);
  }
  onDelete() {
    this.deleteEvent.emit(this.name);
  }
  onChange(action) {
    if (action === "plus") {
      this.number += 1;
      this.changeEvent.emit(this.name + "*" + this.number);
    } else {
      if (this.number !== 1) {
        this.number -= 1;
        this.changeEvent.emit(this.name + "*" + this.number);
      }
    }
  }
}
