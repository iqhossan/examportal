import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar,
    private loginService:LoginService,
    private router:Router){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    this.ValidateField();
    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        //console.log('success');
        //console.log(data);
        //login.....
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            //console.log(user); 
            if(this.loginService.getUserRole() == 'ADMIN'){
              //ridirect  ...ADMIN dashboard
              //window.location.href="/admin";
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'NORMAL'){
              //ridirect ...NORMAL dashboard
              //window.location.href="/user-dashboard";
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout();
            } 
          }
        );
      },
      (error)=>{
        console.log('error');
        console.log(error);
      }
    );

  }

  ValidateField(){
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open('user name is required','',{
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open('password is required','',{
        duration:3000,
      });
      return;
    }
  }

}
