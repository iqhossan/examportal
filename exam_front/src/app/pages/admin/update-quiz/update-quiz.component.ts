import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quizData=null;
  categories=null;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _category:CategoryService,
    private _snack:MatSnackBar,
    private _router:Router){}
  
  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quizData = data;
        console.log(this.quizData);
      },
      (error)=>{
        console.log(error);
      },
    );

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        alert('error in loading categories');
      }
    );
  }

  // update form submit
  public updateSubmit(){
    //validate data
    this.fieldValidation();

    //Update data
    this._quiz.updateQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Quiz Updated','success')
        .then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire("Error !!", 'Error in updating quiz','error');
      }
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
