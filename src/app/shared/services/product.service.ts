import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  db = firebase.firestore();
  dataProduct: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  _dataProduct = this.dataProduct.asObservable();
  constructor() {}
  getDataProduct(name: string) {
    return this.db.collection(name).get();
  }
  getProductOfCategory(id: string, table: string) {
    return this.db
      .collection(table)
      .doc(id)
      .get();
  }
  setData(data: any) {
    return this.dataProduct.next(data);
  }
  addDataProduct(data) {
    return this.db.collection("product-kitchen").add(data);
  }
}
