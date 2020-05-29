import { Component, OnInit, Input } from "@angular/core";
import { UserManagerService } from "src/app/shared/services/user-manager.service";
import { CartService } from "src/app/shared/services/cart.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocalService } from "src/app/shared/services/local.service";
import { City } from "src/app/shared/models/city.models";
import { Distinct } from "src/app/shared/models/distinct.model";
import { Location } from "src/app/shared/models/location.model";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private cart: CartService,
    private fb: FormBuilder,
    private location: LocalService
  ) {}
  email: string;
  locals: Location[] = [];
  isLocal: boolean;
  formGroup: FormGroup;
  datacitys: City[];
  dataDistict: Distinct[];
  dataWard: Distinct[];
  dis = false;
  title: string = "Thêm";
  index: number;
  ngOnInit() {
    this.getLocationOfUser();
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
    this.getDataCity();
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
    if (this.title === "Thêm") {
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
    } else {
      this.locals[this.index] = new Location(
        name,
        phone,
        email,
        false,
        `Phường ${ward},Quận ${distict},${city}`,
        address
      );
    }
    this.isLocal = true;
    this.cart.addLocation(this.email, this.locals).then(ree => {
      console.log(ree);
    });
  }
  onRemoveLocation(i) {
    if (i === 0) {
      this.locals.shift();
    } else {
      this.locals = this.locals
        .splice(0, i)
        .concat(this.locals.splice(i, this.locals.length));
    }
    this.cart.addLocation(this.email, this.locals).then(ree => {
      console.log(ree);
    });
  }
  showModal() {
    this.dis = true;
  }
  onUpdateLocation(i) {
    this.title = "Sửa";
    this.index = i;
    this.formGroup.controls["name"].setValue(this.locals[i].name);
    this.formGroup.controls["phone"].setValue(this.locals[i].phone);
    this.formGroup.controls["email"].setValue(this.locals[i].email);
    this.formGroup.controls["address"].setValue(this.locals[i].address);
  }
}
