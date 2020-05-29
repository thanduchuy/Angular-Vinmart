import { Component, OnInit } from "@angular/core";
import { FooterService } from "src/app/shared/services/footer.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  background1 = "/assets/img/27029375746078.jpg";
  background2 = "/assets/img/26963221086238.jpg";
  commitment: any = {};
  onMale = false;
  onFemale = false;
  hidden: boolean = true;
  constructor(private footer: FooterService, private router: Router) {}

  ngOnInit() {
    this.footer.getDataFooter().subscribe(data => {
      this.commitment = data["data"];
    });
    this.router.events.subscribe(res => {
      this.hidden = !this.router.url.includes("login");
    });
  }
  onActive(s: string) {
    if (s === "male") {
      this.onMale = true;
      this.onFemale = false;
    } else {
      this.onMale = false;
      this.onFemale = true;
    }
  }
}
