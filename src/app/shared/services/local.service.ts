import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class LocalService {
  url = "assets/resources/mocks/";
  myLocal: BehaviorSubject<string> = new BehaviorSubject<string>(
    "Phường Hoà Hiệp Bắc, Quận Liên Chiểu, Đà Nẵng"
  );
  _Local = this.myLocal.asObservable();
  constructor(private http: HttpClient) {}
  setLocal(local: string) {
    this.myLocal.next(local);
  }
  getAllCity() {
    return this.http.get(`${this.url}/tinh_tp.json`);
  }
  getDistinctOfCity(number) {
    return this.http.get(`${this.url}/quan-huyen/${number}.json`);
  }
  getWardOfDistinct(number) {
    return this.http.get(`${this.url}/xa-phuong/${number}.json`);
  }
  getClassifys() {
    return this.http.get(`${this.url}/classify.json`);
  }
  getPayment() {
    return this.http.get(`${this.url}/payment.json`);
  }
  getManager() {
    return this.http.get(`${this.url}/userManager.json`);
  }
  getPayUser() {
    return this.http.get(`${this.url}/payUser.json`);
  }
  getDate() {
    return this.http.get(`${this.url}/date.json`);
  }
}
