import { todo } from 'node:test';
import React,{useEffect, useState} from 'react'


interface ApiResponse {
  message: string;
}

interface Todo{
  id: number,
  text: string,
  completed: boolean,
}

function index() {
  const [message, setMessage] = useState("Fetching Api Response");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  

  useEffect (()=>{
    fetchTodos();
  },[])

  const fetchTodos = async()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/api/todos`, {method: "GET"});
      if (!response.ok ){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data: ApiResponse = await response.json();
      setMessage(data.message);
    }catch (err){
      console.error("Error Fetching Todos: ", err);
    }
  }

  const addTodo = async (e: React.FormEvent)=>{
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/api/todos`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: newTodoText}),
      });
      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodoText('');
    }catch(err){
      console.error('Error adding todo: ', err);
    }
  }

  const toggleTodo = async (id:number) =>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/api/todos/${id}`, {
        method: 'PATCH',
      })
      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo=>todo.id ===id? updatedTodo: todo));
    }catch(err){
      console.error("Error toggling todo: ", err);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/api/todos/${id}`, {method: 'DELETE'});

      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  
  return (
   <div className="min-h-screen bg-gray-100 p-4">
  <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-semibold text-center mb-4">Todo List</h2>

    {/* Todo Input Form */}
    <form onSubmit={addTodo} className="mb-4 flex">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new todo"
        className="flex-grow border rounded-l-lg p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600"
      >
        Add
      </button>
    </form>

    {/* Todo List */}
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default index