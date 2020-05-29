import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vin",
  templateUrl: "./vin.component.html",
  styleUrls: ["./vin.component.scss"]
})
export class VinComponent implements OnInit {
  list = [
    "Ưu đãi nhiều hơn với thẻ VinID miễn phí",
    "Tích điểm từ 2 - 3% khi mua sắm sản phẩm, dịch vụ tại Adayroi.com",
    "Sử dụng điểm tích để mua sắm thoả sức cùng Adayroi.com"
  ];
  constructor() {}

  ngOnInit() {}
}
