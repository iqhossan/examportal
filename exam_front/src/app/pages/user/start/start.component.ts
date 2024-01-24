import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit = false;
  timer:any

  constructor(
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionOfQuizForUser(this.qid).subscribe(
      (data:any)=>{ 
        this.questions = data; 
        this.timer = this.questions.length*2*60; // timer is mainted on seconds

        this.questions.forEach((q)=>{
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        //console.log(error);
        Swal.fire("Error !!",'Error is loading question','error');
      }
    );
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit', 
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        //calculation
        //console.log(this.questions);
        this.evalQuiz();
      }else if(result.isDenied){
        Swal.fire('Changes are not saved','','info');
      }
    });
  }

  preventBackButton(){
    history.pushState(null,null,location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    });
  }

  startTimer(){
    let t = window.setInterval(()=>{

      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
     
    },1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    this.isSubmit = true;

    /*
    this.questions.forEach((q)=>{
      if(q.givenAnswer == q.answer){
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot += marksSingle;
      }
      if(q.givenAnswer.trim() != ''){
        this.attempted++;
      }
    });
    console.log('correct answer: '+this.correctAnswers);
    console.log('Marks Got: '+this.marksGot);
    console.log('Attempt: '+this.attempted);
    */

    // call to server to check questions
    // console.log(this.questions);
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.correctAnswers = parseFloat(Number(data.correctAnswers).toFixed(2));
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted = parseFloat(Number(data.attempted).toFixed(2));
      },
      (error)=>{
        console.log(error);
      }
    );
  
  }

  printPage(){
    window.print();
  }

}
