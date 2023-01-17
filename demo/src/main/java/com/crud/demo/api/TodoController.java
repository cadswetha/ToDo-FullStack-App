package com.crud.demo.api;

import com.crud.demo.model.Todo;
import com.crud.demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/v1/" , produces = "application/json")
@RestController()
public class TodoController {
    private final TodoService todoService;
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("todo")
    public ResponseEntity<List<Todo>> getAllTodo(){
        return todoService.getAllTodo();
    }

    @PostMapping("todo")
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo){
        return todoService.addTodo(todo);
    }

    @PutMapping(path = "todo/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo newtodo){
         return todoService.updateTodo(id,newtodo);
    }

    @DeleteMapping(path = "todo/{id}")
    public ResponseEntity<HttpStatus>  deleteTodo(@PathVariable("id")Long id){
         return todoService.deleteTodo(id);
    }
}
