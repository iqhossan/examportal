import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  categories=null;

  constructor(private _category:CategoryService){}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        Swal.fire("Error !!", "Error in Loading Data",'error')
      }
      );
  }
}
