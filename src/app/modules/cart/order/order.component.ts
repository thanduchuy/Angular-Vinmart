import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CartService } from "src/app/shared/services/cart.service";
import { Cart } from "src/app/shared/models/cart.model";
import { City } from "src/app/shared/models/city.models";
import { LocalService } from "src/app/shared/services/local.service";
import { Distinct } from "src/app/shared/models/distinct.model";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Location } from "src/app/shared/models/location.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { AuthManagerComponent } from "../../auth-manager/auth-manager.component";
import { UserManagerService } from "src/app/shared/services/user-manager.service";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  @Output() onClickLocation: EventEmitter<Location> = new EventEmitter();
  @Output() onOther: EventEmitter<string> = new EventEmitter();
  @Output() onNotes: EventEmitter<string> = new EventEmitter();
  notes = [
    { content: "Giao hàng vào 8h đến 18h", active: false },
    { content: "Giao hàng vào 18h đến 19h", active: false },
    { content: "Khác", active: false }
  ];
  isNote = [false, false, false];
  dateNow: Date = new Date();
  format = "dd/MM/yyyy";
  listCart: Cart[] = [];
  datacitys: City[];
  dataDistict: Distinct[];
  dataWard: Distinct[];
  formGroup: FormGroup;
  locals: Location[] = [];
  isLocal: boolean;
  email: string;
  constructor(
    private cart: CartService,
    private location: LocalService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.dateNow.setDate(this.dateNow.getDate() + 1);
    this.cart.cartData.subscribe(data => {
      this.listCart = data;
    });
    this.getDataCity();
    this.formGroup = this.fb.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      other: ["", [Validators.required]],
      city: ["Tỉnh/Thành Phố", [Validators.required]],
      distict: ["Quận/Huyện", [Validators.required]],
      ward: ["Phường", [Validators.required]],
      address: ["", [Validators.required]]
    });
    this.getLocationOfUser();
  }
  getLocationOfUser() {
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
      this.cart.getLocation(this.email).then(ree => {
        this.isLocal = ree.exists;
        this.locals = ree.data()["locals"];
        if (this.locals.length === 0) {
          this.isLocal = false;
        }
      });
    });
  }
  onClickNotes(index: number) {
    this.notes = this.notes.map((element, i) => {
      if (index === i) {
        this.onNotes.emit(element.content);
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });
  }
  getDataCity() {
    this.location.getAllCity().subscribe(data => {
      this.datacitys = Object.values(data);
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
  onClickAddress() {
    let {
      name,
      phone,
      email,
      city,
      distict,
      ward,
      address
    } = this.formGroup.value;
    city = city.split(",")[1];
    distict = distict.split(",")[1];
    this.locals.push(
      new Location(
        name,
        phone,
        email,
        false,
        `Phường ${ward},Quận ${distict},${city}`,
        address
      )
    );
    this.isLocal = true;
    this.cart.addLocation(this.email, this.locals).then(ree => {
      console.log(ree);
    });
  }
  chooseAddress(index) {
    this.locals = this.locals.map((ele, i) => {
      if (i === index) {
        this.onClickLocation.emit(ele);
        ele.active = true;
      } else {
        ele.active = false;
      }
      return ele;
    });
  }
  onRemoveLocation(index) {
    this.locals = this.locals.filter((ele, i) => {
      return i !== index;
    });
    if (this.locals.length == 0) {
      this.isLocal = false;
    }
    this.cart.addLocation(this.email, this.locals).then(ree => {
      console.log(ree);
    });
  }
  onTypeOther() {
    let { other } = this.formGroup.value;
    this.onOther.emit(other);
  }
}
