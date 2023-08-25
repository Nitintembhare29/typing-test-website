import React, { useEffect } from 'react'
import Graph from './Graph';
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Tooltip } from "@mui/material";

const Stats = (
    {wpm, 
    accuracy, 
    correctChars, 
    inCorrectChars, 
    missedChars, 
    extraChars, 
    graphData,
    }) => {
        let timeSet = new Set();
        const newGraph = graphData.filter(i=>{
            if(!timeSet.has(i[0])){
                timeSet.add(i[0]);
                return i;
            }
        })

        const pushDatatoDB = ()=>{
            if(isNaN(accuracy)){
                toast.error('Invalid test', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
          const resultsRef = db.collection('Results');
          const {uid} = auth.currentUser;
          resultsRef.add({
            wpm : wpm,
            accuracy: accuracy,
            timeStamp : new Date(),
            characters : `${correctChars}/${inCorrectChars}/${missedChars}/${extraChars}`,
            userId : uid
        }).then((res)=>{
            toast.success('data saved to database', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }).catch((err)=>{
            toast.error('Not able to save data', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
        }

        useEffect(()=>{
            if(auth.currentUser){
                pushDatatoDB();
            }
            else{
                toast.warning('Login to save results', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }

        },[]);
  return (
    <div className='stats-box'>
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Characters</div>
            <Tooltip 
                title={<p style={{fontSize: "1rem" }}>correct, incorrect, missed, and extra</p>}
                arrow placement="right-start">
               <div className="subtitle">{correctChars}/{inCorrectChars}/{missedChars}/{extraChars}</div>
            </Tooltip>
            
            <Tooltip 
                title={<p style={{fontSize: "1rem" }}>Next test</p>}
                arrow placement="right-start">
            <div className = "reload-btn">
                <ArrowForwardIosIcon fontSize='large' onClick={() => window.location.reload(false)} 
                style={{cursor:'pointer',  
                marginTop : '1rem',
                border : '2px solid',
                borderRadius: '1rem',
                width : '30%',
                padding : '0.3rem' }} />
            </div>
            </Tooltip>
        </div>
        <div className="right-stats">
            <Graph graphData={newGraph}/>
        </div>
      
    </div>
  )
}

export default Stats
