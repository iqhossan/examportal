import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {
  qid;
  quiz;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _quiz:QuizService
  ){}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    //alert(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
       // console.log(data);
        this.quiz = data;
      },
      (error)=>{
        Swal.fire("Error !!",'Error is loading quiz data','error');
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz?',
      showDenyButton:true,
      showCancelButton:true,
      confirmButtonText:'start',
      denyButtonText:`Don't Save`,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.qid]);
        //Swal.fire('Saved','','success');
      }else if(result.isDenied){
        Swal.fire('Changes are not saved','','info');
      }
    });
  }
}
