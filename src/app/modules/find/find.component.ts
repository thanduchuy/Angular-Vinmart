import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CartService } from "src/app/shared/services/cart.service";
import { ProductService } from "src/app/shared/services/product.service";
import { getLocaleFirstDayOfWeek } from "@angular/common";
import { Product } from "src/app/shared/models/product.model";
import { Cart } from "src/app/shared/models/cart.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"]
})
export class FindComponent implements OnInit {
  find: string;
  list: any[];
  sizeArray: number;
  totalProduct: number;
  numberChoose = 1;
  numberNav: number[];
  listCart: Cart[];
  indexOfItem: number;
  email: string = "";
  constructor(
    private router: ActivatedRoute,
    private product: ProductService,
    private cart: CartService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((data: ParamMap) => {
      this.find = data.get("name");
      this.getProductFind();
    });
    this.getProductFind();
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
    });
    this.cart.cartData.subscribe(data => {
      this.listCart = data;
    });
  }
  getProductFind(): void {
    this.product._dataProduct.subscribe(data => {
      this.list = data.map(value => {
        let temp = value["data"];
        let arr: Product[] = [];
        for (let o of Object.values(temp)) {
          let arrs = [];
          arrs = arrs.concat(o);
          for (let po of arrs) {
            if (po["name"].includes(this.find)) {
              arr.push(po);
            }
          }
        }
        return arr;
      });
      this.list = this.splitList(this.joinList(this.list));
      this.sizeArray = this.list.length;
      this.numberNav = this.setNumberNav(this.sizeArray);
    });
  }
  setNumberNav(n: number): number[] {
    let result: number[] = [];
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }
  joinList(list: any[]): any[] {
    let result;
    result = list.reduce((result, element) => {
      for (let i of element) {
        result.push(i);
      }
      return result;
    }, []);
    this.totalProduct = result.length;
    return result;
  }
  splitList(list: any[]): any[] {
    let size = 4;
    let arrayOfArrays = [];
    for (let i = 0; i < list.length; i += size) {
      arrayOfArrays.push(list.slice(i, i + size));
    }
    return arrayOfArrays;
  }
  changeNav(i) {
    this.numberChoose = i;
  }
  previousNav() {
    this.numberChoose =
      this.numberChoose === 1 ? this.sizeArray : this.numberChoose - 1;
  }
  nextNav() {
    this.numberChoose =
      this.numberChoose === this.sizeArray ? 1 : this.numberChoose + 1;
  }
  onAddCart(event) {
    let temp = event.split("*");
    return this.cart
      .getProductOfUID(temp[0], temp[1])
      .then(ree => {
        this.addDataOfCart(ree);
      })
      .catch(err => {
        console.log(err);
      });
  }
  isInterOfList(name: string, list: Cart[]): boolean {
    let isReturn = false;
    list.forEach((data, index) => {
      if (data.name == name) {
        isReturn = true;
        this.indexOfItem = index;
      }
    });
    return isReturn;
  }
  addDataOfCart(ree: any) {
    if (this.isInterOfList(ree.data()["name"], this.listCart)) {
      this.listCart[this.indexOfItem].quanlity += 1;
    } else {
      this.listCart.push(
        new Cart(
          ree.data()["img"],
          ree.data()["name"],
          ree.data()["price_new"],
          1
        )
      );
    }
    this.cart.updateData(this.listCart);
    this.cart.addCart(this.email, this.listCart).then(re => {
      alert("Thêm vào giỏ hàng thành công!!!");
    });
  }
}
