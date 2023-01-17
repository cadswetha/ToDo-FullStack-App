import React, {useEffect, useState} from 'react';
import './App.css';
import {DeleteOutlined,EditOutlined,CheckCircleOutlined} from '@ant-design/icons'

function App() {

  const [toDo,setToDo] = useState([{id:1,description:"My new Task",done:false}]);
  let path = "http://localhost:8080/api/v1/todo";
  const [newTask,setNewTask] = useState('');
  const [updateData,setUpdateData] = useState('');

  // rendering the to-do list
  useEffect(() => {
    getUsers();
  },[])

  function getUsers(){
    fetch(path, {
      
    }).then(res => res.json())
      .then((result) => {
        console.log(result);
        setToDo(result);
      })
      .catch((err)=>{
        console.log(err.message);
      });
  }

  // adding task
  const addTask = async (e) => {
    // console.log({newTask});
      e.preventDefault();
      if(newTask){ 
        let res = await fetch(path , {
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'description':newTask , "done":false}),
        });
        let resJson = await res.json();
        
        // add new task to the todo list
        getUsers();
        
      }
    setNewTask('')
  }

  const deleteTask = async (id)=> {
    let response = await fetch(`${path}/${id}`,{
      method:'DELETE'
    })
    if(response.status===204){
      setToDo(
        toDo.filter((task)=>{
          return task.id!==id
        })
      )
    }
    else{
      return;
    }
  }

  const markDone = async (task) =>{

    try{
      let res = await fetch(`${path}/${task.id}`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'description':task.description , "done":task.done?false:true}),

      });
      if(res.status === 200){
        getUsers();
      }
    }catch(err){
      console.log(err);
    }
  }

  const updateTask =async (e)=>{
    e.preventDefault();
    try{
      let res = await fetch(`${path}/${updateData.id}`,{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'description':updateData.description , "done":updateData.done}),

      });
      if(res.status === 200){
        getUsers();
      }
    }catch(err){
      console.log(err);
    }
    setUpdateData('');
  }

  const changeTask = (e) =>{
    let newEntry ={
      id:updateData.id,
      description:e.target.value,
      done:updateData.done?true:false,
    }
    setUpdateData(newEntry)
  }

  const cancelUpdate = ()=>{
    setUpdateData('');
  }


  return (
    <div className="App">
      <h2 className='Heading'> ToDo List</h2>    
      {updateData && updateData ?(

        <form onSubmit={updateTask} className='aligning'>
          <input className='userinput'  value = {updateData && updateData.description} onChange ={(e)=>changeTask(e)}></input>
          <button className='userbtn red' type='submit'>Update</button>
          <button className='userbtn yellow' onClick={cancelUpdate}>Cancel</button> 
        </form>
        
      ):(
        <form onSubmit={addTask} className='aligning'>
            <input className='userinput'
                value = {newTask}
                onChange={(e)=>setNewTask(e.target.value)}>
            </input>
            <button className='userbtn green' type='submit'>Add Task</button> 
        </form>
      )
    }
    
    <h2>{toDo && toDo.length ? '':'No tasks...'}</h2>
      {/* adding text */}
      {toDo && toDo
        .sort((a,b) => a.id > b.id ?1:-1)
        .map((task, index) => {
        return (
          <React.Fragment key={task.id}>
            <div className='taskBg'>
              <div className={task.done ? 'done usertext':'usertext'}>
                <span className='taskText'>{task.description}</span>
              </div>
              <div className='iconsWrap'>
                  <span onClick={()=>markDone(task)}>
                    <CheckCircleOutlined />
                  </span>
                  {task.done ? null : (
                    <span onClick={()=>setUpdateData({id:task.id, description: task.description,done:task.done?true:false})}>
                      <EditOutlined />
                    </span>
                  )}
                  
                  <span onClick={()=>deleteTask(task.id)}>
                    <DeleteOutlined />
                  </span>
              </div>
            </div>
          </React.Fragment>
        )
      })
    }
    </div>
  );
}

export default App;
