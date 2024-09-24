import React, { useState } from 'react';
import './Login.css';
import Alert from '@mui/material/Alert';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[alert,setalert]=useState(false)
  const[success,setsuccess]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClick = () => {
    if (username === '' || password === '') {
   
      setalert(true)
      setsuccess(false)
      

    } else {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      // alert('Successfully Logged In');
      setalert(false)
      setsuccess(true)
    }
  };

  const handleNavLink = () => {
    if (username === '' || password === '') {
      // alert('You must first login before starting the Quiz');
      setalert(true)
    } else {
      setalert(false)
      props.checkpage(); 
    }
  };

  return (

    <div className='Mycontainer'>
      {
  alert && (
    <Alert severity="error">Please Login befour Start Quize</Alert>
  )
}
{
  success&&(
    <Alert severity="success">Successfully Login</Alert>
  )
}
      <diV className="inputClass">
      <label className='lablename'>Username</label>
      <input
      className='inputname'
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      /><br></br>
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      </diV>
      <br />
      <button onClick={handleClick}>Login</button>
      <br />
      <br />
      <button onClick={handleNavLink}>Switch to QuizApp</button>
    </div>
  );
};

export default Login;
