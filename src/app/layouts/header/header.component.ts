import { Component, OnInit, OnChanges } from "@angular/core";
import { City } from "src/app/shared/models/city.models";
import { LocalService } from "src/app/shared/services/local.service";
import { Distinct } from "src/app/shared/models/distinct.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Classify } from "src/app/shared/models/classify.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/models/user.model";
import { Cart } from "src/app/shared/models/cart.model";
import { CartService } from "src/app/shared/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  local;
  string;
  datacitys: City[];
  dataDistict: Distinct[];
  dataWard: Distinct[];
  formGroup: FormGroup;
  checkLogin = false;
  emailChage: string;
  imgs = [
    "/assets/img/company/vinschool.png",
    "/assets/img/company/vinmec.png",
    "/assets/img/company/almaz.png",
    "/assets/img/company/quythientam.png",
    "/assets/img/company/vincom.png",
    "/assets/img/company/vincommerce.png",
    "/assets/img/company/vinfast.png",
    "/assets/img/company/vineco.png",
    "/assets/img/company/vinhomes.png",
    "/assets/img/company/vincity.png",
    "/assets/img/company/vingroupcard.png",
    "/assets/img/company/vinmart.png"
  ];
  classify: Classify[];
  hidden: boolean = true;
  listCart: Cart[] = [];
  sizeListCart: number;
  total: string;
  index = 0;
  constructor(
    private fb: FormBuilder,
    private location: LocalService,
    private router: Router,
    private auth: AuthService,
    private cart: CartService
  ) {}
  ngOnInit() {
    this.formGroup = this.fb.group({
      city: ["Tỉnh/Thành Phố", [Validators.required]],
      distict: ["Quận/Huyện", [Validators.required]],
      ward: ["Phường", [Validators.required]],
      ipSearch: ["", [Validators.required]]
    });
    this.getDataCart();
    this.getDataCategory();
    this.getDataCity();
    this.moveHeaderFooter();
    this.getInfoUser();
    this.location._Local.subscribe(data => {
      this.local = data;
    });
  }
  getDataCart() {
    this.cart.cartData.subscribe(data => {
      this.listCart = data;
      this.sizeListCart = this.listCart.length;
      this.total = this.cart.changePrice(this.totalCart(this.listCart));
    });
  }
  getDataCategory() {
    this.location.getClassifys().subscribe(data => {
      this.classify = data["data"];
    });
  }
  getDataCity() {
    this.location.getAllCity().subscribe(data => {
      this.datacitys = Object.values(data);
    });
  }
  getInfoUser() {
    this.auth.checkLogin().onAuthStateChanged(data => {
      if (data !== null) {
        this.checkLogin = true;
        this.emailChage = data.email;
        this.auth.setCheck(true);
        this.auth.getInfoUser(data.email).then(result => {
          this.auth.setUser(
            data.email,
            result.data()["name"],
            result.data()["phone"]
          );
        });
      }
    });
  }
  moveHeaderFooter() {
    this.router.events.subscribe(res => {
      this.hidden = !this.router.url.includes("login");
    });
  }
  onChangeCity() {
    const cityName = this.formGroup.value["city"].split(",");
    this.location.getDistinctOfCity(cityName[0]).subscribe(data => {
      this.dataDistict = Object.values(data);
    });
  }
  onChangeDistict() {
    const distict = this.formGroup.value["distict"].split(",");
    this.location.getWardOfDistinct(distict[0]).subscribe(data => {
      this.dataWard = Object.values(data);
    });
  }
  onChangeLoction() {
    const { city, distict, ward } = this.formGroup.value;
    let cityn = city.split(",")[1];
    let distictn = distict.split(",")[1];
    this.local = `Phường ${ward},Quận ${distictn},${cityn}`;
    this.location.setLocal(this.local);
  }
  onLogOut() {
    this.auth.onSignOut().then(err => {
      this.auth.setCheck(false);
      window.location.reload();
    });
  }
  totalCart(list: Cart[]): number {
    let result = 0;
    result = list.reduce((result, element) => {
      return result + element.quanlity * element.price;
    }, 0);
    return result;
  }
  deleteItemOfCart(event) {
    if (this.setPropoties(event, this.listCart)) {
      this.listCart.splice(this.index, 1);
      this.sizeListCart = this.listCart.length;
      this.total = this.cart.changePrice(this.totalCart(this.listCart));
      this.cart.addCart(this.emailChage, this.listCart).then(ree => {
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
  onFindProduct() {
    const ipSearch = this.formGroup.value["ipSearch"];
    this.router.navigate([`/find/${ipSearch}`]);
  }
}
