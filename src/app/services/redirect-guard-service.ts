import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { GlobalServices } from './global-services';

@Injectable()
export class RedirectGuard implements CanActivate {

  constructor(private router: Router, private globalService: GlobalServices) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.globalService.hasValidRoles()) {
       
        return true;
    } else {
        // not logged in so redirect to login page with the return url
        window.location.href = route.data['externalUrl']
        //this.router.navigate(['/login']);
        return false;
    }
  }
}