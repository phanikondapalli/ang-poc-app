import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { Routes, RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { PaymentsComponent } from './main-area/payments/payments.component';
import { InventoryComponent } from './main-area/inventory/inventory.component';
import { FinancesComponent } from './main-area/finances/finances.component';
import { PurchasingComponent } from './main-area/purchasing/purchasing.component';
import { AdministrationComponent } from './main-area/administration/administration.component';
import { RequisitioningComponent } from './main-area/requisitioning/requisitioning.component';
import { OrderguidesComponent } from './main-area/requisitioning/orderguides/orderguides.component';
import { ItemcatalogComponent } from './main-area/inventory/itemcatalog/itemcatalog.component';
import { IteminventoryComponent } from './main-area/inventory/iteminventory/iteminventory.component';
import { ReceivingComponent } from './main-area/inventory/receiving/receiving.component';
import { VendorsComponent } from './main-area/purchasing/vendors/vendors.component';
import { PurchaseordersComponent } from './main-area/purchasing/purchaseorders/purchaseorders.component';
import { InvoicesComponent } from './main-area/payments/invoices/invoices.component';
import { ExceptionsComponent } from './main-area/payments/exceptions/exceptions.component';
import { DashboardsComponent } from './main-area/finances/dashboards/dashboards.component';
import { UsersComponent } from './main-area/administration/users/users.component';
import { SettingsComponent } from './main-area/administration/settings/settings.component';
import { MonitoringComponent } from './main-area/administration/monitoring/monitoring.component';
import { componentFactoryName } from '@angular/compiler';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { RequisitionsComponent } from './main-area/requisitioning/requisitions/requisitions.component';
import { OrderguidelinesComponent } from './main-area/requisitioning/orderguides/orderguidelines/orderguidelines.component';
import { RequisitionlinesComponent } from './main-area/requisitioning/requisitions/requisitionlines/requisitionlines.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { OrderGuideDetailsComponent } from './main-area/requisitioning/orderguides/order-guide-details/order-guide-details.component';
import { AvailableItemsComponent } from './main-area/requisitioning/orderguides/available-items/available-items.component';
import { OrderGuideLineDetailsComponent } from './main-area/requisitioning/orderguides/orderguidelines/order-guide-line-details/order-guide-line-details.component';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { RequisitionDetailsComponent } from './main-area/requisitioning/requisitions/requisition-details/requisition-details.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainAreaComponent , canActivate: [AuthService]},
  {
    path: 'requisitioning', component:PlaceholderComponent, canActivate: [AuthService], 
    children: [
      { path: '',component:RequisitioningComponent},
      { path: 'orderguides', component: OrderguidesComponent },     
      { path: 'orderguides/:id', component: OrderguidelinesComponent },
      { path: 'requisitions',component: RequisitionsComponent },
      { path: 'requisitions/:id', component: RequisitionlinesComponent },
    ]
  },
  {
    path: 'payments', component:PlaceholderComponent, canActivate: [AuthService],
    children: [
      {path:'',component: PaymentsComponent},
      { path: 'invoices', component: InvoicesComponent },
      { path: 'exceptions', component: ExceptionsComponent }
    ]
  },

  {
    path: 'inventory', component: PlaceholderComponent, canActivate: [AuthService],
    children: [
      {path:'',component:InventoryComponent},
      { path: 'itemcatalog', component: ItemcatalogComponent },
      { path: 'iteminventory', component: IteminventoryComponent },
      { path: 'receiving', component: ReceivingComponent }
    ]
  },

  {
    path: 'finances', component: PlaceholderComponent, canActivate: [AuthService],
    children: [
      { path:'',component:FinancesComponent},
      { path: 'dashboards', component: DashboardsComponent }
    ]
  },

  {
    path: 'purchasing', component: PlaceholderComponent, canActivate: [AuthService],
    children: [
      { path:'',component:PurchasingComponent},
      { path: 'vendors', component: VendorsComponent },
      { path: 'purchaseorders', component: PurchaseordersComponent }
    ]
  },

  {
    path: 'administration', component:PlaceholderComponent, canActivate: [AuthService] ,
    children: [
      { path:'',component:AdministrationComponent},
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'monitoring', component: MonitoringComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainAreaComponent,
    PaymentsComponent,
    InventoryComponent,
    FinancesComponent,
    PurchasingComponent,
    AdministrationComponent,
    RequisitioningComponent,    
    OrderguidesComponent,
    ItemcatalogComponent,
    IteminventoryComponent,
    ReceivingComponent,
    VendorsComponent,
    PurchaseordersComponent,
    InvoicesComponent,
    ExceptionsComponent,
    DashboardsComponent,
    UsersComponent,
    SettingsComponent,
    MonitoringComponent,
    PagenotfoundComponent,
    PlaceholderComponent,
    RequisitionsComponent,
    OrderguidelinesComponent,
    RequisitionlinesComponent,
    LoginComponent,    
    OrderGuideDetailsComponent, AvailableItemsComponent, OrderGuideLineDetailsComponent, PageUnderConstructionComponent, RequisitionDetailsComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TabViewModule,
    StepsModule,
    TableModule,
    DialogModule,
    GrowlModule,
    DropdownModule,
    ConfirmDialogModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
