import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserInfo = ({totalTestsTaken}) => {
    const [user] = useAuthState(auth);
    const dateString = user.metadata.creationTime;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); 
    const day = date.getDate();
    const formattedDate = `${day} ${month} ${year}`;
  return (
    <div className='user-profile'>
        <div className="user">
            <div className="picture"><AccountCircleIcon style={{dispaly: 'block', transform: 'scale(5)'}}/></div>
            <div className="info">
                <div className="email">{user.email}</div>
                <div className="joined-at">joined {formattedDate}</div>
            </div>
        </div>
        <div className="total-tests"><span>Total Tests Taken - {totalTestsTaken}</span></div>
    </div>
  )
}

export default UserInfo
