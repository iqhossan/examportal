import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  categories= [];

  quizData={
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid:''
    }
  };

  constructor(private _category:CategoryService,
    private _snack:MatSnackBar,
    private _quiz:QuizService){}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{ 
        this.categories = data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!',"Error in loading data from server",'error');
      }
    );
  }

  formSubmit(){
    this.fieldValidation();
    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Quiz is successfully added','success');

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!', 'Error while adding quiz','error');
      },
    );
  }

  fieldValidation(){
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this._snack.open("Title Required",'',{
        duration:3000,
      });
      return;
    }
    if(this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null){
      this._snack.open("Marks Required",'',{
        duration:3000,
      });
      return;
    }
    if(this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null){
      this._snack.open("Number Question Required",'',{
        duration:3000,
      });
      return;
    }
    if(this.quizData.category == null){
      this._snack.open("Category is Required",'',{
        duration:3000,
      });
      return;
    }
  }

}
