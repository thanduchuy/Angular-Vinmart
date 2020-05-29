import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Cart } from "src/app/shared/models/cart.model";
import { BehaviorSubject } from "rxjs";
import { formatNumber } from "@angular/common";
import { Location } from "../models/location.model";
import { Bill } from "../models/bill.model";

@Injectable({
  providedIn: "root"
})
export class CartService {
  db = firebase.firestore();
  listProduct: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(
    []
  );
  cartData = this.listProduct.asObservable();
  listDataBill: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);
  listBill = this.listDataBill.asObservable();
  constructor() {}

  updateData(data) {
    this.listProduct.next(data);
  }
  setDataBill(bill) {
    this.listDataBill.next(bill);
  }
  addData(dataObj) {
    const currentValue = this.listProduct.value;
    const updatedValue = [...currentValue, dataObj];
    this.listProduct.next(updatedValue);
  }
  addCart(email: string, product: Cart[]) {
    const products = product.map(obj => {
      return Object.assign({}, obj);
    });
    return this.db
      .collection("cart")
      .doc(email)
      .set({
        items: products
      });
  }
  getCart(email: string) {
    return this.db
      .collection("cart")
      .doc(email)
      .get();
  }
  getProductOfUID(nameTabel: string, uid: string) {
    return this.db
      .collection(nameTabel)
      .doc(uid)
      .get();
  }
  changePrice(number: number): string {
    let result = formatNumber(number, "en-US");
    return result;
  }
  getLocation(email: string) {
    return this.db
      .collection("location")
      .doc(email)
      .get();
  }
  addLocation(email: string, local: Location[]) {
    const locals = local.map(obj => {
      return Object.assign({}, obj);
    });
    return this.db
      .collection("location")
      .doc(email)
      .set({
        locals: locals
      });
  }
  getBillOfUser(email: string) {
    return this.db
      .collection("bill")
      .doc(email)
      .get();
  }
  setBillOfUser(email: string, data: Bill[]) {
    const datas = data.map(obj => {
      obj.item = obj.item.map(element => {
        return Object.assign({}, element);
      });
      obj.local = Object.assign({}, obj.local);
      obj.payment = Object.assign({}, obj.payment);
      return Object.assign({}, obj);
    });
    return this.db
      .collection("bill")
      .doc(email)
      .set({
        bills: datas
      });
  }
  clearCart(email: string) {
    return this.db
      .collection("cart")
      .doc(email)
      .set({
        items: []
      });
  }
}
