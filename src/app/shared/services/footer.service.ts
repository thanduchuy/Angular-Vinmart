import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FooterService {
  url = "assets/resources/mocks/";
  constructor(private http: HttpClient) {}
  getDataFooter() {
    return this.http.get(`${this.url}/footer-data.json`);
  }
}
