import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './services/auth.guard';
import { ShopComponent } from './shop/shop.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'stock/form', component: StockFormComponent, canActivate: [AuthGuard] },
  { path: 'stock/form/:id', component: StockFormComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
