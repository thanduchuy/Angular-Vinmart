import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LogInComponent } from "./log-in/log-in.component";
import { CartComponent } from "./cart/cart.component";
import { LoggedGurardService } from "../shared/services/logged-gurard.service";
import { AuthManagerComponent } from "./auth-manager/auth-manager.component";
import { FindComponent } from "./find/find.component";
import { DetailComponent } from "./detail/detail.component";
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login/:action", component: LogInComponent },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [LoggedGurardService]
  },
  { path: "authManager/:action", component: AuthManagerComponent },
  { path: "find/:name", component: FindComponent },
  { path: "detail/:id", component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
