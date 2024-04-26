import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './services/guards/auth.guard'
import { PainelComponent } from './components/pages/painel/painel.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'ticket', component: PainelComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent},
  {path: 'home', component: HomeComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
