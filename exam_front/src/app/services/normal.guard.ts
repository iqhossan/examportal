import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class PermissionsServiceNormal{
  constructor(private loginService:LoginService,
    private router:Router){}
  canActivate(): boolean {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'NORMAL'){
      console.log("user");
       return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}

export const normalGuard: CanActivateFn = ( 
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot
) => {  
  return inject(PermissionsServiceNormal).canActivate();
};