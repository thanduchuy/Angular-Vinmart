import { Injectable } from "@angular/core";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor() {}
  async downloadFile(image) {
    let url: any;
    url = await firebase
      .storage()
      .ref()
      .child(image)
      .getDownloadURL();
    return url;
  }
}
