import { Component, OnInit } from "@angular/core";
import { LocalService } from "src/app/shared/services/local.service";
import { payUser } from "src/app/shared/models/payUser.model";

@Component({
  selector: "app-pay",
  templateUrl: "./pay.component.html",
  styleUrls: ["./pay.component.scss"]
})
export class PayComponent implements OnInit {
  constructor(private local: LocalService) {}
  list: payUser[];
  ngOnInit() {
    this.local.getPayUser().subscribe(data => {
      this.list = data["data"];
    });
  }
  onClickItem(i): void {
    this.list = this.list.map((data, index) => {
      if (index === i) {
        data.active = true;
      } else {
        data.active = false;
      }
      return data;
    });
  }
}
