import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/global";
import { useTheme } from "./Context/ThemeContext";
import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UserPage from "./Pages/UserPage";



function App() {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
      <GlobalStyles />
    </ThemeProvider>
    
  );
}

export default App;
