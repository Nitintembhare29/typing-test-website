import React, {useState} from 'react';
import Select from "react-select";
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import { Tooltip } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
    const {theme, setTheme} = useTheme();
    const handleChange = (e)=>{
        setTheme(e.value);
        localStorage.setItem("theme", JSON.stringify(e.value));
    }

  return (
    <div className='footer'>
        <div className="links">
        <a href='https://github.com/Nitintembhare29' target='blank'> <GitHubIcon style={{transform : 'scale(1.4)'}}/></a>
        <a href= 'https://www.linkedin.com/in/nitin3260/' target='blank'><LinkedInIcon style={{transform : 'scale(1.4)'}}/></a>
        </div>

        <Tooltip title={<p style={{fontSize: "1rem" }}>themes</p>}
                arrow placement="right-start">
        <div className="themeButton">
            <Select 
            onChange = {handleChange}
            options={themeOptions}
            menuPlacement='top'
            defaultValue={{label: theme.label, value: theme}}
            styles={{
                control : (baseStyle)=> ({ ...baseStyle, background : "white", color:theme.textColor }),
                menu : (baseStyle)=> ({ ...baseStyle, background : theme.background }),
                option: (baseStyle, {isFocused}) =>{
                    return {
                        ...baseStyle,
                        background : (!isFocused) ? theme.background : theme.textColor,
                        color : (!isFocused) ? theme.textColor : theme.background,
                        cursor : 'pointer'
                    }
                }
            }}
            />
        </div>
        </Tooltip>
       
    </div>
  )
}

export default Footer
