import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService){}

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId = params.catid;
      if(this.catId == 0){
        //all quizzes
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            console.log(data);
            this.quizzes = data;
          },
          (error)=>{
            console.log(error);
          }
          );
      }else{
        //particular quiz
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error)=>{
            Swal.fire("Error !!",'Error in Loading Data','error');
          }
          );
      }
    });
  }

}
