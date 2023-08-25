import React, {useState} from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorMapping from '../Utils/errorMapping';

const SignupForm = ({handleModalClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPass, setCnfPass] = useState('');
    const {theme} = useTheme();
    const handleSubmit = ()=>{
      if(!email || !password || !cnfPass){
        toast.warning('Fill all details', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return; 
      }
      if( password !== cnfPass){
        toast.warning('password mismatch', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }
       auth.createUserWithEmailAndPassword(email, password).then((res)=>{
        toast.success('user created', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          handleModalClose();
       }).catch((err)=>{
        toast.error(errorMapping[err.code] ||'some error occured', {
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
  return (
    <div>
      <Box p={3} style={{display: 'flex', flexDirection: 'column', gap:'20px'}}>
        <TextField 
         type='email'
         variant='outlined' 
         label='Enter Email' 
         onChange={(e)=> setEmail(e.target.value)}
         InputLabelProps={{
          style :{
              color : theme.textColor
          }
       }}
       inputProps={{
          style :{
              color : theme.textColor
          }
       }}/>
        <TextField 
         type='password' 
         variant='outlined' 
         label='Enter Password'
         onChange={(e)=> setPassword(e.target.value)}
         InputLabelProps={{
          style :{
              color : theme.textColor
          }
       }}
       inputProps={{
          style :{
              color : theme.textColor
          }
       }}/>
         <TextField 
         type='password' 
         variant='outlined' 
         label='Enter Confirm Password'
         onChange={(e)=> setCnfPass(e.target.value)}
         InputLabelProps={{
          style :{
              color : theme.textColor
          }
       }}
       inputProps={{
          style :{
              color : theme.textColor
          }
       }}/>
        <Button 
           variant='contained' 
           size='large'
           style={{color: theme.background, background: theme.textColor}}
           onClick={handleSubmit}
           >SignUp</Button>
      </Box>
    </div>

  )
}

export default SignupForm;
