import logo from './logo.svg';
import './App.css';
import React from 'react';
import Quizz from './Quizz';
import Login from './Login';

function App() {
  const[move,setmove]=React.useState(true)
  const checkpage=()=>{
              setmove(!move)
  }
  return (
    <div className="App">
    {
    move?<Login checkpage={checkpage}/>:<Quizz checkpage={checkpage}/>
}
    </div>
  );
}

export default App;
