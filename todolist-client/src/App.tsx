import React, {useEffect , useState} from 'react';
import TodoItem from './Components/TodoItem';
import AddTodo from './Components/AddTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from './Api';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos]=useState<ITodo[]>([])
  useEffect(()=>{
    fetchTodos()
  },[])
  const fetchTodos = ():void =>{
    getTodos().then(({ data: { todos }}: ITodo[] |any) =>(todos))
    .catch((err)=>console.log(err))

  }
  const handleSave = (e: React.FormEvent , formData:ITodo):void => {
    e.preventDefault();
    addTodo(formData).then(({status, data})=>{
      if(status !== 201){
        console.log ("Error! Todo do not saved");
        
      }
      setTodos(data.todos);
    }).catch(err => console.log(err))
  } 
  const handleUpdate = (todo : ITodo): void => {
    updateTodo(todo).then(({ status, data })=>{
      if(status !==200){
        console.log("Error Todo do not Updated");
      }      
      setTodos(data.todos);
    }).catch(err => console.log(err))
   
  }
  const handleDelete = (_id: string) : void =>{
    deleteTodo(_id).then(({status, data})=>{
       if(status !==200){
         console.log("Error! Todo do not Deleted");
       }
       setTodos(data.todos);
    }).catch(err =>console.log(err))
  }
  return (
    <div className="App">
     <h1> TODO LIST: </h1>
     <AddTodo saveTodo={handleSave}/>
     {todos.map((todo:ITodo)=>(
       <TodoItem
        key={todo._id}
        updateTodo={handleUpdate}
        deleteTodo={handleDelete}
        todo={todo}/>
     ))}
          
    </div>
  );
}

export default App;
