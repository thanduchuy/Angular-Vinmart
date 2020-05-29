import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  change = true;
  formLogin: FormGroup;
  formRegister: FormGroup;
  unCorrect = true;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.formLogin = this.fb.group({
      emailLogin: ["", Validators.required],
      passLogin: ["", Validators.required]
    });
    this.formRegister = this.fb.group({
      nameRegis: ["", Validators.required],
      phoneRegis: ["", Validators.required],
      emailRegis: ["", [Validators.required, Validators.email]],
      passRegis: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.router.paramMap.subscribe((data: ParamMap) => {
      data.get("action") === "login"
        ? (this.change = true)
        : (this.change = false);
    });
  }
  changeForm() {
    this.change = !this.change;
  }
  onLogin() {
    const { emailLogin, passLogin } = this.formLogin.value;
    this.auth
      .onSingIn({ name: emailLogin, pass: passLogin })
      .then(ree => {
        this.route.navigate(["/home"]);
      })
      .catch(err => {
        this.unCorrect = false;
        console.log(err);
      });
  }
  onRegister() {
    const {
      nameRegis,
      phoneRegis,
      emailRegis,
      passRegis
    } = this.formRegister.value;
    this.auth
      .onRegister({ email: emailRegis, password: passRegis })
      .then(ree => {
        alert("Chúc mừng bạn đăng ký thành công!!!");
        this.auth.setInFoUser({
          email: emailRegis,
          phone: phoneRegis,
          name: nameRegis,
          birthDay: "",
          gender: ""
        });
        this.route.navigate(["/home"]);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
