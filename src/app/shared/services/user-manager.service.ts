import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Location } from "../models/location.model";

@Injectable({
  providedIn: "root"
})
export class UserManagerService {
  Address: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  $Address: Observable<Location[]> = this.Address.asObservable();
  constructor() {}
  updateAddress(list: Location[]) {
    this.Address.next(list);
  }
}
