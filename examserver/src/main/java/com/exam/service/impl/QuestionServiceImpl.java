package com.exam.service.impl;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository repository;

    @Override
    public Question addQuestion(Question question) {
        return this.repository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.repository.save(question);
    }

    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.repository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.repository.findById(questionId).get();
    }

    @Override
    public Set<Question> getQuestionOfQuiz(Quiz quiz) {
        return this.repository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long quesId) {
        Question question = new Question();
        question.setQuesId(quesId);
        this.repository.delete(question);
    }

    @Override
    public Question get(Long quesId) {
        return this.repository.getOne(quesId);
    }
}
