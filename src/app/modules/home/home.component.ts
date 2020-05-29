import { Component, OnInit, OnDestroy } from "@angular/core";
import { ImageService } from "src/app/shared/services/image.service";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from "src/app/shared/models/product.model";
import { CartService } from "src/app/shared/services/cart.service";
import { Cart } from "src/app/shared/models/cart.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { SubscriptionLike } from "rxjs";
import { Location } from "src/app/shared/models/location.model";
import { UserManagerService } from "src/app/shared/services/user-manager.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  milks: Product[] = [];
  data: any[] = [];
  email: string = "";
  indexOfItem: number;
  index = 0;
  constructor(
    private img: ImageService,
    private product: ProductService,
    private cart: CartService,
    private auth: AuthService,
    private manager: UserManagerService
  ) {}
  dataMilks: {};
  dataRoot: any[] = [];
  listCart: Cart[];
  keyMilks: {};
  private subscription: SubscriptionLike[] = [];
  imgs = [
    "/assets/img/27004929245214.jpg",
    "/assets/img/27004929310750.jpg",
    "/assets/img/27004929376286.jpg",
    "/assets/img/27004929441822.jpg",
    "/assets/img/27004931407902.jpg",
    "/assets/img/27004930949150.jpg"
  ];
  collections = [
    "product",
    "product-drinks",
    "product-cake",
    "product-freshfood",
    "product-mom",
    "product-kitchen"
  ];
  ngOnInit() {
    this.subscription.push(
      this.product._dataProduct.subscribe(data => {
        this.dataRoot = data;
        if (this.dataRoot.length < 1) {
          this.collections.forEach(member => {
            this.getData(member);
          });
        }
      })
    );
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
      this.setListProductOfCart(this.email);
    });
  }
  ngOnDestroy() {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
  setListProductOfCart(email: string) {
    this.cart.getCart(email).then(result => {
      if (result.data() == undefined) {
        this.listCart = [];
      } else {
        this.listCart = result.data()["items"].map(ele => {
          return new Cart(
            ele["img"],
            ele["name"],
            ele["price"],
            ele["quanlity"]
          );
        });
      }
      this.cart.updateData(this.listCart);
      this.getBillUser();
    });
  }
  getBillUser() {
    this.cart.getBillOfUser(this.email).then(data => {
      if (data.exists) {
        this.cart.setDataBill(data.data()["bills"]);
      } else {
        this.cart.setDataBill([]);
      }
    });
  }
  getData(name) {
    this.product.getDataProduct(name).then(data => {
      this.milks = data.docs.map(element => {
        let temp: Product = new Product(element.data(), element.id, name);
        this.img.downloadFile(temp.img).then(data => {
          temp.img = data;
        });
        this.img.downloadFile(temp.img_hover).then(data => {
          temp.img_hover = data;
        });
        return temp;
      });
      this.dataMilks = this.splitData(this.milks);
      this.data.push({
        img: this.imgs[this.index],
        key: Object.keys(this.dataMilks),
        data: this.splitData(this.milks),
        nameTable: name
      });
      this.product.setData(this.data);
      this.index++;
      this.milks = [];
    });
  }
  splitData(milks: Product[]) {
    return milks.reduce((result, member) => {
      member.category in result
        ? result[member.category].push(member)
        : (result[member.category] = [member]);
      return result;
    }, {});
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
