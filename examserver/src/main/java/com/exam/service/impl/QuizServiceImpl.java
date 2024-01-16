package com.exam.service.impl;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository repository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.repository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.repository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.repository.findAll());
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return this.repository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {
        this.repository.deleteById(quizId);
    }
    @Override
    public List<Quiz> getQuizzesOfCategory(Category category){
        return this.repository.findBycategory(category);
    }

    @Override
    public List<Quiz> getActiveQuizzes() {
        return this.repository.findByActive(true);
    }

    @Override
    public List<Quiz> getActiveQuizzesOfCategory(Category c) {
        return this.repository.findByCategoryAndActive(c,true);
    }

}
