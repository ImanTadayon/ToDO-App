
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from "../src/ComponentFiles/Signup";
import Login from "../src/ComponentFiles/Login";
import Home from "../src/ComponentFiles/Home";
import Create from "../src/ComponentFiles/Create";
import ToDo from "./Todo/components/TodoList";
import ChangePass from "./ComponentFiles/ChangePass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/todolist' element={<ToDo />} />
        <Route path='/resetpass' element={<ChangePass />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;


