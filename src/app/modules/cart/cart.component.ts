import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "src/app/shared/services/cart.service";
import { Cart } from "src/app/shared/models/cart.model";
import { ImageService } from "src/app/shared/services/image.service";
import { SubscriptionLike } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { element } from "protractor";
import { Payment } from "src/app/shared/models/payment.model";
import { Bill } from "src/app/shared/models/bill.model";
import { Router } from "@angular/router";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(
    private cart: CartService,
    private auth: AuthService,
    private router: Router
  ) {}
  list: Cart[] = [];
  size: number;
  email: string;
  index: number;
  total: number;
  totalFormat: string;
  isOrder: boolean = false;
  isPayment: boolean = false;
  isCart: boolean = true;
  valueButton = "Tiến hành đặt hàng";
  activeLocal = false;
  activeOther = false;
  activePayment = false;
  bills: Bill[] = [];
  bill: Bill = new Bill();
  ngOnInit() {
    this.getDataCart();
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
    });
    this.cart.listBill.subscribe(data => {
      this.bills = data;
    });
  }
  setDataBillOfUser(email: string) {
    this.cart.getBillOfUser(email).then(data => {
      if (data.exists) {
        this.cart.setDataBill(data);
      } else {
        this.cart.setDataBill([]);
      }
    });
  }
  getDataCart() {
    this.cart.cartData.subscribe(data => {
      this.list = data;
      this.size = this.list.length;
      this.total = this.totalCart(this.list);
      this.totalFormat = this.cart.changePrice(this.total);
    });
  }
  onDelete(event) {
    if (this.setPropoties(event, this.list)) {
      this.list.splice(this.index, 1);
      this.total = this.totalCart(this.list);
      this.totalFormat = this.cart.changePrice(this.total);
      this.cart.addCart(this.email, this.list).then(ree => {
        alert("Xoá thành công !!!");
      });
    }
  }
  setPropoties(name: string, list: Cart[]): boolean {
    let isCheck = false;
    list.forEach((element, index) => {
      if (element.name === name) {
        isCheck = true;
        this.index = index;
      }
    });
    return isCheck;
  }
  onChange(event) {
    let temp = event.split("*");
    if (this.setPropoties(temp[0], this.list)) {
      this.list[this.index].quanlity = Number.parseInt(temp[1]);
      this.total = this.totalCart(this.list);
      this.totalFormat = this.cart.changePrice(this.total);
      this.cart.addCart(this.email, this.list).then(ree => {
        console.log(ree);
      });
    }
  }
  totalCart(list: Cart[]): number {
    let result = 0;
    result = this.list.reduce((result, element) => {
      return result + element.quanlity * element.price;
    }, 0);
    return result;
  }
  changeToOrder() {
    if (this.isPayment) {
      this.addBillOfUser();
    } else {
      if (!this.isOrder) {
        if (this.list.length === 0) {
          alert("Vui lòng chọn thêm hàng hoá!!!");
          this.router.navigate(["/home"]);
        } else {
          this.isOrder = true;
          this.isCart = false;
          this.valueButton = "Chọn hình thức thanh toán";
        }
      } else {
        if (this.onActivePayMent()) {
          this.isPayment = true;
          this.isOrder = false;
          this.isCart = false;
          this.valueButton = "Thanh toán ngay";
        }
      }
    }
  }
  onBack(event) {
    this.isOrder = true;
    this.isPayment = false;
    this.valueButton = "Chọn hình thức thanh toán";
  }
  onActivePayMent(): boolean {
    let check = true;
    if (!this.activeLocal) {
      check = false;
      alert("Vui lòng chọn Địa chỉ!!");
    }
    if (!this.activeOther) {
      check = false;
      alert("Vui lòng chọn Ghi Chú!!");
    }
    return check;
  }
  onClickLocation(event) {
    this.activeLocal = true;
    this.bill.local = event;
  }
  onClickOther(event) {
    this.bill.noteOther = event;
  }
  onClickNotes(event) {
    this.activeOther = true;
    this.bill.note = event;
  }
  onClickPayment(event) {
    this.bill.payment = event;
    this.activePayment = true;
  }
  addBillOfUser() {
    if (!this.activePayment) {
      alert("Vui lòng chọn phương thức thanh toán");
    } else {
      this.bill.item = this.list;
      this.bill.date = new Date().toString();
      if (this.bill.noteOther === undefined) {
        this.bill.noteOther = "Ko co gi <3";
      }
      this.bills.push(this.bill);
      this.cart.setBillOfUser(this.email, this.bills).then(data => {
        this.cart.clearCart(this.email).then(ree => {
          alert("Đặt hàng thành công :)");
          this.router.navigate(["/home"]);
        });
      });
    }
  }
}
