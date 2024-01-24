import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  category= {
    title:'',
    description:'',
  };

  constructor(
    private _category:CategoryService,
    private _snack:MatSnackBar
  ){}

  ngOnInit(): void {
  
  }

  formSubmit(){
    // check the requied field
    if(this.category.title.trim() == '' || this.category.title == null){
      this._snack.open("Title is required !!","",{
        duration:3000,
      });
      return;
    }

    //all done
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire('Success !!', 'Category is added successfully', 'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!', 'Server Error !!', 'error');
      }
    );
  }



}
