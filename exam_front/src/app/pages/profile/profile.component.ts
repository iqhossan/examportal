import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user = null;

  constructor(private login:LoginService){}
  ngOnInit(): void {
   this.user = this.login.getUser();
   /* 
   this.login.getCurrentUser().subscribe(
      (data:any)=>{
        this.user = data;
      },
      (error)=>{
        alert(error);
      }
    ); 
    */
  }
}
