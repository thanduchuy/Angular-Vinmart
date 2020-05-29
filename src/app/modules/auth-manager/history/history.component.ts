import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/shared/services/cart.service";
import { Bill } from "src/app/shared/models/bill.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit {
  bills: any;
  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit() {
    this.auth.checkLogin().onAuthStateChanged(data => {
      this.cart.getBillOfUser(data.email).then(ree => {
        this.bills = ree.data()["bills"];
        console.log(this.bills);
      });
    });
  }
}
