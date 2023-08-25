import React, {useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppBar, Modal, Tabs, Tab, Box} from "@mui/material";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const style = {
    color: "white"
}

const AccountCircle = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    
    const handleModalOpen = ()=>{
        if(user){
            // navigate to the user page
            navigate('/user');
        }
        else{
        setOpen(true);
        }
    }
    const handleModalClose = ()=>{
            setOpen(false);
    }

    const handleValueChange = (e,v)=>{
        setValue(v);
    }
     
    const logout = ()=>{
        auth.signOut().then((res)=>{
            toast.success('Logged out', {
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
            toast.error('not able to logout', {
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

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = ()=>{
        signInWithPopup(auth, googleProvider).then((res)=>{
            toast.success('Google login successful', {
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
            toast.error(errorMapping[err.code] ||'not able use google authentication', {
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
     <AccountCircleIcon onClick={handleModalOpen} style={{transform: 'scale(1.5)', cursor:'pointer'}}/>
     {
        user && <LogoutIcon onClick={logout} style={{transform: 'scale(1.5)', cursor:'pointer', marginLeft:"1.5rem"}}/>
     }
     <Modal
     open={open}
     onClose={handleModalClose}
     style={{
        display:"flex",
        justifyContent: 'center',
        alignItems : 'center',
        backdropFilter: 'blur(2px)'
     }}
     >
        <div style={{width:'400px', textAlign: 'center'}}>
            <AppBar position='static' style={{background: 'transparent', opacity: '0.9'}}>
                <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
                    <Tab label="login" sx={style}></Tab>
                    <Tab label="signUp" sx={style}></Tab>
                </Tabs>
                {value === 0 && <LoginForm handleModalClose={handleModalClose}/>}
                {value === 1 && <SignupForm handleModalClose={handleModalClose}/>}
                <Box>
                    <span>OR</span>
                    <GoogleButton style={{width: '100%', marginTop: '12px'}}
                       onClick={handleGoogleSignIn}
                    />
                </Box>
            </AppBar>
        </div>
     </Modal>
    </div>
  )
}

export default AccountCircle
