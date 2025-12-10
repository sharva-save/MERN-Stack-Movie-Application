import React from "react";
import Start from './start'
import AdminLogin from "./pages/adminLogin";
import UserLogin from "./pages/userLogin";
import CreateAccount from "./user/createAccount";
import CreateAdminAccount from './admin/createAccount'
import ForgetPassword from './pages/forget'
import UserHomePage from './user/UserHomePage'
import UserSearchPage from './user/UserSearchPage'
import AddMovie from './admin/addMovie'

import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    
    <div>
     <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/adminLogin" element={<AdminLogin/>} />
      <Route path="/userLogin" element={<UserLogin/>} />
      <Route path="/createAccount" element={<CreateAccount/>} />
      <Route path="/createAdminAccount" element={<CreateAdminAccount/>} />
      <Route path="/forgetPassword" element={<ForgetPassword/>} />
      <Route path="/UserHomePage" element={<UserHomePage/>} />
      <Route path="/UserSearchPage" element={<UserSearchPage/>} />
      <Route path="/addmovie" element={<AddMovie/>} />
    
     </Routes>
    </div>
    
  );
}

export default App;
     