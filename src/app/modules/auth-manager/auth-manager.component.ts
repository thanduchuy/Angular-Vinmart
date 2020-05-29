import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { LocalService } from "src/app/shared/services/local.service";
import { element } from "protractor";
import { SubscriptionLike } from "rxjs";

@Component({
  selector: "app-auth-manager",
  templateUrl: "./auth-manager.component.html",
  styleUrls: ["./auth-manager.component.scss"]
})
export class AuthManagerComponent implements OnInit, OnDestroy {
  private subscription: SubscriptionLike[] = [];
  constructor(
    private router: ActivatedRoute,
    private auth: AuthService,
    private local: LocalService
  ) {}
  email: string;
  list: any[] = [];
  footer: any[] = [];
  ngOnInit() {
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.email = data.email;
    });
    this.getListNav();
  }
  getListNav() {
    this.subscription.push(
      this.local.getManager().subscribe(data => {
        this.list = data["data"]["nav"];
        this.footer = data["data"]["introduce"];
        this.router.paramMap.subscribe((data: ParamMap) => {
          this.list = this.list.map(element => {
            element.active = element.url.includes(data.get("action"));
            return element;
          });
        });
      })
    );
  }
  ngOnDestroy() {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
  }
}
