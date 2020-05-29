import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LocalService } from "src/app/shared/services/local.service";
import { Payment } from "src/app/shared/models/payment.model";
@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() onClickPayment: EventEmitter<Payment> = new EventEmitter();
  payments: Payment[];
  constructor(private local: LocalService) {}

  ngOnInit() {
    this.local.getPayment().subscribe(data => {
      this.payments = data["data"];
    });
  }
  onActiveElement(index) {
    this.payments = this.payments.map((data, i) => {
      if (i === index) {
        data.active = true;
        this.onClickPayment.emit(data);
      } else {
        data.active = false;
      }
      return data;
    });
  }
  onBack() {
    this.back.emit(true);
  }
}
