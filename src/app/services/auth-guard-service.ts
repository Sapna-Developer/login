import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalServices } from './global-services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private globalService: GlobalServices) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.globalService.hasValidIdToken()) {
            // logged in so return true
            
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }
    }
}