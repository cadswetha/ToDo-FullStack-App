package com.crud.demo.service;

import com.crud.demo.dao.TodoDao;
import com.crud.demo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TodoService {
    private final TodoDao todoDao;
    @Autowired
    public TodoService(TodoDao todoDao) {
        this.todoDao = todoDao;
    }

    public ResponseEntity<List<Todo>> getAllTodo(){
        try{
            List<Todo> todos =  todoDao.findAll();
            return new ResponseEntity<>(todos , HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<Todo> addTodo(Todo todo){
        try{
            Todo _todo = todoDao.save(new Todo(todo.getDescription(),todo.getDone()));
            return new ResponseEntity<>(_todo, HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Todo> updateTodo(Long id, Todo newTodo){
        Optional<Todo> todoData =  todoDao.findById(id);
        if(todoData.isPresent()){
            Todo _todo = todoData.get();
            _todo.setDescription(newTodo.getDescription());
            _todo.setDone(newTodo.getDone());
            return new ResponseEntity<>(todoDao.save(_todo), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteTodo(Long id){
        try{
            todoDao.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
