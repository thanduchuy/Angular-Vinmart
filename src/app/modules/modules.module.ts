import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ModulesRoutingModule } from "./modules-routing.module";
import { MatTabsModule } from "@angular/material/tabs";
import { ProductComponent } from "./home/product/product.component";
import { LogInComponent } from "./log-in/log-in.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartComponent } from "./cart/cart.component";
import { ItemComponent } from "./cart/item/item.component";
import { OrderComponent } from "./cart/order/order.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule, MatSelectModule } from "@angular/material";
import { PaymentsComponent } from "./cart/payments/payments.component";
import { AuthManagerComponent } from "./auth-manager/auth-manager.component";
import { HistoryComponent } from "./auth-manager/history/history.component";
import { InfoComponent } from "./auth-manager/info/info.component";
import { AddressComponent } from "./auth-manager/address/address.component";
import { PayComponent } from "./auth-manager/pay/pay.component";
import { VinComponent } from './auth-manager/vin/vin.component';
import { FindComponent } from './find/find.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    LogInComponent,
    CartComponent,
    ItemComponent,
    OrderComponent,
    PaymentsComponent,
    AuthManagerComponent,
    HistoryComponent,
    InfoComponent,
    AddressComponent,
    PayComponent,
    VinComponent,
    FindComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    ProductComponent,
    ItemComponent,
    OrderComponent,
    PaymentsComponent,
    HistoryComponent,
    InfoComponent,
    AddressComponent,
    PayComponent
  ]
})
export class ModulesModule {}
