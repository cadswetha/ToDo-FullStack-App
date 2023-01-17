package com.crud.demo.dao;

import com.crud.demo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface TodoDao extends JpaRepository<Todo , Long> {

}
