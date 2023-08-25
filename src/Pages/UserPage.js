import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { auth, db} from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {
    const [data, setData] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const fetchUserData = ()=>{
           const resultRef = db.collection('Results');
           const {uid} = auth.currentUser;
           let tempData = [];
           let tempGraphData = [];
           resultRef
           .where('userId', '==', uid) 
           .orderBy('timeStamp', 'desc')
           .get()
           .then((snapshot)=>{
              snapshot.docs.forEach((doc)=>{
                tempData.push({...doc.data()});
                tempGraphData.push([
                    doc.data().timeStamp.toDate().toLocaleString().split(',')[0], 
                    doc.data().wpm,])
                    
              });
              
              setData(tempData); 
              setGraphData(tempGraphData.reverse());
              setDataLoading(false);
           })
    }

    useEffect(()=>{
        if(!loading){
            fetchUserData();
        }
        if(!loading && !user){
            Navigate('/')
        }
       
    },[loading]);

    if(loading || dataLoading){
        return <div className='center-of-screen'><CircularProgress size={200}/></div>
    }

  return (
    <div classname='canvas'>
        <UserInfo totalTestsTaken={data.length}/>
        <div className="graph-user-page">
            <Graph graphData={graphData}/>
        </div>
        <TableUserData data={data}/>
    </div>
  )
}

export default UserPage
