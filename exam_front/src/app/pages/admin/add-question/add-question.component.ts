import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})

export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qId;
  qTitle;

  question={
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
    },
  };

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar){}
  
  ngOnInit(): void {
   this.qId = this._route.snapshot.params.qid;
   this.qTitle = this._route.snapshot.params.title;
   this.question.quiz['qId']=this.qId; 
  }

  //Add question
  public formSubmit(){
    if(!this.formValidated()){
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Success !!","Question Added. Add another one.",'success');
        this.clearQuestion();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in adding question','error');
      }
    );
  }

  // clear question field value
  clearQuestion() {
    this.question = {
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quiz: {},
    };
  }

  //Validate Data
  public formValidated(){
    if(this.question.content.trim() == ''||this.question.content == null){
      // this._snack.open('Content is required','',{
      //  duration:3000,
      // });
      return false;
    }
    if(this.question.option1.trim() == ''||this.question.option1 == null){
      return false;
    }
    if(this.question.option2.trim() == ''||this.question.option2 == null){
      return false;
    }
    if(this.question.answer.trim() == ''||this.question.answer == null){
      return false;
    }
    return true;
  }


}
