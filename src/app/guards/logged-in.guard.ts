import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user && user.token) return true;

        return this.router.createUrlTree(['/login']);
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        return !!user && !!user.token;
      })
    );
  }
}
