import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(
    private userService:UserService,
    private snack:MatSnackBar
  ){

  }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email:'',
    phone:'',
  }
 

  ngOnInit(): void {
    
  }

  formSubmit(){
    // alert("submit");

    if(this.user.username == '' || this.user.username == null){
      this.snack.open("User Name is Required",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        Swal.fire('Successfully Done !!','User is registered on Id:'+data.id,'success');
        // console.log(data);
        // alert('success');
      },
      (error)=>{
        //error
        //console.log(error);
        //alert('Something went worng');
        this.snack.open(error.message,'',{
          duration:3000
        });
      }
    );

  }
}
