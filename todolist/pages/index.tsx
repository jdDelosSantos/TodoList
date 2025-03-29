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
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_CLIENT}/api/home`);
      if (!response.ok ){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data: ApiResponse = await response.json();
      setMessage(data.message);
    }catch (err){
      console.error("Error Fetching Todos: ", err);
    }
  }

  
  return (
    <div>{message}</div>
  )
}

export default index