import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class LoggedGurardService implements CanActivate {
  isLogin: boolean = false;
  constructor(private router: Router, private auth: AuthService) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.checkLogin();
  }
  public checkLogin(): boolean {
    if (this.isLogin) {
      return true;
    } else {
      this.auth._check.subscribe(data => {
        if (data) {
          this.isLogin = true;
          this.router.navigate(["/cart"]);
        } else {
          alert("Vui lòng đăng nhập để vào giỏ hàng!!!");
          this.router.navigate(["/login/login"]);
        }
      });
    }
  }
}
