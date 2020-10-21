import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ShopComponent } from './shop/shop.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'stock', component: StockComponent },
  { path: 'stock/form', component: StockFormComponent },
  { path: 'stock/form/:id', component: StockFormComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'report', component: ReportComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
