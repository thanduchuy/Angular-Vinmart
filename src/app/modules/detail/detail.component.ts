import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule
} from "@angular/router";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from "src/app/shared/models/product.model";
import { ImageService } from "src/app/shared/services/image.service";
import { element } from "protractor";
import { CartService } from "src/app/shared/services/cart.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { Cart } from "src/app/shared/models/cart.model";
import { LocalService } from "src/app/shared/services/local.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  data: string[];
  item: any = {};
  number: number = 1;
  images = [];
  image;
  dateNow: Date = new Date();
  format = "dd/MM/yyyy";
  policys: any[];
  count: number = 0;
  star = [true, true, true, true, true];
  listCart: Cart[];
  endows = ["Ưu đãi 20.000đ", "Ưu đãi 25.000đ"];
  email: string = "";
  indexOfItem: number;
  local: string;
  showName = false;
  myForm: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private product: ProductService,
    private img: ImageService,
    private cart: CartService,
    private auth: AuthService,
    private location: LocalService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      rate: ["", [Validators.required]],
      name: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.getDataProduct().then(res => {
      this.item = res;
      this.changeImageProduct(this.item["img"]).then(da => {
        this.images.push({ url: da, isActive: true });
        this.image = da;
      });
      this.changeImageProduct(this.item["img_hover"]).then(da => {
        this.images.push({ url: da, isActive: false });
      });
    });
    this.policys = [
      {
        title: "fas fa-medal",
        value: `Thời gian khuyến mãi: ${this.dateNow.getDate() +
          "-" +
          (this.dateNow.getMonth() + 1) +
          "-" +
          this.dateNow.getFullYear()} tới ${this.dateNow.getDate() +
          2 +
          "-" +
          (this.dateNow.getMonth() + 1) +
          "-" +
          this.dateNow.getFullYear()}`
      },
      {
        title: "fab fa-vine",
        value: "Sản phẩm áp dụng tiêu điểm VinID"
      },
      {
        title: "fas fa-exchange-alt",
        value: "Chính sách đổi trả thủ tục đơn giản"
      },
      {
        title: "fas fa-newspaper",
        value: "Adayroi xuất hóa đơn cho sản phẩm này."
      }
    ];
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
    });
    this.cart.cartData.subscribe(data => {
      this.listCart = data;
    });
    this.location._Local.subscribe(data => {
      this.local = data;
    });
  }
  getDataProduct() {
    return new Promise((resovle, reject) => {
      this.router.paramMap.subscribe(res => {
        this.data = res.get("id").split("*");
        this.product
          .getProductOfCategory(this.data[0], this.data[1])
          .then(see => {
            let temp = see.data();
            resovle(new Product(temp, this.data[0], this.data[1]));
          });
      });
    });
  }
  async changeImageProduct(image: string) {
    return new Promise((resovle, reject) => {
      this.img.downloadFile(image).then(data => {
        resovle(data);
      });
    });
  }
  onChange(action) {
    if (action === "plus") {
      if (this.number !== 6) {
        this.number += 1;
      } else {
        alert("Chỉ được mua tối đa 6 sản phẩm");
      }
    } else {
      if (this.number !== 1) {
        this.number -= 1;
      }
    }
  }
  buyNow() {
    return this.cart
      .getProductOfUID(this.data[1], this.data[0])
      .then(ree => {
        this.addDataOfCart(ree);
        this.route.navigate(["/cart"]);
      })
      .catch(err => {
        console.log(err);
      });
  }
  chooseStar(i) {
    this.star = this.star.map((element, index) => {
      return index <= i;
    });
  }
  activeItem(item) {
    this.images = this.images.map(element => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        element.isActive = true;
        this.image = element.url;
      } else {
        element.isActive = false;
      }
      return element;
    });
  }
  clickArea(event) {
    if (event.keyCode === 8) {
      this.count === 0 ? (this.count = 0) : this.count--;
    } else {
      this.count++;
    }
  }
  onAddCart() {
    return this.cart
      .getProductOfUID(this.data[1], this.data[0])
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
      this.listCart[this.indexOfItem].quanlity += this.number;
    } else {
      this.listCart.push(
        new Cart(
          ree.data()["img"],
          ree.data()["name"],
          ree.data()["price_new"],
          this.number
        )
      );
    }
    this.cart.updateData(this.listCart);
    this.cart.addCart(this.email, this.listCart).then(re => {
      alert("Thêm vào giỏ hàng thành công!!!");
    });
  }
  onShowName() {
    this.showName = true;
  }
  onSentRate() {
    console.log("aaa");
  }
}
