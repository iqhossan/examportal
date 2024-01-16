package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update question
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //get number of question of any quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("quizId") Long quizId){
//        Quiz quiz = new Quiz();
//        quiz.setqId(quizId);
//        Set<Question> questionOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
//        return ResponseEntity.ok(questionOfQuiz);
//
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        // set the answer blank for user request api
        list.forEach((q)->{
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

    //get all question of any quiz
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("quizId") Long quizId){
        Quiz quiz = new Quiz();
        quiz.setqId(quizId);
        //System.out.println(quiz);
        Set<Question> questionOfQuiz = this.questionService.getQuestionOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);
    }

    //get Single question
    @GetMapping("/{quesId}")
    public Question getQuestion(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }

    //Delete Question
    @DeleteMapping("/{quesId}")
    public void deleteQuestion(@PathVariable("quesId") Long quesId){
        this.questionService.deleteQuestion(quesId);
    }

    //eval question of quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        int marksGot=0;
        int correctAnswers=0;
        int attempted=0;
        for(Question q : questions){
            Question question= this.questionService.get(q.getQuesId());
          if(question.getAnswer().equals(q.getGivenAnswer())){
                correctAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/(questions.size());
                marksGot += marksSingle;
            }
            if(q.getGivenAnswer() != null){
                attempted++;
            }
            System.out.println(q.getGivenAnswer());
        };
        Map<String,Object> map = Map.of("marksGot",marksGot, "correctAnswers",correctAnswers,"attempted", attempted);
        return ResponseEntity.ok(map);
        //return ResponseEntity.ok("got data");
    }
}
