import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/models/user.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocalService } from "src/app/shared/services/local.service";
import { element } from "protractor";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
  user: User;
  email: string;
  formChangePassword: FormGroup;
  formUpdateInfo: FormGroup;
  dates = [];
  genders = [
    {
      value: "Nam",
      active: false,
      img: "/assets/img/Male.svg"
    },
    {
      value: "Nữ",
      active: false,
      img: "/assets/img/Female.svg"
    }
  ];
  formName = ["day", "month", "year"];
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private route: Router,
    private local: LocalService
  ) {}

  ngOnInit() {
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
      this.auth.getInfoAuth(data.email).then(ree => {
        this.user = new User(
          data.email,
          ree.data()["name"],
          ree.data()["phone"],
          ree.data()["birthDay"],
          ree.data()["gender"]
        );
        this.genders = this.changeActiveGender(this.genders, this.user.gender);
      });
    });
    this.formChangePassword = this.fb.group({
      passOld: ["", [Validators.required, Validators.minLength(6)]],
      passNew: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.formUpdateInfo = this.fb.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      day: ["", [Validators.required]],
      month: ["", [Validators.required]],
      year: ["", [Validators.required]]
    });
    this.local.getDate().subscribe(data => {
      this.dates = data["data"].map((element, index) => {
        return {
          value: element,
          control: this.formName[index]
        };
      });
    });
  }
  changeActiveGender(gender: any[], gen: string): any[] {
    return gender.map(data => {
      data["active"] = data["value"] === gen;
      return data;
    });
  }
  onChangePassword() {
    const { passOld, passNew } = this.formChangePassword.value;
    console.log(passNew, passOld);
    this.auth
      .changePasswordAuth(passNew)
      .then(ree => {
        alert("Đổi Mật Khẩu Thành Công");
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
  onClickGender(value): void {
    this.genders = this.changeActiveGender(this.genders, value);
  }
  onChangeInfo() {
    let { name, phone, day, month, year } = this.formUpdateInfo.value;
    let gender: string;
    if (name.length === 0) {
      name = this.user.name;
    }
    if (phone.length === 0) {
      phone = this.user.phone;
    }
    month = month[month.length - 1];
    this.genders.forEach(element => {
      if (element.active) {
        gender = element.value;
      }
    });
    let user = new User(
      this.email,
      name,
      phone,
      `${day}/${month}/${year}`,
      gender
    );
    this.auth
      .setInFoUser(user)
      .then(ree => {
        alert("Thay đổi thông tin thành công!!!");
        window.location.reload();
      })
      .catch(ree => {
        console.log(ree);
      });
  }
}
