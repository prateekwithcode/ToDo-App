import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<h1>Task List</h1>}/>
          <Route path="/add" element={<h1>Add Task List</h1>}/>
      </Routes>
    </>
  );
}

export default App;
