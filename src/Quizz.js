
import React from 'react'
import {Questions} from './Questions'
import './styles.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { jsPDF } from "jspdf";
import Alert from '@mui/material/Alert';


import IconButton from '@mui/material/IconButton';
const Quizz = (props) => {
    const [data, setData] = React.useState({});
    const [userAnswer, setUserAnswer] = React.useState({});
    const [score, setScore] = React.useState(0);
    const[alert,setalert]=React.useState(false)


    const handleClick1=()=>{
       const username= localStorage.getItem('username');


       

        if(QuestionAnswer()){
            
        
        const doc = new jsPDF();
doc.text(`Congretulations ${username} Successfully completed this Quize `,10,10)
doc.text(`your Score is:${score} `,20,20);
doc.save("a4.pdf");
setalert(false)

    }
    else{
       
        setalert(true)
    }
}

    const result = () => {

        let tempScore = 0;

        console.log("User Answers:", userAnswer);

        Questions.forEach(question => {
                      
            if (parseInt(userAnswer[question.id]) === question.answer) {
                tempScore++;
            }
        });

        setScore(tempScore);
       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        
        setUserAnswer({ ...userAnswer, [name]: value });
    };

    const handleClick = () => {
        if(QuestionAnswer()){
            result();
            setalert(false)
        }
       else{
        // alert("Attain all Questions")
        setalert(true)
       }
    };

const QuestionAnswer=()=>{
   return Object.keys(userAnswer).length===Questions.length;
}

    return (
        <>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, margiLeft: '50%' }}
          >
            Quize App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
            <div className='quiz-container'>
            
               {
                alert && (  
<Alert severity="error">Plaese Attain All Questios.</Alert>
                )
               }
                {Questions.map((question) => (
                    <div key={question.id}>
                        <label>{question.id}. {question.question}</label><br />
                        {question.options.map((option, i) => (
                            <div className="form-check" key={i}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={question.id} 
                                    value={option}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={question.id + '-' + i}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                 <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained" onClick={handleClick}>Submit</Button>
            </Stack><br></br>
            </div>
         
             <div className="score-container">
        <h3>Score: {score}</h3>
      </div>

            <Stack spacing={2} direction="row">
            <Button  variant="contained" onClick={()=>{
                props.checkpage()
            }}>Logout</Button>    
            </Stack>
           
           
            <Stack spacing={2} direction="row">
            <Button  variant="contained" onClick={()=>{
              handleClick1()
            }} disabled={!QuestionAnswer()}>Downlod PDF</Button> 
            </Stack>
        </>
    );
};

export default Quizz;

