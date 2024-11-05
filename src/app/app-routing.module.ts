import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { AuthGuard } from './services/guards/auth.guard'
import { ChatComponent } from './components/pages/chat/chat.component';
import { AdminGuard } from './services/guards/admin.guard';
import { TicketComponent } from './components/ticket/ticket.component';
import { HomeComponent } from './components/pages/home/home.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ticket', component: TicketComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'chat', component: ChatComponent},
  {path: "**", redirectTo: '/login', pathMatch: 'full'}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
