import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { AuthGuard } from './services/guards/auth.guard'
import { PainelComponent } from './components/pages/painel/painel.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { AdminGuard } from './services/guards/admin.guard';
import { TicketComponent } from './components/ticket/ticket.component';
const routes: Routes = [
  {path: "**", redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'ticket', component: TicketComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {path: 'home', component: PainelComponent, canActivate:[AuthGuard]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
