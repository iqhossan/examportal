import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable, inject } from '@angular/core';


@Injectable()
export class PermissionsServiceAdmin{
  constructor(private loginService:LoginService,
    private router:Router){}
  canActivate(): boolean {
    if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN'){
      //console.log("admin")
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}


export const adminGuard: CanActivateFn = ( 
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot
) => {  
  return inject(PermissionsServiceAdmin).canActivate();
};

 
