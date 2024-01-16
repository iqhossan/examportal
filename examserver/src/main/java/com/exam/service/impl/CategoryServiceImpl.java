package com.exam.service.impl;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Override
    public Category addCategory(Category category) {
        return this.repository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.repository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.repository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        return this.repository.findById(categoryId).get();
    }

    @Override
    public void deleteCategory(Long categoryId) {
        //this.repository.deleteById(categoryId);
    //or
        Category category = new Category();
        category.setCid(categoryId);
        this.repository.delete(category);
    }
}
