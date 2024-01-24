import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions=[];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle= this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !", 'Error in loading data','error');
      }
    );
  }

  public deleteQuestion(quesId){
    // alert(quesId);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question?',
    }).then(
      (result)=>{
        if(result.isConfirmed){
          //confirm
          this._question.deleteQuestion(quesId).subscribe(
            (data:any)=>{
              this._snack.open('Question Deleted','',{
                duration:3000,
              });
              this.questions = this.questions.filter((q)=>q.quesId != quesId);
            },
            (error)=>{
              console.log(error);
              this._snack.open('Error in deleting questions','',{
                duration:3000
              });
            }
          );
        }
    });
  }
}
