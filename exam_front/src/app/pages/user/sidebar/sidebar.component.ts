import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories;

  constructor(
    private _category:CategoryService,
    private _snack:MatSnackBar){}

  ngOnInit(): void {
   this._category.categories().subscribe(
    (data:any)=>{
      this.categories = data;
    },
    (error)=>{
      this._snack.open('Error in loading categories in server','',{
        duration:3000
      });
    }
   ); 
  }
}
