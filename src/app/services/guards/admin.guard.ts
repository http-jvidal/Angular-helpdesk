import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Se o usuário tiver permissão de admin,
    // o enviamos para a tela de admin

    if (this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }
      return true;
  }
}
