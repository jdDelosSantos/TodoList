import React,{useEffect, useState} from 'react'


interface ApiResponse {
  message: string;
}

function index() {
  const [message, setMessage] = useState("Fetching Api Response");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
  .then((res) => {
    if (!res.ok) {
      setMessage("Couldnt fetch data :(");
      throw new Error('Network response was not ok');
    }
    return res.json() as Promise<ApiResponse>;
  })
  .then((data) => {
    setMessage(data.message);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  }, [])
  
  return (
    <div>{message}</div>
  )
}

export default index